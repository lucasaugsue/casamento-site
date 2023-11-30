import { Button, Input, Textarea, Notification } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Email from '@mui/icons-material/Email';
import { IconAt, IconUser } from '@tabler/icons';
import React from 'react';
import styles from './EscreverRecado.module.css';
import ClientContext from '../contexts/ClientContext';


export default function EscreverRecado(){
    const { apiRequest } = React.useContext(ClientContext);

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        nome: "", email: "", 
        recado: ""
    });

    const [sucesso, setSucesso] = React.useState("");
    const [error, setError] = React.useState({
        nome: false, email: false, 
        recado: false, msg: ""
    });


    const handleChange = (e) => {
        setData(st => ({
            ...st, [e.target.name]: e.target.value
        }))
    }

    const validationRecado = () => {
        setError({
            nome: false, email: false, 
            recado: false, msg: ""
        })

        if(data.recado.length < 5) setError((err) => ({...err, recado: true, msg: "É necessário escrever alguma coisa no recado!"}) )
        if(data.email.length < 2) setError((err) => ({...err, email: true, msg: "É necessário colocar o seu email!"}) )
        if(data.nome.length < 2) setError((err) => ({...err, nome: true, msg: "É necessário colocar o seu nome!"}) )
    }

    const sendMessage = () => {
        try{
            validationRecado()

            if( data.nome.length < 2 ||
                data.email.length < 2 ||
                data.recado.length < 5
                ) {  throw new Error(error.msg)
            
            } else {

                setLoading(true)
                apiRequest("POST", "/recados/create", {...data})
                .then((res) => {
                    setLoading(false)
                    setData({nome: "", email: "", recado: ""})
                    setSucesso("Ocorreu tudo certo ao enviar o recado!")
                    showNotification({message: "Recado enviado com sucesso!", color: 'green', autoClose: true})
                })
                .catch((err) => {
                    setLoading(false)
                    showNotification({message: err.message, color: 'red', autoClose: true})
                });
            }

        }catch(err){
            showNotification({message: "Não foi possível realizar a ação!", color: 'red', autoClose: true})
        }
    }

    return <section className={styles.container} id="recado">
        <div className={styles.whiteBox}>
            <div className={styles.containerText}>
                <div className={styles.gridRecado}>
                    <div className={styles.leftIcon}><Email className={styles.icons}/></div>
                    <div className={styles.textTitle}>Escreva um recado!</div>
                    <div className={styles.rightIcon}> <Email className={styles.icons}/></div>
                </div>
                <div className={styles.subTitle}>Esse espaço é reservado para você que deseja escrever um recado para os noivos.</div>
                <div className={styles.text}>
                    Todo texto será enviado para o nosso e-mail, apenas coloque seu e-mail e o recado que deseja passar para nós.
                </div>
            </div>

            {(sucesso.length > 2) && <Notification 
                color="green" 
                radius="md" 
                title="Sucesso!"
                className={styles.notificationCard}
                onClose={() => setSucesso("")}
            > {sucesso} </Notification>}

            {(error.msg.length > 2) && <Notification 
                color="red" 
                radius="md" 
                title="Erro ao enviar o recado!"
                className={styles.notificationCard}
                onClose={() => setError({...error, msg: ""})}
            > {error.msg} </Notification>}

            <div className={styles.containerInput}>
                <Input
                    size="md"
                    radius="lg"
                    name="nome"
                    icon={<IconUser />}
                    placeholder="Seu nome"
                    className={
                        error.nome
                        ? styles.inputError
                        : styles.input
                    }
                    value={{...data}.nome || ""}
                    onChange={(e) => handleChange(e)}
                />

                <Input
                    size="md"
                    radius="lg"
                    name="email"
                    icon={<IconAt />}
                    placeholder="Seu email"
                    className={
                        error.email
                        ? styles.inputError
                        : styles.input
                    }
                    value={{...data}.email || ""}
                    onChange={(e) => handleChange(e)}
                />

                <Textarea
                    size="md"
                    radius="lg"
                    autosize
                    minRows={6}
                    maxRows={6}
                    name="recado"
                    placeholder="Escreva o recado"
                    className={
                        error.recado
                        ? styles.inputError
                        : styles.input
                    }
                    value={{...data}.recado || ""}
                    onChange={(e) => handleChange(e)}
                />

                <Button 
                    radius="lg"
                    variant="gradient"
                    loading={loading}
                    className={styles.button} 
                    onClick={() => sendMessage()}
                    gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                >
                    Enviar
                </Button>
            </div>
        </div>
    </section> 
}
