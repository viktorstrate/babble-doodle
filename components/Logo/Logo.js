import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const LogoImg = styled.img`
  width: 400px;
  display: block;
  cursor: pointer;

  ${({ centered }) =>
    centered &&
    `
    margin: auto;
  `}
`

export default function Logo({ centered }) {
  return (
    <Link href="/">
      <LogoImg
        alt="Babble doodle logo"
        centered={centered}
        src="/img/logo.svg"
      />
    </Link>
  )
}
