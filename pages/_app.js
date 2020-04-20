import React from 'react'
import Head from 'next/head'

// eslint-disable-next-line no-unused-vars
import globalStyles from './global.sass'

export default function BabbleDoodle({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="/socket.io/socket.io.js"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Delius&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
