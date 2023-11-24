import { Button, Input, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import React from 'react';
import styles from './ListaDePresentes.module.css';
import ClientContext from '../contexts/ClientContext';
import { Suspense } from 'react';
import CardReview from '../components/CardReview'
import BasicPagination from '../components/BasicPagination';

export default function ListaDePresentes(){
    const { apiRequest } = React.useContext(ClientContext);

    // get presentes
    const [presentes, setPresentes] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const [page, setPage] = React.useState(1);

    const presentPerPage = 3
    const count = parseInt([...presentes].length/presentPerPage)
    const sobra = parseInt([...presentes].length%presentPerPage)

    const handleChangePagination = (event, value) => {
        setPage(value);
    };

    const copiarTexto = () => {
        console.log("console sog hehe")
    }

    const getPresentes = () => {
        setLoading(true)
        apiRequest("GET", "/presentes/list")
        .then((res) => {
            setPresentes(res)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    React.useEffect(() => {
        getPresentes()
    }, []);

    return <section className={styles.container} id="presentes">
        <div className={styles.whiteBox}>
            <div className={styles.containerText}>
                <div className={styles.gridRecado}>
                    <div className={styles.leftIcon}><CardGiftcardIcon className={styles.icons}/></div>
                    <div className={styles.textTitle}>Lista de presentes!</div>
                    <div className={styles.rightIcon}> <CardGiftcardIcon className={styles.icons}/></div>
                </div>
                <div className={styles.subTitle}>Esses são os presentes que queremos para nossa futura casa.</div>
                <div className={styles.text}>
                    Todo presente será bem vindo, vamos começar a nossa vida a dois agora e toda ajuda é bem vinda.
                </div>
            </div>
                {<Suspense fallback={<div>Loading...</div>}>
                    {!loading ?
                        <div>
                            <div className={styles.containerPresentes}>
                                {
                                    ([...presentes])
                                    .slice((page - 1) * presentPerPage, page * presentPerPage)
                                    .map((item, index) => <div
                                        key={`${index};;${item.id}`} 
                                        className={styles.itemPresente}
                                    >
                                        <CardReview 
                                            key={`cr${index};;${item.id}`}
                                            params={{
                                                ...item, 
                                                color_id: index,
                                                handleChange: () => window.location.href = `/info/${item.id}`,
                                                compartilhar: () => copiarTexto()
                                            }} 
                                        />
                                    </div>)
                                }
                            </div>
                            <div className={styles.containerPagination}>
                                <div/>
                                <BasicPagination 
                                    page={page} 
                                    count={sobra === 0 ? count : count + 1 || 10}
                                    handleChange={handleChangePagination}
                                />
                                <div/>
                            </div>
                        </div>
                    : <div>lista...</div>}
                </Suspense>}
        </div>
    </section> 
}
