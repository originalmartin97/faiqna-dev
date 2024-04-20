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
  await bucket.file(filePath).download({destination: tempFilePath});
  console.log(`File downloaded to: ${tempFilePath}`);
  
  let prompt;

  const parameters = 'Create 3 to 10 questions in a section called "Questions" and 3 possible "Answers" for those ' +
  'questions but with only one being exactly correct by the given text for this text given below:\n\n'

  const command = '\n\nIn your response: firstly show only the questions generated; use only the language based on the given text beforehand; ' +
  'for the answers, flag the only correct ones from the possibilities with adding a "*" right after them; The "Questions" and "Answers" sections must be separated from each other; ' +
  'The generated answers for the questions must be indicated matching their pairing questions like this:\n' +
  '"1/1 first possible answer for the first question\n' +
  '1/2 second possible answer for the first question"\n and iterating so on...'

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
    prompt = `${parameters}${prompt}${command}`;
  }

  console.log(`Extracted prompt: ${prompt.substring(0, 100)}...`); // Log the first 100 characters

  // Write the prompt to Firestore.
  await admin.firestore().collection('files').doc(path.basename(filePath)).set({ prompt, uploaded_at: admin.firestore.FieldValue.serverTimestamp() });
  console.log(`Contents written to Firestore`);

  // Once the prompt has been saved to Firestore, we delete the temporary file.
  fs.unlinkSync(tempFilePath);
  console.log(`Temporary file deleted`);
});