import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({page, count, handleChange}) {
    return (
    <Stack spacing={2}>
        <Pagination 
            color="primary" 
            page={page} 
            count={count || 10} 
            onChange={handleChange} 
        />
    </Stack>
  );
}