import Head from 'next/head';
import Menu from '../src/util/Menu/Menu';
// import "./index.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Casamento L&V</title>
        <link rel="icon" href="/rings-wedding.png" />
      </Head>
      
      <Menu/>
    </div>
  )
}
