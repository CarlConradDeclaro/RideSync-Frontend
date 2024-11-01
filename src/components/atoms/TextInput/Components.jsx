import * as React from 'react';
 import TextField from '@mui/material/TextField';

export default function BasicTextFields({type,label,variant,size,isError,errorText,value,onChange}) {
  return (
      <TextField 
          type={type}
          id="outlined-basic"
          label={label}
          variant={variant}
          size={size}   
          error={isError} 
          helperText={errorText} 
          value={value}
          onChange={onChange}
          autoComplete = 'off'
          />
  );
}


