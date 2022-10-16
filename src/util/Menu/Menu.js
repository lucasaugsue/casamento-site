import { AppBar, IconButton } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import './Menu.module.scss'

export default function Menu(){
    const router = useRouter()
    const [openMenu, setOpenMenu] = React.useState(false);
    const [transparent, setTransparent] = React.useState(false);
    const [scrollPosition, setScrollPosition] = React.useState(0);

    const handleScroll = e => {
        setScrollPosition(document.documentElement.scrollTop)
    }

    React.useEffect(() => {
        // setTransparent(allowTransparent && scrollPosition < 100)
    }, [scrollPosition])

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return <AppBar elevation={0} className={`basic-header ${transparent ? 'transparent' : ''}`}>
        <nav className="header-menu">
            <ul className="menu-nav">       
                <li><Link href="/#quem-somos">Quem Somos</Link></li>
                <li><Link href="/#proposito">Propósito</Link></li>
                <li><Link href="/#entregas" >Entregas</Link></li>
            </ul>
        </nav>

        {/* <div className={`mobile-menu-nav ${openMenu ? 'visible' : ''}`}>  
            <IconButton onClick={() => setOpenMenu(false)} className="open-menu"><MenuIcon /></IconButton>

            <ul>
                <li onClick={() => setOpenMenu(false)}><Link href="/#quem-somos" >Quem Somos</Link></li>
                <li onClick={() => setOpenMenu(false)}><Link href="/#entregas" >Entregas</Link></li>
                <li onClick={() => setOpenMenu(false)}><Link href="/Participe" >Participe</Link></li>
            </ul>
        </div> */}
    </AppBar>
}
