import PixIcon from '@mui/icons-material/Pix';
import { Dialog, Grid, Slide } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import styles from './PixDialog.module.css';


const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function PixDialog({open, handleClose}){

    return <div>
        <Dialog
            open={open ? open : false}
            maxWidth="lg"
            onClose={() => handleClose()}
            TransitionComponent={Transition}
        >
            <Grid 
                container
                spacing={1}
                alignContent="center"
                flexDirection="column"
                alignItems="center"
                className={styles.dialogContent}
            >
                <Grid item xs={12} md={12}>
                    <div className={styles.pague}>Pague com</div>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid 
                        container
                        spacing={1}
                        alignContent="center"
                        flexDirection="row"
                        alignItems="center"
                    >
                        <PixIcon style={{fontSize: "10vh"}}/>
                        <Typography style={{
                            fontWeight: "600",
                            margin: "0 0 0 1vw",    
                            fontSize: '9vh'
                        }}> Pix </Typography>
                    </Grid>
                </Grid>

                <div
                    loading="lazy"
                    className={styles.pixImage}
                />

                <div className={styles.sePreferir}>Se preferir</div>
                <div className={styles.nossaChave}>Nossa chave</div>
                
                <div className={styles.chavePix}>079.861.121.90</div>
                <div className={styles.nome}>No nome de Lucas Augsuê</div>
            </Grid>
        </Dialog>
    </div>
}
