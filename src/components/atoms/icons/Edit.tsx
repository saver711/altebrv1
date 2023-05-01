import {  AiFillEdit } from "react-icons/ai"
type EditProps_TP = {
  className?: string
  action?: () => void
  size?:number
}
export const Edit = ({
  className,
  action,
  size,
  ...props
}: EditProps_TP) => {

  return (
    <AiFillEdit
      size={size}
      className={`cursor-pointer  ${className}`}
      onClick={action}
      {...props}
    />
  )
}
