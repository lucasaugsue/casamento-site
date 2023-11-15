import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './InfoProduto.module.css';
import { formatReais } from '../util/Util'
import { Button } from '@mantine/core';


export default function InfoProduto({params}){

    console.log("params", params)

    return <div className={styles.container}>
        <div className={styles.whiteBox}>

            <div className={styles.cardContainer}>
                <div className={styles.containerImage}>
                    <div className={styles.iconsContainer}>
                        <Tooltip className={styles.boxCursor} title="Favorito dos noivos">
                            <FavoriteIcon/>
                            <div className={styles.textIcon}> favorito </div>
                        </Tooltip>
                        <Tooltip className={styles.boxCursor} title="Copiar link">
                            <ShareIcon/>
                            <div className={styles.textIcon}> compartilhar </div>
                        </Tooltip>
                    </div>
                    <img
                        className={styles.imagem}
                        srcSet={`${params.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${params.url}?w=164&h=164&fit=crop&auto=format`}
                        alt={params.nome}
                        loading="lazy"
                    />
                </div>
                <div className={styles.containerText}>
                    <div className={styles.title}>{params.nome}</div>
                    <div className={styles.descricao}>{params.descricao}</div>
                    <a

                        target="_blank"
                        href={`${params.mais_informacoes}`}
                        className={styles.maisInformacoes}
                    > mais informações </a>
                </div>
                <div className={styles.containerPreco}>
                    <Card className={styles.cardPreco}>
                        <CardContent>
                            <div className={styles.preco}>{ formatReais(parseFloat(params.preco || 0)) }</div>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                no pix
                            </Typography>
                            <div className={styles.maisInformacoes}>
                                sobre o pagamento
                            </div>
                        </CardContent>
                    </Card>
                    <Button
                        color="red"
                        radius="xs"
                        variant="filled"
                    >
                        Pagamento
                    </Button>
                    <Typography sx={{ fontSize: '1.6vh', marginTop: '1.7vh' }} color="text.secondary">
                        Esse valor será usado para os noivos comprarem este produto especial. 
                    </Typography>
                    <div/>
                </div>
            </div>

        </div>
    </div>
}
