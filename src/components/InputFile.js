import React, { useRef } from 'react';
import { useState } from 'react';
import { storage } from '../config/firebase'
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

function InputFile() {
  const [fileUpload, setFileUpload] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(''); // Add state variable for selected file name
  const fileInputRef = useRef();

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref (storage, `files/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then(() => {
      alert('File uploaded');
    });
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setFileUpload(event.target.files[0]);
    setSelectedFileName(event.target.files[0].name); // Update selected file name
  };

  return (
      <div className="InputFile">
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }} // Hide the default file input
        />
        <button onClick={handleFileSelect}>Choose File</button>
        {selectedFileName && <p>Selected file: {selectedFileName}</p>} {/* Display selected file name */}
        <button onClick={uploadFile}>Upload file</button>
      </div>
  );
}

export default InputFile;