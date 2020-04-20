import React from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  border: none;
  padding: 10px 16px;
  margin: 4px;
  font-family: 'Delius', sans-serif;
  font-size: 24px;
  background-color: #ffd222;
  /* box-shadow: -4px 4px 0 #dfb50f; */
  color: white;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    background-color: #dfb50f;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: translate(-22px, -4px) rotate(1.5deg);
  }

  &:hover {
    &::before {
      transform: translate(-20px, -6px) rotate(-1deg);
    }

    cursor: pointer;
    background-color: #ffdd56;
  }

  &:disabled {
    &::before {
      transform: translate(-20px, -9px) rotate(1.5deg);
      background-color: #ccc;
    }

    cursor: default;
    background-color: #eee;
  }
`

export default function Button(props) {
  return <ButtonStyled {...props} />
}
