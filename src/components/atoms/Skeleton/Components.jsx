import React from 'react'
import Skeleton from '@mui/material/Skeleton';


const Components = ({ variant, width, height, animation }) => {
    return (
        <Skeleton variant={variant} width={width} height={height} animation={animation} />

    )
}

export default Components