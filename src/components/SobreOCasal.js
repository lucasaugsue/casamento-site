import React from 'react';
import styles from './SobreOCasal.module.css';

export default function SobreOCasal(){

    return <section className={styles.container}>
        <div className={styles.whiteBox}>
            <div className={styles.gridItem}>
                <div className={styles.imagem}/>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.containerText}>
                    <div className={styles.text}>Um pouco sobre nós</div>
                    <div className={styles.text}>Um pouco sobre nós</div>
                    {/* <div className={styles.text}>
                        Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.
                        Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.
                    </div> */}
                </div>
            </div>
        </div>
    </section> 
}
