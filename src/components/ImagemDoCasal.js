import React from 'react'
import styles from './ImagemDoCasal.module.css'


export default function ImagemDoCasal(){
    
    return <div>
        <img className={styles.imageCasal} alt="" src="/casaleapedra.jpeg" />
        
        <div className={styles.gridContainer}>
            <div className={styles.gridItem}></div>
            <div style={{marginLeft: "8.75rem"}} className={styles.gridItem}>
                <div className={styles.textoImage}>Lucas</div>
            </div>
            <div className={styles.gridItem}>
                <div className={styles.textoImage}>&</div>
            </div>
            <div className={styles.gridItem}>
                <div className={styles.textoImage}>Victória</div>
            </div>
            <div className={styles.gridItem}></div>
        </div>
    </div> 
}
