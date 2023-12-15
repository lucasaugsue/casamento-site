import { Button, Notification } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from '@mui/material';
import React from 'react';
import ClientContext from '../contexts/ClientContext';
import styles from './ConfirmarPresenca.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmarPresenca(){
    const { apiRequest } = React.useContext(ClientContext);

    const [data, setData] = React.useState({nome: "", idade: "", celular: ""});

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [sucesso, setSucesso] = React.useState("");
    const [error, setError] = React.useState({
        nome: false, idade: false,
        celular: false, msg: ""
    });

    // Functions
    const handleChange = (e) => setData(params => ({
        ...params, [e.target.name]: e.target.value
    }))

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
        setData({nome: "", idade: "", celular: ""})
    };

    const createLista = () => {
        try{
            setError({
                nome: false, idade: false,
                celular: false, msg: ""
            })

            if (!data.idade && data.idade.length < 1) { setError(err => ({...err, idade: true, msg: "É necessário escrever o idade!"})) }
            if (!data.nome && data.nome.length < 2) { setError(err => ({...err, nome: true, msg: "É necessário escrever o nome!"})) }
            if (!data.celular && data.celular.length < 2) { setError(err => ({...err, celular: true, msg: "É necessário escrever o celular!"})) }

            if( (data.idade && data.idade.length > 1) && 
                (data.nome && data.nome.length > 2) &&
                (data.celular && data.celular.length > 2)
            ) {
                setLoading(true)
                apiRequest("POST", "/confirmar-presenca/create", {...data})
                .then((res) => {
                    setLoading(false)
                    handleClose()
                    setSucesso("Ocorreu tudo certo ao confirmar sua presença!")
                    showNotification({message: "Lista criada com sucesso!", color: 'green', autoClose: true})
                })
                .catch((err) => {
                    setLoading(false)
                    showNotification({message: err.message, color: 'red', autoClose: true})
                });
            }
        }catch(err) {
            showNotification({message: err.message, color: 'red', autoClose: true})
        }
    }
            
    return <section className={styles.container} id="confirmar-presenca">
        <div className={styles.whiteBox}>
            <div className={styles.containerText}>
                <div className={styles.textTitle}>Confirme sua presença!</div>
                <div className={styles.text}>
                    Para simplificar o processo de contagem, solicitamos a gentileza de 
                    confirmar sua presença em nossa festa de casamento. Sua resposta será 
                    fundamental para a eficiente organização do grande dia, permitindo-nos 
                    planejar todos os detalhes com precisão. Agradecemos antecipadamente 
                    pela sua colaboração.
                </div>
            </div>

            {(sucesso.length > 2) && <Notification 
                color="green" 
                radius="md" 
                title="Sucesso!"
                className={styles.notificationCard}
                onClose={() => setSucesso("")}
            > {sucesso} </Notification>}

            <div className={styles.buttonContainer}>
                <Button 
                    radius="lg"
                    variant="gradient"
                    className={styles.button}
                    onClick={() => handleClickOpen()}
                    gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                >
                    Confirmar presença
                </Button>
            </div>
        </div>

        <Dialog
            open={open}
            maxWidth="lg"
            onClose={() => handleClose()}
            TransitionComponent={Transition}
        >
            <DialogTitle>
                <div className={styles.dialogTitle}> {"Confirmar preseça"} </div>
            </DialogTitle>
            <DialogContent> 
                <Grid 
                    container 
                    spacing={2}
                    className={styles.dialogContent}
                >
                    {(error.msg.length > 2) && 
                    <Grid item md={12} xs={12}>
                        <Notification 
                            color="red" 
                            radius="md" 
                            title="Erro!"
                            className={styles.notificationCss}
                            onClose={() => setError({...error, msg: ""})}
                        > {error.msg} </Notification> 
                    </Grid>}
                    <Grid item md={12} xs={12}>
                        <div className={styles.subTitle}>Dados para identificação!</div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <div className={styles.bodyContent}> Digite o nome, a idade e o celular para contato da pessoa para identificar na confirmação!</div>
                    </Grid>
                    
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="nome"
                            label="Nome"
                            error={{...error}.nome ? {...error}.nome : false}
                            value={{...data}.nome ? {...data}.nome : ""}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="idade"
                            label="Idade"
                            error={{...error}.idade ? {...error}.idade : false}
                            value={{...data}.idade ? {...data}.idade : ""}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="celular"
                            label="Celular"
                            error={{...error}.celular ? {...error}.celular : false}
                            value={{...data}.celular ? {...data}.celular : ""}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid 
                    container 
                    spacing={2}
                    flexDirection="row"
                    className={styles.dialogActions}
                >
                    <Grid item md={8} xs={12}></Grid>
                    <Grid item md={2} xs={12}>
                        <Button
                            style={{width: "100%"}}
                            color="red" 
                            variant="outline"
                            onClick={handleClose}
                        > cancelar </Button>
                    </Grid>
                    <Grid item md={2} xs={12}>
                        <Button 
                            style={{width: "100%"}}
                            radius="sm"
                            variant="gradient"
                            loading={loading}
                            onClick={createLista}
                            gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                        > finalizar </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    </section> 
}
