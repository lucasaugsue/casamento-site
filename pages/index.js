import Head from 'next/head';
import Header from '../src/components/Header';
import ImagemDoCasal from '../src/components/ImagemDoCasal';
import SobreOCasal from '../src/components/SobreOCasal';
import ConfirmarPresenca from '../src/components/ConfirmarPresenca'
import Local from '../src/components/Local'
import EscreverRecado from '../src/components/EscreverRecado'

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
      <Local/>
      <EscreverRecado/>
    </div>
  )
}
