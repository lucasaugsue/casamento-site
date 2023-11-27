import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, TextField } from '@mui/material';
import React from 'react';
import ClientContext from '../contexts/ClientContext';
import styles from './ConfirmarPresenca.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmarPresenca(){
    const { apiRequest } = React.useContext(ClientContext);

    const [data, setData] = React.useState({nome: "", email: "", lista: []});
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [contentForm, setContentForm] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const handleChangeContent = (e) => setContentForm(params => ({
        ...params, [e.target.name]: e.target.value
    }))

    const handleChange = (e) => setData(params => ({
        ...params, [e.target.name]: e.target.value
    }))

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setEdit(false)
        setOpen(false);
        setData({nome: "", email: "", lista: []})
    };

    const handleAdd = () => {
        try{
            let nomeError = data.lista.find(i => !i.nome || i.nome.length < 1)
            if(nomeError) throw new Error("Alguem na lista está sem nome!")

            let idadeError = data.lista.find(i => !i.idade || i.idade.length < 1)
            if(idadeError) throw new Error("Alguem na lista está sem idade!")

            let tmp = []
            if(data.lista && data.lista.length > 0) tmp = data.lista
            tmp.push({...contentForm})
    
            setContentForm({})
    
            setData({
                ...data,
                lista: tmp    
            })

            showNotification({message: "Adicionado com sucesso na lista!", color: 'green', autoClose: true})

        }catch(err) {
            showNotification({message: err.message, color: 'red', autoClose: true})
        }
    }

    const createLista = () => {
        setLoading(true)
        apiRequest("POST", "/confirmar-presenca/create", {...data})
        .then((res) => {
            setLoading(false)
            setData({nome: "", email: "", lista: []})
            handleClose()
            showNotification({message: "Lista criada com sucesso!", color: 'green', autoClose: true})
        })
        .catch((err) => {
            setLoading(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    return <section className={styles.container} id="confirmar-presenca">
        <div className={styles.whiteBox}>
            <div className={styles.containerText}>
                <div className={styles.textTitle}>Confirme sua presença!</div>
                <div className={styles.text}>
                    Para facilitar na contagem, pedimos que você confirme se 
                    irá comparecer para a nossa festa de casamento ou não!
                    Assim, vamos conseguir nos organizar melhor para o grande
                    dia!
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <Button 
                    color="red" 
                    radius="xl"
                    variant="outline"
                    className={styles.button} 
                >
                    Não vou
                </Button>
                <Button 
                    radius="xl"
                    variant="gradient"
                    className={styles.button}
                    onClick={() => handleClickOpen()}
                    gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                >
                    Eu vou
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
                    spacing={1}
                    alignContent="center"
                    flexDirection="column"
                    alignItems="center"
                    className={styles.dialogContent}
                >
                    <Grid 
                        container 
                        spacing={2}
                    >
                        <Grid item md={12} xs={12}>
                            <div className={styles.subTitle}>Como confirmar sua presença?</div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div className={styles.bodyContent}>1) Vamos precisar do nome e o e-mail de uma das pessoas para conseguirmos identificar!</div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div className={styles.bodyContent}>2) Esse bloco em baixo em branco com "Lista de confirmados:" é para saber quem já foi adicionado e vai com você para a festa de casamento!</div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div className={styles.bodyContent}>3) Para adicionar as pessoas na lista basta escrever o nome e a sua idade respectiva e clicar no botão "adicionar" para colocar na lista de confirmados!</div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Divider sx={{
                                color: "#626262",
                                margin: "2vh 0"
                            }}/>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                name="nome"
                                label="Nome"
                                value={{...data}.nome ? {...data}.nome : ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                name="email"
                                label="Email"
                                value={{...data}.email ? {...data}.email : ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                name="nome"
                                label="Nome"
                                value={{...contentForm}.nome ? {...contentForm}.nome : ""}
                                onChange={(e) => handleChangeContent(e)}
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                name="idade"
                                label="Idade"
                                value={{...contentForm}.idade ? {...contentForm}.idade : ""}
                                onChange={(e) => handleChangeContent(e)}
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Button
                                radius="sm"
                                variant="gradient"
                                className={styles.addButton}
                                onClick={() => handleAdd()}
                                gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                            >
                                Adicionar
                            </Button>
                        </Grid>
                        <Grid item md={3} xs={12}></Grid>
                        <Grid item md={12} xs={12}></Grid>
                        <Grid item md={12} xs={12}>
                            <Card 
                                variant="outlined"
                                sx={{
                                    padding: "1vh 0.5vw",
                                    borderRadius: "8px",
                                    minHeight: "16vh",
                                    maxHeight: "16vh",

                                    borderColor: "#c4c4c4",
                                    borderStyle: "solid",

                                    position: "relative",
                                    overflow: "auto",
                                }}
                            >
                                <Grid
                                    container
                                    spacing={1}
                                    direction="row"
                                >
                                    <Grid item md={12} xs={12}>
                                        <div className={styles.bodyContent}> Lista dos confirmados: </div>
                                    </Grid>
                                    {(data.lista || [])
                                    .map((item, index) => (
                                        <Grid 
                                            item
                                            key={`${item};;${index}`}
                                            xs={6} sm={6} md={4}
                                        >
                                            <Card 
                                                variant="elevation"
                                                className={styles.cardItem}
                                                >
                                                <Grid 
                                                    container
                                                    spacing={1}
                                                    direction="row"
                                                >
                                                    <Grid item>
                                                        <HighlightOffIcon
                                                            className={styles.closeIcon}
                                                            onClick={() => {
                                                                setData({
                                                                    ...data,
                                                                    lista: data.lista.filter(i => i !== item) 
                                                                })
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        Nome: {item.nome}
                                                    </Grid>
                                                    <Grid item></Grid>
                                                    <Grid item>
                                                        Idade: {item.idade}
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>)
                                    )}
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions style={{
                padding: "0.5vh 1.5vw 2vh 0"
            }}>
                <Button
                    color="red" 
                    variant="outline"
                    onClick={handleClose}
                > Fechar </Button>
                <Button 
                    radius="sm"
                    variant="gradient"
                    loading={loading}
                    onClick={createLista}
                    gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                >
                    {edit ? "Editar" : "Cadastrar"}
                </Button>
            </DialogActions>
        </Dialog>
    </section> 
}
