import Head from 'next/head';
import Header from '../src/components/Header';
// import "./index.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Casamento L&V</title>
        <link rel="icon" href="/rings-wedding.png" />
      </Head>
      
      <Header/>
    </div>
  )
}
