import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { Button, Box, Typography } from '@mui/material';
import useStore from '../store';

function InputFile() {
  const fileInputRef = useRef()

  const { setAreResponsesFetched } = useStore()
  const [fileUpload, setFileUpload] = useState(null)
  const [selectedFileName, setSelectedFileName] = useState('') // Add state variable for selected file name

  const { setIsFileUploaded } = useStore()

  // Function to upload file
  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `files/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then(() => {
      alert('File uploaded');
      setIsFileUploaded(true);
      setAreResponsesFetched(false);
    });

  };

  // Function to open file dialog
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  // Function to handle file change
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