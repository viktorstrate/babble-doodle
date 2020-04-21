import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Head from 'next/head'

const Container = styled.div`
  max-width: 800px;
  margin: auto;
`

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 40px 60px;
    font-family: 'Delius', sans-serif;
  }
`

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Delius&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyles />
      <Container>{children}</Container>
    </>
  )
}
