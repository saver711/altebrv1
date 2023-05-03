/////////// IMPORTS
import { FormNames_TP } from "../../../pages/system/types-and-helpers"
import { Button } from "../../atoms"
import { AddIcon, ViewIcon } from "../../atoms/icons"
///
//import classes from './SystemCard.module.css'
///
/////////// Types

///
type SystemCardProps_TP = {
  addHandler: () => void
  viewHandler?: () => void
  addLabel?: string
  viewLabel?: string
  title: string
  forStyle?: boolean
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const SystemCard = ({
  addHandler,
  viewHandler,
  addLabel,
  viewLabel,
  title,
  forStyle,
}: SystemCardProps_TP) => {
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

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  return (
    <div className="col-span-1 w-full rounded-md p-3 shadow-xl ">
      <div className="grid grid-rows-view gap-4">
        <div
          className={`flex w-full items-center justify-center gap-2  rounded-lg  py-2 px-8 text-white ${
            forStyle ? "flex-col bg-mainGreen" : "bg-mainOrange"
          }`}
        >
          <div className="flex w-full items-center justify-center">
            <h3>{title}</h3>
          </div>
        </div>
        {addLabel && addHandler && (
          <Button bordered={true} action={addHandler}>
            <div className="flex justify-center items-center">
              <AddIcon size={27} />
              <p className="text-sm ms-1">{addLabel}</p>
            </div>
          </Button>
        )}

        {viewLabel && (
          <Button
            bordered={true}
            className={
              forStyle
                ? "!bg-green !bg-opacity-20	 !text-mainGreen"
                : "!bg-mainOrange !bg-opacity-20"
            }
            action={viewHandler}
          >
            <div className="flex justify-center items-center">
              <ViewIcon size={23} />
              <p className="text-sm ms-1">{viewLabel}</p>
            </div>
          </Button>
        )}
      </div>
    </div>
  )
}
