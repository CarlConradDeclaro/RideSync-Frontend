import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function HalfRating({ ratings }) {
    return (
        <Stack spacing={1}>
            <Rating name="half-rating-read" defaultValue={ratings} precision={0.5} readOnly size="small" />
        </Stack>
    );
}