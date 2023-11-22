import React from 'react';
import { Button } from '@mantine/core';
import styles from './ConfirmarPresenca.module.css';

export default function ConfirmarPresenca(){

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
                    gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                >
                    Eu vou
                </Button>
            </div>
        </div>
    </section> 
}
