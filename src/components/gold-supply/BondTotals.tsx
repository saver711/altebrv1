/////////// IMPORTS
///
import { t } from "i18next"
import { numberContext } from "../../context/settings/number-formatter"
import { Box_TP } from "../../pages/gold-supply/Bond"
import { Back } from "../../utils/utils-components/Back"
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
  const { formatGram, formatReyal } = numberContext()

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{title ? t(`${title}`) : t('bond total')}</h2>
        <div>
          <Back />
        </div>
      </div>
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
                <p>{box.account}</p>
                {box.unit_id == 'gram' ? (
                  <p>
                    {formatGram(box.value)} {t(box.unit_id)}
                  </p>
                ) : (
                  <p>
                    {formatReyal(box.value)} {t(box.unit_id)}
                  </p>
                )}
              </li>
            )
        )}
      </ul>
    </div>
  )
}
