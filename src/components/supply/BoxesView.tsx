import { t } from "i18next"
import { numberContext } from "../../context/settings/number-formatter"
import { BoxesDataBase } from "../atoms/card/BoxesDataBase"

export type Box_TP = {
  title: string
  value: number
  unit: string
}

export type BoxesView_TP = {
  boxes: Box_TP[]
}

export const BoxesView = ({boxes}: BoxesView_TP) => {
  const { formatGram, formatReyal } = numberContext()

  return (
    <div className="grid-cols-4 grid gap-8">
      {boxes.map(box => (
        <div className="col-span-1">
          <BoxesDataBase>
            <p>{t(`${box.title}`)}</p>
            {box.unit == 'gram' ? (
              <p>
                {formatGram(box.value)} {t(box.unit)}
              </p>
            ) : box.unit == 'reyal' ? (
              <p>
                {formatReyal(box.value)} {t(box.unit)}
              </p>
            ) : box.unit == 'item' ? (
              <p>
                {box.value} {t("item")}
              </p>
            ) : (
              <p>
                {box.value} {t("Karat")}
              </p>
            )}
            {/* <p>{box.value} {t(`${box.unit}`)}</p> */}
          </BoxesDataBase>
        </div>
      ))}
    </div>
  )
}
