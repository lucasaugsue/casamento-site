import React from 'react';
import styles from './Header.module.css';

export default function Header({transparent : transparentProps = true}){
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const [transparent, setTransparent] = React.useState(false);

    const handleScroll = e => {
        setScrollPosition(document.documentElement.scrollTop)
    }

    React.useEffect(() => {
        setTransparent(scrollPosition <= 100)
    }, [scrollPosition])

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // React.useEffect(() => {
    //     console.log("transparent",transparent)
    // }, [transparent])

    return <div>
        <div className={
            transparent
            ? styles.basicHeaderTransparent
            : styles.basicHeader
        }>
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
                    <div className={styles.headerText}>Bem-vindos</div>
                </div>
                <div className={styles.gridItem}>
                    <div className={styles.headerText}>Blog</div>
                </div>
                <div className={styles.gridItem}>
                    <div className={styles.headerText}>Confirme sua presença</div>
                </div>
                <div className={styles.gridItem}>
                    <div className={styles.headerText}>Entrar em contato</div>
                </div>
                <div className={styles.gridItem}>
                    <div className={styles.headerText}>Livro de visitas</div>
                </div>
                <div className={styles.gridItem}></div>
            </div>
        </div>
    </div> 
}
