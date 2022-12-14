import '../styles/globals.css'
import Layout from '../src/utils/layout'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import NextNProgress from "nextjs-progressbar"
import { NameWrapper } from '../src/context/nameContext'
import { NavWrapper } from '../src/context/navContext'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const loader = document.getElementById('globalLoader');
    loader.style.display = 'none';
  }, []);
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <NavWrapper>
        <Layout>
          <NameWrapper>
            <NextNProgress color="var(--primary-accent)" options={{ showSpinner: false }} />
            <Component {...pageProps} />
            <Toaster position="bottom-center" toastOptions={{
              duration: 3000,
              style: {
                border: '2px solid var(--secondary-dark)',
                color: 'var(--primary-light)',
                background: 'var(--primary-dark)',
              },
              success: {
                iconTheme: {
                  primary: 'var(--primary-accent)',
                  secondary: 'var(--primary-light)',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--primary-error)',
                  secondary: 'var(--primary-light)',
                },
              },
            }}/>
          </NameWrapper>
        </Layout>
      </NavWrapper>
    </>
  )
}

export default MyApp
