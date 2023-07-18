import {Box, Input} from "@mui/material";
import React, { useRef } from 'react';


export const UploadButton = (props) => {

  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    props.setUploadFile(event.target.files[0]);
  };


  return(
      <Box sx={{
        border: "2px dashed grey",
        borderRadius: "5px",
        cursor: "pointer",
        width: 100,
        height: 30,
        backgroundColor: 'lightgray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

      }}
           onClick={handleFileUpload}>

        Choose File
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />

      </Box>
  )
}
