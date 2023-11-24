import { Button, Input, Textarea } from '@mantine/core';
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
        nome: "", email: "", recado: ""
    });

    const handleChange = (e) => {
        setData(st => ({
            ...st, [e.target.name]: e.target.value
        }))
    }

    const sendMessage = () => {
        try{
            if(data.nome.length < 2) throw new Error("É necessário colocar o seu nome!")
            if(data.email.length < 10) throw new Error("É necessário colocar o seu email!")
            if(data.recado.length < 10) throw new Error("É necessário escrever alguma coisa no recado!")

            setLoading(true)
            apiRequest("POST", "/recados/create", {...data})
            .then((res) => {
                setLoading(false)
                setData({nome: "", email: "", recado: ""})
                showNotification({message: "Recado enviado com sucesso!", color: 'green', autoClose: true})
            })
            .catch((err) => {
                setLoading(false)
                showNotification({message: err.message, color: 'red', autoClose: true})
            });

        }catch(err){
            showNotification({message: err.message, color: 'red', autoClose: true})
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
            <div className={styles.containerInput}>
                <Input
                    size="md"
                    radius="lg"
                    name="nome"
                    icon={<IconUser />}
                    placeholder="Seu nome"
                    className={styles.input}
                    value={{...data}.nome || ""}
                    onChange={(e) => handleChange(e)}
                />

                <Input
                    size="md"
                    radius="lg"
                    name="email"
                    icon={<IconAt />}
                    placeholder="Seu email"
                    className={styles.input}
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
                    className={styles.input}
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
