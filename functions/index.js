const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const os = require('os');
const path = require('path');
const iconv = require('iconv-lite');
const jschardet = require('jschardet');
const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');
const xlsx = require('xlsx');

admin.initializeApp();

const gcs = new Storage();

exports.processFile = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name; // File path in the bucket.
  console.log(`Processing file: ${filePath}`);

  const bucket = gcs.bucket(object.bucket);
  const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = {
    contentType: object.contentType,
  };

  // Download file from bucket.
  await bucket.file(filePath).download({ destination: tempFilePath });
  console.log(`File downloaded to: ${tempFilePath}`);

  let prompt;

  const parametersStart =
    `Imagine you are a teacher preparing a reading comprehension quiz for your students. You have a document (provided below) and you want to create a short assessment with the following format:\n` +
    `3 to 10 High-Quality Questions: These questions should test the reader's understanding of the key points and details in the document.\n` +
    `Exactly 3 Answer Choices: For each question, provide three answer options, ensuring they are clear, concise, and cover a range of possibilities.\n` +
    `Right Answer Marked with "*": Indicate the most accurate answer for each question by placing an asterisk (*) in front of it.\n` +
    `Here's an example to get you started:\n` +
    `Document: The quick brown fox jumps over the lazy dog.\n\n` +
    `Question 1: What color is the fox in the sentence?\n` +
    `(a) Brown * \n` +
    `(b) Quick\n` +
    `(c) Unknown\n\n` +
    `Your Task:\n\n` +
    `Analyze the document provided below and generate a reading comprehension quiz following the format described above.\n` +
    `Please note:\n\n` +
    `You don't need to access any external information or knowledge beyond the provided document.\n` +
    `Focus on creating clear, well-structured questions that assess various aspects of the document's content.\n` +
    `Document:\n`

  const parametersEnd =
    `Additional Tips:\n` +
    `The number of questions can vary between 3 and 10, but aim for a good balance that covers the important information.\n` +
    `Make sure the answer choices are plausible and don't directly quote the document.\n` +
    `The right answer should be demonstrably correct based on the document's content.\n` +
    `Only generate the questions and answer choices – no explanations or feedback are needed.\n` +
    `The questions should be in the same language as the document.\n`

  const fileExtension = path.extname(filePath);
  if (fileExtension === '.docx') {
    const { value } = await mammoth.extractRawText({ path: tempFilePath });
    prompt = value;
  } else if (fileExtension === '.pdf') {
    const buffer = fs.readFileSync(tempFilePath);
    const data = await pdfParse(buffer);
    prompt = data.text;
  } else if (fileExtension === '.xlsx') {
    const workbook = xlsx.readFile(tempFilePath);
    const sheetNames = workbook.SheetNames;
    prompt = sheetNames.map(name => xlsx.utils.sheet_to_txt(workbook.Sheets[name])).join('\n');
  } else {
    // PLAIN TEXT - Use this for testing!!
    const buffer = fs.readFileSync(tempFilePath);
    const detected = jschardet.detect(buffer);
    prompt = iconv.decode(buffer, detected.encoding);
    prompt = `${parametersStart}${prompt}${parametersEnd}`;
  }

  console.log(`Extracted prompt: ${prompt.substring(0, 100)}...`); // Log the first 100 characters

  // Write the prompt to Firestore.
  await admin.firestore().collection('files').doc(path.basename(filePath)).set({ prompt, uploaded_at: admin.firestore.FieldValue.serverTimestamp() });
  console.log(`Contents written to Firestore`);

  // Once the prompt has been saved to Firestore, we delete the temporary file.
  fs.unlinkSync(tempFilePath);
  console.log(`Temporary file deleted`);
});