import React from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header(){

    return <div className={styles.boxHeader}>
        <div className={styles.gridContainerLogo}>
            <div className={styles.gridItem}></div>
            <div className={styles.gridItem}>
                <div className={styles.logo}>L</div>
            </div>
            <div className={styles.gridItem}>
                <div className={styles.logo}>&</div>
            </div>
            <div className={styles.gridItem}>
                <div className={styles.logo}>V</div>
            </div>
            <div className={styles.gridItem}></div>
        </div>
        <div className={styles.gridContainerText}>
            <div className={styles.gridItem}></div>
            <div className={styles.gridItem}>
                {/* <Link href="/#bem-vindos">Bem-vindos</Link> */}
                <div className={styles.headerText}>Bem-vindos</div>
            </div>
            <div className={styles.gridItem}>
                {/* <Link href="/#blog">Blog</Link> */}
                <div className={styles.headerText}>Blog</div>
            </div>
            <div className={styles.gridItem}>
                {/* <Link href="/#confirmar-presenca">Confirme sua presença</Link> */}
                <div className={styles.headerText}>Confirme sua presença</div>
            </div>
            <div className={styles.gridItem}>
                {/* <Link href="/#contato">Entrar em contato</Link> */}
                <div className={styles.headerText}>Entrar em contato</div>
            </div>
            <div className={styles.gridItem}>
                {/* <Link href="/#visitas">Livro de visitas</Link> */}
                <div className={styles.headerText}>Livro de visitas</div>
            </div>
            <div className={styles.gridItem}></div>
        </div>
    </div> 
}
