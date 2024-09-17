import React from 'react';

type NumberInputProps = {
  label: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function NumberInput({ label, value, onChange }: NumberInputProps) {
  return (
    <div className='flex w-full justify-between'>
      <span className='w-1/3'>{label}:</span>
      <input
        className='w-2/3'
        onChange={onChange}
        type='number'
        value={value}
      />
    </div>
  );
}
