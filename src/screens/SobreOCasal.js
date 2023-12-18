import React from 'react';
import moment from "moment-timezone";
import styles from './SobreOCasal.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { extractToTime } from '../util/ExtractToTime'

export default function SobreOCasal(){

    const time = extractToTime(
        moment("2024-08-17T00:00:00-03:00")
        .diff(moment(), "seconds")
    )

    return <section className={styles.container} id="vamos-casar">
        <div className={styles.whiteBox}>
            <div className={styles.imagem}/>

            <div className={styles.containerText}>
                <div className={styles.gridVamosNosCasar}>
                    <div className={styles.leftIcon}><FavoriteIcon className={styles.icons}/></div>
                    <div className={styles.textTitle}>Vamos nos casar!</div>
                    <div className={styles.rightIcon}> <FavoriteIcon className={styles.icons}/></div>
                </div>
                <div className={styles.subTitle}>Estamos nas núvens e queremos compartilhar todo nosso amor.</div>
                <div className={styles.text}>
                    Por isso criamos este site com um monte de coisa legais! Uma coisa importante, 
                    na parte Confirmação de Presença você poderá confirmar se vai ou não ao casamento.
                    Confirme sua presença para facilitar nosso planejamento, ficando mais previśivel! 
                </div>
            </div>

            <div className={styles.containerTempo}>
                <div className={styles.timeItem}>
                    <span>{time.days}</span>
                    <div>Dias</div>
                </div>
                <div className={styles.timeItem}>
                    <span>{time.hour}</span>
                    <div>Horas</div>
                </div>
                <div className={styles.timeItem}>
                    <span>{time.min}</span>
                    <div>Minutos</div>
                </div>
            </div>
        </div>
    </section> 
}
