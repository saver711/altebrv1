import { t } from "i18next"
import { tv } from "tailwind-variants"
import {ReactNode} from 'react'

type boxesDataBase_TP = {
  variant?: "primary" | "secondary"
  children: ReactNode
}

const boxesData = tv({
  base: "flex flex-col justify-center gap-3 rounded-xl  p-3 text-center  font-bold text-white",
  variants: {
    color: {
      primary: "bg-mainGreen",
      secondary: "bg-mainOrange",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      className: "bg-mainGreen",
    },

    {
      color: "secondary",
      className: "bg-mainOrange",
    },
  ],
  defaultVariants: {
    color: "primary",
  },
})
export const BoxesDataBase = ({ variant, children }: boxesDataBase_TP) => {
  return (
    <li
      className={boxesData({
        color: variant,
      })}
    >
      {children}
    </li>
  )
}
