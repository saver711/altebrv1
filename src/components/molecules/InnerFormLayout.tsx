/////////// IMPORTS
///
import { ReactNode } from "react"
import { TabsIcon } from "../atoms/icons/Tabs"
import { Button } from "../atoms"
///
/////////// Types
///
type InnerFormLayoutProps_TP = {
  title?: string | null
  leftComponent?: ReactNode
  children: ReactNode
  customStyle?:string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const InnerFormLayout = ({
  title,
  children,
  leftComponent,
  customStyle

}: InnerFormLayoutProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <>
      <div className="p-2 w-full">
        {title && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2 mb-5 font-bold">
              <TabsIcon />
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
            {leftComponent && leftComponent}
          </div>
        )}
        <div
          className={
            customStyle
              ? customStyle
              : "bg-flatWhite rounded-lg p-4 grid grid-cols-4 gap-x-4 gap-y-8 relative"
          }
        >
          {children}
        </div>
      </div>
    </>
  )
}