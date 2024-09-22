type NumberInputProps = {
  label: string;
  value: string | number;
  onChange: (value: number) => void;
};

export function NumberInput({ label, value, onChange }: NumberInputProps) {
  return (
    <div className='flex w-full items-center justify-center'>
      <span className='w-1/3 dark:text-contrast-dark'>{label}:</span>
      <input
        className='w-1/3 rounded-lg border border-contrast bg-transparent px-2 dark:border-contrast-dark dark:text-contrast-dark'
        onChange={(e) => {
          const newValue = +e.target.value.replace(/\D/g, '');
          onChange(Number.isNaN(newValue) ? 0 : newValue);
        }}
        value={value}
      />
    </div>
  );
}
