import React from 'react'
import styles from './ImagemDoCasal.module.css'


export default function ImagemDoCasal(){
    const textRotate = () => {
        let deg = 6;
        let frase = "Lucas & Victória"

        return (
            <div className={styles.containerRotate}>
                {frase.split("").map((letra, index) => {
                    deg = 10 * (index + 1)

                    return <div 
                        style={{
                            transform: 'rotate(' + deg + 'deg)'
                        }}
                    >{letra}</div>
                })}
            </div>
        )
    }

    return <div className={styles.container}>
        <div className={styles.image}/>
        
        <div className={styles.divText}>
            <div className={styles.text}>
                {textRotate()}
            </div>
        </div>
    </div> 
}
