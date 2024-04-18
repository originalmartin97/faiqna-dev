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
  
  let contents;
  const fileExtension = path.extname(filePath);
  if (fileExtension === '.docx') {
    const { value } = await mammoth.extractRawText({ path: tempFilePath });
    contents = value;
  } else if (fileExtension === '.pdf') {
    const buffer = fs.readFileSync(tempFilePath);
    const data = await pdfParse(buffer);
    contents = data.text;
  } else if (fileExtension === '.xlsx') {
    const workbook = xlsx.readFile(tempFilePath);
    const sheetNames = workbook.SheetNames;
    contents = sheetNames.map(name => xlsx.utils.sheet_to_txt(workbook.Sheets[name])).join('\n');
  } else {
    // PLAIN TEXT
    const buffer = fs.readFileSync(tempFilePath);
    const detected = jschardet.detect(buffer);
    contents = iconv.decode(buffer, detected.encoding);
  }

  console.log(`Extracted contents: ${contents.substring(0, 100)}...`); // Log the first 100 characters

  // Write the contents to Firestore.
  await admin.firestore().collection('files').doc(path.basename(filePath)).set({ contents });
  console.log(`Contents written to Firestore`);

  // Once the contents has been saved to Firestore, we delete the temporary file.
  fs.unlinkSync(tempFilePath);
  console.log(`Temporary file deleted`);
});