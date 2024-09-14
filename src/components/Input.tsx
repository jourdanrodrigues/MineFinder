import React from 'react';

type NumberInputProps ={
  readonly label: string
  readonly value: string | number
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function NumberInput({ label, value, onChange }: NumberInputProps) {
  return (
    <div className='w-full flex justify-between'>
      <span className='w-1/3'>{label}:</span>
      <input className='w-2/3' onChange={onChange} type='number' value={value}/>
    </div>
  );
}
