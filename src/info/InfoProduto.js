import { Button } from '@mantine/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import InformationDialog from '../components/InformationDialog';
import PixDialog from '../components/PixDialog';
import styles from './InfoProduto.module.css';

const formatReais = (value) => {
    return `R$ ${parseFloat(value ? value : 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}`
}


export default function InfoProduto({params}){
    const [openPayment, setOpenPayment] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(false);

    const handleOpenInfo = () => setOpenInfo(true);
    const handleCloseInfo = () =>  setOpenInfo(false);

    const handleOpenPayment = () => setOpenPayment(true);
    const handleClosePayment = () =>  setOpenPayment(false);

    return <div className={styles.container}>
        <div className={styles.whiteBox}>

            <div className={styles.cardContainer}>
                <div className={styles.containerImage}>
                    <div className={styles.iconsContainer}>
                        <div className={styles.boxCursor} title="Favorito dos noivos">
                            <FavoriteIcon/>
                            <div className={styles.textIcon}> favorito </div>
                        </div>
                        <div className={styles.boxCursor} title="Copiar link">
                            <ShareIcon/>
                            <div className={styles.textIcon}> compartilhar </div>
                        </div>
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
                            <div
                                onClick={() => handleOpenInfo()}
                                className={styles.maisInformacoes}
                            > sobre o pagamento </div>
                        </CardContent>
                    </Card>
                    <Button
                        color="red"
                        radius="xs"
                        variant="filled"
                        onClick={() => handleOpenPayment()}
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

        <PixDialog
            open={openPayment}
            handleClose={() => handleClosePayment()}
        />

        <InformationDialog
            open={openInfo}
            handleClose={() => handleCloseInfo()}
            title={"Sobre o pagamento"} 
            textContent={"O valor depositado no pix será usado para comprar alguns itens que ainda faltam na casa dos noivos, o dinheiro depositado será bem vindo para o começo da vida a dois."} 
            textButton={"Entendi"}
        />

    </div>
}
