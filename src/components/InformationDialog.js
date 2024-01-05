import { Button } from '@mantine/core';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide } from '@mui/material';
import React from 'react';
import styles from './InformationDialog.module.css';


const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function InformationDialog({
    open, 
    handleClose, 
    title, 
    textContent, 
    textButton,
    loading,
    handleFunction,
    textFunction,
    textBody
}){

    return <div>
        <Dialog
            open={open}
            data-open={open}
            data-testid="dialog-mui" 
            maxWidth="lg"
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle>
                <div className={styles.containerTitle}>
                    <div className={styles.dialogTitle}> {title} </div>
                    <CloseIcon 
                        fontSize="medium"
                        onClick={handleClose}
                    /> 
                </div>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                {textBody ? textBody() : textContent}
            </DialogContent>
            <DialogActions>
                <Grid 
                    container 
                    spacing={1}
                    className={styles.gridContainer}
                >
                    {textFunction 
                        ? <Grid item xs={12} md={4}></Grid>
                        : <Grid item xs={12} md={8}></Grid>
                    }
                    <Grid item xs={12} md={4}>
                        <Button 
                            fullWidth
                            color="red"
                            variant={textFunction ? "outline" : "filled"}
                            onClick={() => handleClose()} 
                        > <div className={styles.textButton}> {textButton} </div> </Button>
                    </Grid>
                    {textFunction ? <Grid item xs={12} md={4}>
                        <Button 
                            fullWidth
                            radius="sm"
                            loading={loading}
                            variant="gradient"
                            gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                            onClick={() => handleFunction()} 
                        > <div className={styles.textButton}> {textFunction} </div> </Button>
                    </Grid> : <div></div>}
                </Grid>
            </DialogActions>
        </Dialog>
    </div>
}
