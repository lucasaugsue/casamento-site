import React from 'react'
import styles from './ImagemDoCasal.module.css'


export default function ImagemDoCasal(){
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const [scroll, setScroll] = React.useState(false);

    React.useEffect(() => {
        setScroll(scrollPosition <= 100)
    }, [scrollPosition])
    
    React.useEffect(() => {
        const handleScroll = e => {
            setScrollPosition(document.documentElement.scrollTop)
        }

        if (typeof window !== "undefined") {
            
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }

    }, []) // empty dependencies array means "run this once on first mount"

    const textRotate = () => {
        let deg = 6;
        let frase = "Lucas & Victória"

        return (
            <div className={
                scroll
                ? styles.containerRotate
                : styles.containerRotateScroling
            }>
                {frase.split("").map((letra, index) => {
                    deg = 10 * (index + 1)

                    return <div 
                        key={`${letra};;${index}`}
                        style={{
                            transform: 'rotate(' + deg + 'deg)'
                        }}
                    >{letra}</div>
                })}
            </div>
        )
    }

    return <section className={styles.container} id="inicio">
        <div className={styles.image}/>
        
        <div className={styles.divText}>
            <div className={styles.text}>
                {textRotate()}
            </div>
        </div>
    </section> 
}
