import { BoxesDataBase } from "../../atoms/card/BoxesDataBase"
import { Header } from "../../atoms/Header"

type boxesData_TP = {
  header: string
  variant?: "primary" | "secondary"
  className?: string
  boxData: any //change this
}

export const BoxesData = ({ header, variant, boxData }: boxesData_TP) => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <Header header={header} className={"text-2xl font-bold"} />
      <ul className="grid grid-cols-5  gap-5 ">
        {boxData?.map((box: any) => (
          <>
            <BoxesDataBase data={box} />
          </>
        ))}
      </ul>
    </div>
  )
}
