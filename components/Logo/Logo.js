import React from 'react'
import styled from 'styled-components'

const LogoImg = styled.img`
  width: 400px;
  display: block;

  ${({ centered }) =>
    centered &&
    `
    margin: auto;
  `}
`

export default function Logo({ centered }) {
  return (
    <LogoImg alt="Babble doodle logo" centered={centered} src="/img/logo.svg" />
  )
}
