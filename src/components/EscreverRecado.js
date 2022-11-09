import { Button, Input, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Email from '@mui/icons-material/Email';
import { InputAdornment, TextField } from '@mui/material';
import { IconAt } from '@tabler/icons';
import React from 'react';
import styles from './EscreverRecado.module.css';


export default function EscreverRecado(){
    const [data, setData] = React.useState({
        email: "", body: ""
    });

    const handleChange = (e) => {
        setData(st => ({
            ...st, [e.target.name]: e.target.value
        }))
    }

    const sendMessage = () => {
        try{
            if(data.email.length < 10) throw new Error("É necessário colocar o seu email!")
            if(data.body.length < 10) throw new Error("É necessário escrever alguma coisa no recado!")
            throw new Error("Funcionalidade ainda não implementada!")

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
                <TextField 
                    name="email"
                    label="Email" 
                    variant="outlined" 
                    placeholder="Seu email"
                    className={styles.input}
                    value={{...data}.email || ""}
                    onChange={(e) => handleChange(e)}
                    // InputProps={{
                    //     startAdornment: (
                    //       <InputAdornment position="start">
                    //         <IconAt />
                    //       </InputAdornment>
                    //     ),
                    // }}
                />

                <TextField 
                    multiline
                    minRows={6}
                    maxRows={6}
                    name="body"
                    label="Escreva o recado aqui" 
                    variant="outlined" 
                    placeholder="Escreva o recado"
                    className={styles.input}
                    value={{...data}.body || ""}
                    onChange={(e) => handleChange(e)}
                />

                <Button 
                    radius="lg"
                    variant="gradient"
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
