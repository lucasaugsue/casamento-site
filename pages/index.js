import Head from 'next/head';
import Header from '../src/cards/Header';
import ImagemDoCasal from '../src/cards/ImagemDoCasal';
import SobreOCasal from '../src/cards/SobreOCasal';
import ConfirmarPresenca from '../src/cards/ConfirmarPresenca'
// import Local from '../src/components/Local'
import EscreverRecado from '../src/cards/EscreverRecado'
import ListaDePresentes from '../src/cards/ListaDePresentes'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Casamento L&V</title>
        <link rel="icon" href="/rings-wedding.png" />
      </Head>
      
      <Header/>
      <ImagemDoCasal/>
      <SobreOCasal/>
      <ConfirmarPresenca/>
      {/* <Local/> */}
      <EscreverRecado/>
      <ListaDePresentes/>
    </div>
  )
}
