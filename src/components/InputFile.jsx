import React, { useRef } from 'react';
import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { Button, Box, Typography, Fab, Hidden, IconButton } from '@mui/material';
import useStore from '../store';
import AddIcon from '@mui/icons-material/Add';

function InputFile() {
  const fileInputRef = useRef();
  const { setAreResponsesFetched } = useStore();
  const [fileUpload, setFileUpload] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(''); // Add state variable for selected file name
  const { setIsFileUploaded } = useStore();

  // Function to handle file change
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFileName(file.name); // Update selected file name
      setFileUpload(file); // Set the selected file to the fileUpload state
      uploadFile(file); // Upload the file
    }
  };

  // Function to upload file
  const uploadFile = (file) => {
    if (file == null) return;
    const fileRef = ref(storage, `files/${file.name + v4()}`);
    uploadBytes(fileRef, file).then(() => {
      alert('File uploaded');
      setIsFileUploaded(true);
      setAreResponsesFetched(false);
    });
  };

  return (
    <>
      <Hidden smDown>
        <Box
          className="InputFile"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto', // Add a scrollbar when needed
          }}
        >
          {!fileUpload && <Typography variant="h6"> Upload a new text based file</Typography>}
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }} // Hide the default file input
          />
          <Button variant="contained" color="primary" onClick={() => fileInputRef.current.click()}>
            Upload file
          </Button>
          {selectedFileName && <Typography variant='h6'>Selected file: {selectedFileName}</Typography>} {/* Display selected file name */}
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          <input
            accept="text/plain"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <IconButton color="inherit" component="span">
              <AddIcon />
            </IconButton>
          </label>
        </Fab>
      </Hidden>
    </>
  );
}

export default InputFile;