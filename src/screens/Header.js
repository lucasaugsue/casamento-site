import Menu from '@mui/icons-material/Menu';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import styles from './Header.module.css';

export default function Header({transparent : transparentProps = true}){
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const [transparent, setTransparent] = React.useState(false);
    const [open, setOpen] = React.useState(false)

    const listItens = [
        {id: 1, title: "Início", section: "#inicio"},
        {id: 2, title: "Vamos nos casar", section: "#vamos-casar"},
        {id: 3, title: "Confirme sua presença", section: "#confirmar-presenca"},
        {id: 4, title: "Escreva um recado", section: "#recado"},
        {id: 5, title: "Lista de presentes", section: "#presentes"},
        // {id: 6, title: "Localização", section: "#local"},
    ]
    
    const changeOpen = () => setOpen(!open)

    const functionLetra = () => {
        setOpen(false)
        window.location.href=`/`
    }

    const functionSection = (i) => {
        setOpen(false)
        window.location.href=`/${i.section}`
    }

    React.useEffect(() => {
        setTransparent(scrollPosition <= 100)
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

    return <div>
        <div className={
            transparent
            ? styles.basicHeaderTransparent
            : styles.basicHeader
        }>
            <div className={styles.gridContainerLogo}>
                <div className={styles.itemLogo}>
                    {"L&V".split("")
                    .map((letra, index) => <div 
                        data-open={open}
                        className={styles.logo}
                        key={`${letra};;${index}`}
                        onClick={() => functionLetra()} 
                    >
                        {letra}
                    </div>)}
                </div>
                <div/>
                <div 
                    data-open={open}
                    data-testid="menu-icon"  
                    className={styles.itemIcon}
                    onClick={() => changeOpen()} 
                >
                    <Menu className={styles.icon}/>
                </div>
            </div>
            <Collapse 
                in={open}
                timeout="auto" 
                unmountOnExit
                className={styles.collapse}  
            >
                <List 
                    component="div" 
                    disablePadding
                    className={styles.list} 
                >
                    {listItens.map((i, index) => 
                    <ListItemButton 
                        sx={{ pl: 3 }}
                        data-open={open}
                        key={`${i.id};;${index}`}
                        onClick={() => functionSection(i)}
                    >
                        <ListItemText primary={i.title} />
                    </ListItemButton>)}
                </List>
            </Collapse>
        </div>
    </div> 
}
