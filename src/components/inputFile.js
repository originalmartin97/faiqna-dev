import React from 'react';
import { useState } from 'react';
import { storage } from '../config/firebase'
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

function InputFile() {
    const [fileUpload, setFileUpload] = useState(null);
  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref (storage, `files/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then(() => {
      alert('File uploaded');
    });
  
  
  };
  
    return (
      <div className="InputFile">
        <input
          type='file' 
          onChange={ (event) => {
            setFileUpload(event.target.files[0])
          }}
        />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    );
  }
  
  export default InputFile;
