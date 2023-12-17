import React, { forwardRef } from 'react';
import Pagination from '@mui/material/Pagination';

const BasicPagination = forwardRef(({ page, count, handleChange }, ref) => (
    <Pagination
        page={page}
        color="primary"
        count={count || 10}
        onChange={handleChange}
        ref={ref}
    />
));

export default BasicPagination;
