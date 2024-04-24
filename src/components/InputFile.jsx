import React, { useRef } from 'react';
import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { Button, Box, Typography } from '@mui/material';

function InputFile() {
  const [fileUpload, setFileUpload] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(''); // Add state variable for selected file name
  const fileInputRef = useRef();

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `files/${fileUpload.name + v4()}`);
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
    <Box className="InputFile"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto', // Add a scrollbar when needed
      }}
    >
      {!fileUpload && <Typography variant="h6">First, you need to upload a text based file.</Typography>}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the default file input
      />
      <Button variant="contained" color="primary" onClick={handleFileSelect}>Choose file</Button>
      {selectedFileName && <Typography variant='h6'>Selected file: {selectedFileName}</Typography>} {/* Display selected file name */}
      {fileUpload && <Button variant="contained" color="primary" onClick={uploadFile}>Upload file</Button>}
    </Box>
  );
}

export default InputFile;