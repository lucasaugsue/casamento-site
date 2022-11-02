import Menu from '@mui/icons-material/Menu';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import styles from './Header.module.css';

export default function Header({transparent : transparentProps = true}){
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const [transparent, setTransparent] = React.useState(false);
    const [open, setOpen] = React.useState(false)

    const listItens = [
        {id: 1, title: "Vamos nos casar"},
        {id: 2, title: "Confirme sua presença"},
        {id: 3, title: "Entrar em contato"},
        {id: 4, title: "Livro de visitas"},
    ]

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

    return <div>
        <div className={
            transparent
            ? styles.basicHeaderTransparent
            : styles.basicHeader
        }>
            <div className={styles.gridContainerLogo}>
                <div className={styles.itemLogo}>
                    <div className={styles.logo}>L</div>
                    <div className={styles.logo}>&</div>
                    <div className={styles.logo}>V</div>
                </div>
                <div/>
                <div 
                    className={styles.itemIcon}
                    onClick={() => setOpen(!open)} 
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
                    {listItens.map((i) => 
                    <ListItemButton sx={{ pl: 1 }}>
                        <ListItemText primary={i.title} />
                    </ListItemButton>)}
                </List>
            </Collapse>
        </div>
    </div> 
}
