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
    `Task: Create a reading comprehension quiz based on the provided document.\n\n` +

    ` Format:\n\n` +

    `1. Questions: Develop 3 to 10 questions that evaluate key points and details from the document.\n` +
    `2. Answer Choices: Provide exactly 3 answer options for each question.\n` +
    `3. Correct Answer: Indicate the correct answer by placing an asterisk(*) in front of it.\n\n` +
    `Example:\n` +
    `Document: "The quick brown fox jumps over the lazy dog."\n` +
    `Question: What color is the fox in the sentence ?\n` +
    `(a) Quick\n` +
    `(b) Brown\n` +
    `(c) Lazy\n\n` +

    ` Instructions:\n\n` +

    `1. Analyze the document to create questions that accurately test comprehension.\n` +
    `2. Ensure answer choices are clear, concise, and plausible.\n` +
    `3. The correct answer must be clearly supported by the document.\n` +
    `4. Do not include explanations or feedback—only the questions and answer choices.\n` +
    `5. Maintain the same language as the document.\n\n` +

    `Document:\n`;
  // HERE GOES THE GIVEN TEXT FOR THE PROMPT TO CHEW ON

  const parametersEnd =
    `\nAdditional Tips:\n` +
    `Questions should cover a range of content from the document.\n` +
    `Ensure the questions are clear and free of ambiguity.`

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