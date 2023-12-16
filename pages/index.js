import Head from 'next/head';
import Header from '../src/screens/Header';
import ImagemDoCasal from '../src/screens/ImagemDoCasal';
import SobreOCasal from '../src/screens/SobreOCasal';
import ConfirmarPresenca from '../src/screens/ConfirmarPresenca'
// import Local from '../src/screens/Local'
import EscreverRecado from '../src/screens/EscreverRecado'
import ListaDePresentes from '../src/screens/ListaDePresentes'
import Footer from '../src/screens/Footer';

export default function Render() {
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
      <Footer/>
    </div>
  )
}
