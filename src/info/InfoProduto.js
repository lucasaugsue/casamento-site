import React from 'react';
import styles from './InfoProduto.module.css';

export default function InfoProduto({params}){

    console.log("params", params)

    return <div>
        <div className={styles.marginHeader}></div>
        <div className={styles.cardContainer}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </div>
    </div>
}
