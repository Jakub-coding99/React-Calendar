interface Props {
  children: any;
  onClick?: () => void;
}
export const Td = ({ children, onClick }: Props) => {
  return <td onClick={onClick}>{children}</td>;
};
