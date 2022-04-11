import React from 'react'
import styled from 'styled-components'

interface NumberInputProps {
  label: string
  value: string | number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Wrapper = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Label = styled.span`
  width: 30%;
`

const Input = styled.input`
  width: 60%;
`

export default function NumberInput({label, value, onChange}: NumberInputProps) {
  return (
    <Wrapper>
      <Label>{label}:</Label>
      <Input type="number" onChange={onChange} value={value}/>
    </Wrapper>
  )
}