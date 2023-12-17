import Menu from '@mui/icons-material/Menu';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import styles from './Footer.module.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ClientContext from '../contexts/ClientContext';

export default function Footer(){
    const { apiRequest } = React.useContext(ClientContext);

    const listItens = [
        {id: 3, title: "Confirme sua presença", section: "#confirmar-presenca"},
        {id: 4, title: "Escreva um recado", section: "#recado"},
        {id: 5, title: "Lista de presentes", section: "#presentes"},
    ]

    // get presentes
    const [presentes, setPresentes] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

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

    return <div>
        <div className={styles.redesSociaisContainer}>
            <div className={styles.redesSociaisText}> 
                Siga nas redes sociais
            </div>
            <div/>
            <div className={styles.containerIcons}>
                <div className={styles.iconsRedesSociais}>
                    <InstagramIcon onClick={() => window.open("https://www.instagram.com/lucas_augsue/")}/>
                </div> 
                <div className={styles.iconsRedesSociais}>
                    <LinkedInIcon onClick={() => window.open("https://www.linkedin.com/in/lucas-augsue/")}/>
                </div> 
                <div className={styles.iconsRedesSociais}> 
                    <GitHubIcon onClick={() => window.open("https://github.com/lucasaugsue")}/>
                </div>
                <div className={styles.iconsRedesSociais}>
                    <GoogleIcon onClick={() => window.open("https://www.google.com/search?q=lucas+augsue&client=opera&hs=UyF&sca_esv=591504270&sxsrf=AM9HkKko2i1mK_ahxmXKk2mwl9tJm_rLaw%3A1702739299042&ei=Y719Za-OAvW35OUP65GAmAo&ved=0ahUKEwjvy8GYnpSDAxX1G7kGHesIAKMQ4dUDCBA&uact=5&oq=lucas+augsue&gs_lp=Egxnd3Mtd2l6LXNlcnAiDGx1Y2FzIGF1Z3N1ZUiKB1CxBFjHBXABeACQAQCYAf4BoAH-AaoBAzItMbgBA8gBAPgBAeIDBBgBIEGIBgE&sclient=gws-wiz-serp#ip=1")}/>
                </div>
            </div>
        </div>

        <div className={styles.maisInformacoesContainer}>
            <div className={styles.gridInformacoes}> 

                <div className={styles.maisInformacoesTitle}> 
                    Mais informações 
                </div>

                <div className={styles.maisInformacoesBody}> 
                    Para auxiliar no meu sonho em casar no meio do ano de 2024, por isso resolvi eu 
                    mesmo fazer o site do meu casamento 
                </div>

            </div>
            <div className={styles.gridInformacoes}> 

                <div className={styles.maisInformacoesTitle}> 
                    Presentes
                </div>

                {!loading && [...presentes.slice(0,3)]
                    .map((item, index) => <div 
                        key={`${index};;${item.id}`} 
                        className={styles.textLink}
                        onClick={() => window.location.href = `/info/${item.id}`}
                    > 
                        {
                            (item.nome && item.nome.length > 32)
                            ? `${item.nome.slice(0, 30)}...`
                            : item.nome || ""
                        }
                    </div>
                )}

            </div>
            <div className={styles.gridInformacoes}> 

                <div className={styles.maisInformacoesTitle}> 
                    Links importantes 
                </div>

                {listItens.map((i, index) => 
                    <div className={styles.textLink}
                        key={`${i.id};;${index}`}
                        onClick={() => {
                            window.location.href=`/${i.section}`
                        }}
                    > {i.title} </div>
                )}
            </div>
            <div className={styles.gridInformacoes}> 

                <div className={styles.maisInformacoesTitle}> 
                    Contato
                </div>

                <div className={styles.boxContato}>
                    <EmailIcon/> 
                    <div className={styles.maisInformacoesBody}> 
                        lucasaugsue7@gmail.com
                    </div>
                </div>

                <div className={styles.boxContato}>
                    <CallIcon/> 
                    <div className={styles.maisInformacoesBody}> 
                        (61)98114-6060
                    </div>
                </div>

            </div>
        </div>

        <div className={styles.copyrightContainer}>
            <div/>
            <div className={styles.copyrightText}> 
                @ 2023 Copyright lucasaugsue 
            </div>
            <div/>
        </div> 
    </div>
}
