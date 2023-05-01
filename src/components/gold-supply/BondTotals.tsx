/////////// IMPORTS
///
import { t } from "i18next"
import { Box_TP } from "../../pages/gold-supply/Bond"
///
/////////// Types
///
type BondTotalsProps_TP = {
  boxesData: Box_TP[]
  balance?: boolean
  title?:string
}
/////////// HELPER VARIABLES & FUNCTIONS
///
///
export const BondTotals = ({
  boxesData,
  balance,
  title,
}: BondTotalsProps_TP) => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <h2 className="text-xl font-bold">{title ? title : "إجمالي السند"}</h2>
      <ul
        className={
          balance
            ? `grid grid-cols-3  gap-56  pr-0`
            : `grid grid-cols-4  gap-5  pr-0`
        }
      >
        {boxesData.map(
          (box, i) =>
            box.value !== null && (
              <li
                key={box.id}
                className="flex flex-col justify-center gap-3 rounded-xl bg-mainGreen p-3 text-center text-sm font-bold text-white"
              >
                <p> {box.account}</p>
                <p>
                  {box.value} {t(box.unit_id)}
                </p>
              </li>
            )
        )}
      </ul>
    </div>
  )
}
