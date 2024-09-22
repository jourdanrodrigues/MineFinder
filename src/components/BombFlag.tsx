import { cn } from '@/utils.ts';

export function BombFlag({ className }: { className?: string }) {
  const pole = (
    <rect x='40' y='0' width='8' height='92' ry='2' className='fill-black' />
  );
  const base = (
    <polygon
      points='0,97 10,83 90,83 100,97'
      className='fill-gray-400 stroke-black dark:fill-gray-600'
    />
  );
  const flag = (
    <path
      d='M 45,8
      C 65,-2 75,18 85,8
      L 85,33
      C 75,43 65,23 45,33
      Z'
      className='fill-red-400 stroke-black dark:fill-orange-700'
    />
  );
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      className={cn('stroke-[3]', className)}
    >
      {flag}
      {pole}
      {base}
    </svg>
  );
}
