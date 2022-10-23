import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    boxHeader: {
        backgroundColor: "black",
    },
    gridContainerLogo: {
        display: "grid",
        gridTemplateColumns: "1fr auto auto auto 1fr",
    },
    gridContainerText: {
        width: '100%',
        padding: "15px",
        display: "grid",
        gridTemplateColumns: "1fr auto auto auto auto auto 1fr",
    },
    gridItem: {
        textAlign: "center",
    },
    headerText: {
        fontSize: "19px",
        padding: "15px 20px 20px 20px",
        color:'white'
    },
    logo: {
        padding: "15px 10px 0px 10px",
        fontSize: "34px",
        fontWeight: 500,
        color:'white'
    }
}));

export default function Header(){
    const classes = useStyles();

    return <div className={classes.boxHeader}>
        <div className={classes.gridContainerLogo}>
            <div className={classes.gridItem}></div>
            <div className={classes.gridItem}>
                <div className={classes.logo}>L</div>
            </div>
            <div className={classes.gridItem}>
                <div className={classes.logo}>&</div>
            </div>
            <div className={classes.gridItem}>
                <div className={classes.logo}>V</div>
            </div>
            <div className={classes.gridItem}></div>
        </div>
        <div className={classes.gridContainerText}>
            <div className={classes.gridItem}></div>
            <div className={classes.gridItem}>
                {/* <Link href="/#bem-vindos">Bem-vindos</Link> */}
                <div className={classes.headerText}>Bem-vindos</div>
            </div>
            <div className={classes.gridItem}>
                {/* <Link href="/#blog">Blog</Link> */}
                <div className={classes.headerText}>Blog</div>
            </div>
            <div className={classes.gridItem}>
                {/* <Link href="/#confirmar-presenca">Confirme sua presença</Link> */}
                <div className={classes.headerText}>Confirme sua presença</div>
            </div>
            <div className={classes.gridItem}>
                {/* <Link href="/#contato">Entrar em contato</Link> */}
                <div className={classes.headerText}>Entrar em contato</div>
            </div>
            <div className={classes.gridItem}>
                {/* <Link href="/#visitas">Livro de visitas</Link> */}
                <div className={classes.headerText}>Livro de visitas</div>
            </div>
            <div className={classes.gridItem}></div>
        </div>
    </div> 
}
