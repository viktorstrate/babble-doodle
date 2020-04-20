import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 800px;
  margin: auto;
`

export default function Layout({ children }) {
  return <Container>{children}</Container>
}
