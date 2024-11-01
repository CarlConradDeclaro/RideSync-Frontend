import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

 const BasicButtons=({name,variant,size,onClick})=> {
  return (
    <Stack spacing={2} direction="row">
      <Button variant={variant} size={size} onClick={onClick}> {name}</Button>
    </Stack>
  );
}

export default BasicButtons;