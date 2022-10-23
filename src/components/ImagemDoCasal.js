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
        position: "absolute"
    },
    textoImage: {
        padding: "15px 15px 15px 15px",
        fontSize: "68px",
        fontWeight: 500,
        color:'white'
    }
}));

export default function ImagemDoCasal(){
    const classes = useStyles();

    return <div>
        <img className={classes.imageCasal} alt="" src="/fotodocasal.jpeg" />
        
        <div className={classes.gridContainer}>
            <div className={classes.gridItem}></div>
            <div className={classes.gridItem}>
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
