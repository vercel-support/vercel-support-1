import '../scss/style.scss'
import Head from 'next/head';


const App = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
    </React.Fragment>
  )
}

export default App