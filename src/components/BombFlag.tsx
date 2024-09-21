export function BombFlag({ className }: { className?: string }) {
  const strokeWidth = 3;
  const pole = <rect x='40' y='0' width='8' height='92' ry='2' fill='black' />;
  const base = (
    <polygon
      points='0,100 10,85 90,85 100,100'
      stroke='black'
      strokeWidth={strokeWidth}
      fill='gray'
    />
  );
  const flag = (
    <path
      d='M 44,6
      C 65,-4 75,16 85,6
      L 85,31
      C 75,41 65,21 44,31
      Z'
      fill='red'
      stroke='black'
      strokeWidth={strokeWidth}
    />
  );
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      className={className}
    >
      {flag}
      {pole}
      {base}
    </svg>
  );
}
