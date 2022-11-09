import React from 'react';
import { Button } from '@mantine/core';
import styles from './DialogPresenca.module.css';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function DialogPresenca({
    data, setData
}){
    const handleClose = () => setData(false);

    return <Dialog
        open={!!data}
        onClose={handleClose}
    >
        <DialogTitle>{data.title}</DialogTitle>
        <DialogContent className={styles.content}>{data.subTitle}</DialogContent>
        <DialogActions>{data.actions}</DialogActions>
    </Dialog>
}
