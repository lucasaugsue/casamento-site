import React, { Suspense } from 'react';
import ClientContext from '../../src/contexts/ClientContext';
import InfoProduto from '../../src/info/InfoProduto'
import Header from '../../src/screens/Header';

export default function InfosScreen({label}) {
    const { apiRequest } = React.useContext(ClientContext);

    // get presente
    const [presente, setPresente] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const getPresente = () => {
        setLoading(true)
        apiRequest("GET", `/presentes/by/${label}`)
        .then((res) => {
            setPresente(res.item)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    React.useEffect(() => {
        getPresente()
    }, []);

    return <div>
        <Header/>
        {<Suspense fallback={<div>Loading...</div>}>
            {!loading ? <div>
                <InfoProduto params={presente}/>
            </div>

            : <div>produto...</div>}
        </Suspense>}
    </div>
}

export async function getServerSideProps  ({req, query}) {
    const { label } = query
    return { props:{ label } }
}
