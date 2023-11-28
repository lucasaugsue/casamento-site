import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, TextField } from '@mui/material';
import React from 'react';
import ClientContext from '../contexts/ClientContext';
import styles from './ConfirmarPresenca.module.css';
import HorizontalLinearStepper from '../components/HorizontalLinearStepper';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const cardSx = {
    padding: "1vh 0.5vw",
    borderRadius: "8px",
    minHeight: "16vh",
    maxHeight: "16vh",

    borderColor: "#c4c4c4",
    borderStyle: "solid",

    position: "relative",
    overflow: "auto",
}

const listaMokada = [
    {
        "idade": "21",
        "nome": "Lucas Augsuê"
    },
    {
        "idade": "21",
        "nome": "Victória Melo"
    }
]

export default function ConfirmarPresenca(){
    const { apiRequest } = React.useContext(ClientContext);

    const [data, setData] = React.useState({nome: "", email: "", lista: []});
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [contentForm, setContentForm] = React.useState({nome: "", idade: ""});
    const [loading, setLoading] = React.useState(false);

    const [error, setError] = React.useState({
        nome: false, email: false,
        lista: false, lista_nome: false,
        lista_idade: false
    });

    // HorizontalLinearStepper
    const steps = ['', '', '', ''];

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    // Functions
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
        setActiveStep(0)
        setContentForm({nome: "", idade: ""})
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

            // showNotification({message: "Adicionado com sucesso na lista!", color: 'green', autoClose: true})

        }catch(err) {
            showNotification({message: err.message, color: 'red', autoClose: true})
        }
    }

    const createLista = () => {
        setLoading(true)
        apiRequest("POST", "/confirmar-presenca/create", {...data})
        .then((res) => {
            setLoading(false)
            handleClose()
            showNotification({message: "Lista criada com sucesso!", color: 'green', autoClose: true})
        })
        .catch((err) => {
            setLoading(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }
            
    // HorizontalLinearStepper
    // const steps = ['Como fazer?', 'Email e celular!', 'Exemplo de lista!', 'Adicionando na lista!'];

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

    const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

    // ainda fazendo
    const validationIdentificacao = () => {
        setError({
            nome: false, email: false,
            lista: false, lista_nome: false,
            lista_idade: false
        })

        if (!data.email && data.nome.length < 2) { setError(e => ({...e, email:true})) }
        if (!data.email && data.email.length < 2) { setError(e => ({...e, email:true})) }

        if( !error.nome &&
            !error.email ) handleNext()
    }

    // ainda fazendo
    const validationLista = () => {
        setError({
            nome: false, email: false,
            lista: false, lista_nome: false,
            lista_idade: false
        })

        if (data.lista.length < 1) { setError(e => ({...e, lista:true})) }

        let nomeError = data.lista.find(i => !i.nome || i.nome.length < 1)
		if(nomeError) { setError(e => ({...e, lista_nome:true})) }

        let idadeError = data.lista.find(i => !i.idade || i.idade.length < 1)
		if(idadeError) { setError(e => ({...e, lista_idade:true})) }

        if( !error.lista && 
            !error.lista_nome && 
            !error.lista_idade ) handleNext()
    }

    // funçao do botão continuar
    const handleFunction = () => {
        switch (activeStep) {
            case 0:
                return handleNext() // Como confirmar sua presença?
            case 1:
                //return validationIdentificacao() // Dados para identificação!
                return handleNext()
            case 2:
                return handleNext() // Exemplo de lista!
            case 3:
                // return validationLista() // Lista dos confirmados!
                return handleNext()
            case 4:
                return createLista() // Finalizando!
        }
    }

    // parte do return DOM
    const contetnConfirmados = () => (
        <Grid 
            container
            spacing={1}
            alignContent="center"
            flexDirection="column"
            alignItems="center"
            className={styles.dialogContent}
        >
            <HorizontalLinearStepper
                steps={steps}
                activeStep={activeStep}
                skipped={skipped}
                getStepBody={getStepBody}
            />
        </Grid>
    )

    const cardDosConfirmados = ({lista, disabled}) => (
        <Card 
            variant="outlined"
            sx={cardSx}
        >
            <Grid
                container
                spacing={1}
                direction="row"
            >
                <Grid item md={12} xs={12}>
                    <div className={styles.bodyContent}> Lista dos confirmados: </div>
                </Grid>
                {(lista || [])
                .map((item, index) => (
                    <Grid 
                        item
                        key={`${item};;${index}`}
                        xs={12} sm={6} md={4}
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
                                            disabled ? {} : setData({
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
    )

    const getStepBody = () => {
		switch (activeStep) {
			case 0:
                return (
                    <Grid 
                        container 
                        spacing={2}
                        className={styles.containerStepBody}
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
                    </Grid>
                )
            case 1:
                return (
                    <Grid 
                        container 
                        spacing={2}
                        className={styles.containerStepBody}
                    >
                        <Grid item md={12} xs={12}>
                            <div className={styles.subTitle}>Dados para identificação!</div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div className={styles.bodyContent}>1) Digite o nome e o e-mail de uma das pessoas para identificar as pessoas na lista!</div>
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
                                name="email"
                                label="Email"
                                error={{...error}.email ? {...error}.email : false}
                                value={{...data}.email ? {...data}.email : ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                    </Grid>
                )
            case 2:
                return (
                    <Grid 
                        container 
                        spacing={2}
                        className={styles.containerStepBody}
                    >
                        <Grid item md={12} xs={12}>
                            <div className={styles.subTitle}>Exemplo de lista!</div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div className={styles.bodyContent}>1) Para adicionar as pessoas na lista basta escrever o nome e a sua idade respectiva e clicar no botão "adicionar" para colocar na lista de confirmados!</div>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                type="text"
                                name="nome"
                                label="Nome"
                                value={"Algum nome"}
                                onChange={(e) => handleChangeContent(e)}
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                type="text"
                                name="idade"
                                label="Idade"
                                value={"30"}
                                onChange={(e) => handleChangeContent(e)}
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Button
                                disabled
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
                        <Grid item md={12} xs={12}>
                            <div className={styles.bodyContent}>2) Adicione pessoa por pessoa que vai com você na nossa festa!</div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div className={styles.bodyContent}>3) Agora que já entendeu, clique em "continuar" e faça a sua lista!</div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div className={styles.subTitle}>Exemplo:</div>
                        </Grid>
                        <Grid item md={12} xs={12}></Grid>
                        <Grid item md={12} xs={12}>
                            { cardDosConfirmados({lista: listaMokada, disabled: true}) }
                        </Grid>
                    </Grid>
                )
            case 3:
                return (
                    <Grid 
                        container 
                        spacing={2}
                        className={styles.containerStepBody}
                    >
                        <Grid item md={12} xs={12}>
                            <div className={styles.subTitle}>Lista dos confirmados!</div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div className={styles.bodyContent}>1) Para adicionar as pessoas na lista basta escrever o nome e a sua idade respectiva e clicar no botão "adicionar" para colocar na lista de confirmados!</div>
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
                        <Grid item md={12} xs={12}>
                            <div className={styles.bodyContent}>2) Adicione pessoa por pessoa que vai com você na nossa festa!</div>
                        </Grid>
                        <Grid item md={12} xs={12}></Grid>
                        <Grid item md={12} xs={12}>
                            { cardDosConfirmados({lista: data.lista, disabled: false}) }
                        </Grid>
                    </Grid>
                )
            case 4:
                return (
                    <Grid 
                        container 
                        spacing={2}
                        className={styles.containerStepBody}
                    >
                        <Grid item md={12} xs={12}>
                            <div className={styles.subTitle}>Finalizando!</div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div className={styles.bodyContent}>1) Se sua lista está totalmente coreta apenas clique em finalizar!</div>
                        </Grid>
                         <Grid item md={6} xs={12}>
                            <TextField
                                disabled
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
                                disabled
                                fullWidth
                                type="text"
                                name="email"
                                label="Email"
                                value={{...data}.email ? {...data}.email : ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}></Grid>
                        <Grid item md={12} xs={12}>
                            { cardDosConfirmados({lista: data.lista, disabled: false}) }
                        </Grid>
                    </Grid>
                )
            default:
                return (<div> sem nenhum params</div>)
        }
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
            <DialogContent> {contetnConfirmados()} </DialogContent>
            <DialogActions>
                <Grid 
                    container 
                    spacing={2}
                    className={styles.dialogActions}
                >
                    <Grid item md={8} xs={2}></Grid>
                    <Grid item md={2} xs={4}>
                        <Button
                            color="red" 
                            variant="outline"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        > voltar </Button>
                    </Grid>
                    <Grid item md={2} xs={4}>
                        <Button 
                            radius="sm"
                            variant="gradient"
                            loading={loading}
                            onClick={handleFunction}
                            gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                        >
                            {activeStep === 4 ? "finalizar" : "continuar"}
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    </section> 
}
