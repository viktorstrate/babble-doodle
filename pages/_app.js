import Head from 'next/head'

// eslint-disable-next-line no-unused-vars
import globalStyles from './global.sass'

export default function BabbleDoodle({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="/socket.io/socket.io.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
