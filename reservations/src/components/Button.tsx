interface Props {
  children?: React.ReactNode;
  onClick(): void;
  className?: string;
}

export const Button = ({ children, onClick, className }: Props) => {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};