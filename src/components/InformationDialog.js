import { Button } from '@mantine/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide } from '@mui/material';
import React from 'react';
import styles from './InformationDialog.module.css';


const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function InformationDialog({open, handleClose, title, textContent, textButton}){

    return <div>
        <Dialog
            open={open}
            maxWidth="lg"
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle className={styles.dialogTitle}>
                {title}
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                {textContent}
            </DialogContent>
            <DialogActions>
                <Grid 
                    container 
                    spacing={1}
                    className={styles.gridContainer}
                >
                    <Grid item xs={12} md={8}>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button 
                            fullWidth
                            color="red"
                            variant="filled"
                            onClick={() => handleClose()} 
                        > <div className={styles.textButton}> {textButton} </div> </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    </div>
}
