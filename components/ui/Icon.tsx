type IconProps = {
  id: string;
  className?: string;
};

export function Icon({ id, className }: IconProps) {
  return (
    <svg className={className}>
      <use href={`#${id}`} />
    </svg>
  );
}
