import React from 'react'
import styles from './ImagemDoCasal.module.css'


export default function ImagemDoCasal(){

    return <div>
        <div className={styles.imageCasal}/>
        
        <div className={styles.gridContainer}>
            <div className={styles.gridItem}></div>
            <div style={{marginLeft: "8.75rem"}} className={styles.gridItem}>
                <div className={styles.textoImage}>Lucas & Victória</div>
            </div>
            <div className={styles.gridItem}></div>
        </div>
    </div> 
}
