import Head from 'next/head';
import Header from '../src/components/Header';
import ImagemDoCasal from '../src/components/ImagemDoCasal';
import SobreOCasal from '../src/components/SobreOCasal';
import ConfirmarPresenca from '../src/components/ConfirmarPresenca'
import Local from '../src/components/Local'

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
    </div>
  )
}
