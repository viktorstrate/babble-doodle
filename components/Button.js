import React from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  border: none;
  padding: 10px 16px;
  margin: 4px;
  font-family: 'Delius', sans-serif;
  font-size: 24px;
  background-color: #ffd222;
  box-shadow: -4px 4px 0 #dfb50f;
  color: white;

  &:hover {
    box-shadow: -6px 6px 0 #e4be2a;
    cursor: pointer;
    background-color: #ffdd56;
  }

  &:disabled {
    cursor: default;
    box-shadow: -2px 2px 0 #ccc;
    background-color: #eee;
  }
`

export default function Button(props) {
  return <ButtonStyled {...props} />
}
