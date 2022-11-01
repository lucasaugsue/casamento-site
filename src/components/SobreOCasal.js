import React from 'react';
import styles from './SobreOCasal.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function SobreOCasal(){

    return <section className={styles.container}>
        <div className={styles.whiteBox}>
            <div className={styles.imagem}/>

            <div className={styles.containerText}>
                <div className={styles.gridVamosNosCasar}>
                    <div className={styles.leftIcon}><FavoriteIcon className={styles.icons}/></div>
                    <div className={styles.textTitle}>Vamos nos casar!</div>
                    <div className={styles.rightIcon}> <FavoriteIcon className={styles.icons}/></div>
                </div>
                <div className={styles.subTitle}>Estamos nas núvens e queremos <br/>compartilhar todo nosso amor.</div>
                <div className={styles.text}>
                    Por isso criamos este site com um monte de coisa legais! Uma coisa importante,<br/> 
                    na parte Confirmação de Presença você poderá se vai ou não ao casamento.<br/>
                    Confirme sua presença para facilitar nosso planejamento, ficando mais previśivel! 
                </div>
            </div>

            <div className={styles.containerTempo}>
                <div className={styles.timeItem}>
                    <span>{`550`}</span>
                    <div>Dias</div>
                </div>
                <div className={styles.timeItem}>
                    <span>{` 15`}</span>
                    <div>Horas</div>
                </div>
                <div className={styles.timeItem}>
                    <span>{` 43`}</span>
                    <div>Minutos</div>
                </div>
            </div>
        </div>
    </section> 
}
