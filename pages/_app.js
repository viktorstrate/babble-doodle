import React from 'react'
import Head from 'next/head'

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
