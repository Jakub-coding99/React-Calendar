interface Props {
  children:string
  onClick() : void
}


export const Button = ({children,onClick}:Props) => {
  return (
      <div>
          <button onClick = {onClick}>{children}</button>
      </div>
      
  )
}