import React, { forwardRef } from 'react';
import Pagination from '@mui/material/Pagination';

const BasicPagination = forwardRef((props, ref) => {
    const {page, count, handleChange} = props

    return <Pagination 
        ref={ref}
        page={page} 
        color="primary" 
        count={count || 10} 
        onChange={handleChange} 
    />
});

export default BasicPagination;