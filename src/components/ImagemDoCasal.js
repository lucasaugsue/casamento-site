import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        display: "grid",
        position: "relative",
        gridTemplateColumns: "1fr auto auto auto 1fr",
    },
    gridItem: {
        textAlign: "center",
    },
    imageCasal: {
        float: "left",
        width: "100%",
        position: "absolute"
    },
    textoImage: {
        textAlign: "center",
        padding: "15px 20px 15px 20px",
        fontSize: "8rem",
        fontWeight: 800,
        color:'#C99971',
        textStroke: "1px #5A4432",
    }
}));

export default function ImagemDoCasal(){
    const classes = useStyles();

    return <div>
        <img className={classes.imageCasal} alt="" src="/casaleapedra.jpeg" />
        
        <div className={classes.gridContainer}>
            <div className={classes.gridItem}></div>
            <div style={{marginLeft: "8.75rem"}} className={classes.gridItem}>
                <div className={classes.textoImage}>Lucas</div>
            </div>
            <div className={classes.gridItem}>
                <div className={classes.textoImage}>&</div>
            </div>
            <div className={classes.gridItem}>
                <div className={classes.textoImage}>Victória</div>
            </div>
            <div className={classes.gridItem}></div>
        </div>
    </div> 
}
