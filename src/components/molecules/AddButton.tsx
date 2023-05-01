import { Add } from "../atoms/icons/Add"

type AddButton_TP = {
  addLabel?: string
  action?: () => void
}

export const AddButton = ({ addLabel, action }: AddButton_TP) => {
  return (
    <>
      {addLabel && (
        <div
          className="relative active:top-[1px] py-2 px-8 font-bold rounded-md w-full bg-white border border-lightBlack !text-lightBlack flex items-center justify-center gap-2"
          onClick={action}
        >
          <Add  className="w-5 h-5"/>
          <p className=" text-sm">{addLabel}</p>
        </div>
      )}
    </>
  )
}
