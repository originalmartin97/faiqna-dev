import { firestore } from 'firebase/app';

// Listen for updates to the 'files' collection
firestore().collection('files').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      // A new document was added to the 'files' collection
      const data = change.doc.data();

      // Create a new <div> element and set its text to the file's contents
      const div = document.createElement('div');
      div.textContent = data.contents;

      // Append the new <div> element to the body
      document.body.appendChild(div);
    }
  });
});