import { OuterFormLayout } from "../molecules"
import { GoldFirstFormView } from "./GoldFirstFormView"
import { GoldFirstFormInitValues_TP } from "./formInitialValues_types"
import { Dispatch, SetStateAction, useMemo } from "react"
import { FinalData_TP } from "../../pages/gold-supply/GoldSupply"
import { BoxesDataBase } from "../atoms/card/BoxesDataBase"
import { Table } from "../templates/reusableComponants/tantable/Table"
import { ColumnDef } from "@tanstack/react-table"
import { OTableDataTypes } from "./GoldSupplySecondForm"
import { useFetch, useMutate } from "../../hooks"
import { mutateData } from "../../utils/mutateData"
import { notify } from "../../utils/toast"
import { Button } from "../atoms"
import { t } from "i18next"
import { formatDate } from "../../utils/date"
import { useNavigate } from "react-router-dom"

/////////// HELPER VARIABLES & FUNCTIONS
///
type GoldSupplyFinalFormProps_TP = {
  formValues: GoldFirstFormInitValues_TP | undefined
  setStage: Dispatch<SetStateAction<number>>
  setFormValues: Dispatch<
    SetStateAction<GoldFirstFormInitValues_TP | undefined>
  >
  finalData: FinalData_TP | undefined
}
///
export const GoldSupplyFinalForm = ({
  formValues,
  setStage,
  setFormValues,
  finalData,
}: GoldSupplyFinalFormProps_TP) => {
  /////////// VARIABLES
  ///
  const navigate = useNavigate()
  const cols = useMemo<ColumnDef<OTableDataTypes>[]>(
    () => [
      {
        header: `${t("index")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "number",
      },
      {
        header: `${t("categories")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "category_value",
      },
      {
        header: `${t("weight")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "weight",
      },
      {
        header: `${t("karats")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "karat_value",
      },
      {
        header: `${t("stocks")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "stock",
      },
      {
        header: `${t("wage")}`,
        cell: (info) => info.renderValue(),
        accessorKey: "wage",
      },
      {
        header: `${t("total wages")}`,
        cell: (info: any) =>
          (info.row.original.weight * info.row.original.wage).toFixed(3),
        accessorKey: "total_wages",
      },
      {
        header: `${t("wage tax")}`,
        cell: (info: any) =>
          (info.row.original.weight * info.row.original.wage * 0.15).toFixed(3),
        accessorKey: "wage_tax",
      },
      {
        header: `${t("gold tax")}`,
        cell: (info: any) =>
          (
            info.row.original.weight *
            Number(formValues?.api_gold_price) *
            0.15
          ).toFixed(3),
        accessorKey: "gold_tax",
      },
    ],
    []
  )
  ///
  /////////// CUSTOM HOOKS
  ///
  const { mutate, isLoading } = useMutate({
    mutationFn: mutateData,
    onSuccess(data: { id: number } | undefined) {
      notify("success")
      navigate(`/bonds/${data!.id}`)
    },
  })
  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  const { data: boxesResponse, isLoading: boxesLoading } = useFetch<any>({
    endpoint: `twredGold/api/v1/boxes/${formValues?.supplier_id}`,
    queryKey: ["boxes_response"],
  })

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  const getTotalWages = () => {
    let prev = 0
    finalData?.table.forEach((row) => {
      prev = Number(prev) + Number(row.total_wages)
    })
    return prev
  }

  const mapBox = (item: any) => {
    switch (item.front_key) {
      case "gold_18":
        return {
          ...item,
          value: finalData?.boxes.karat_18_aggregate,
        }
      case "gold_21":
        return {
          ...item,
          value: finalData?.boxes.karat_21_aggregate,
        }
      case "gold_22":
        return {
          ...item,
          value: finalData?.boxes.karat_22_aggregate,
        }
      case "gold_24":
        return {
          ...item,
          value: finalData?.boxes.karat_24_aggregate,
        }
      case "total_tax":
        return {
          ...item,
          value: finalData?.boxes.total_tax,
        }
      case "total_wages":
        return {
          ...item,
          value: getTotalWages(),
        }
      case "goldpurities":
        let total_24_gold_by_stock = 0
        finalData!.table.forEach((row) => {
          total_24_gold_by_stock =
            total_24_gold_by_stock + Number(row.weight) * Number(row.stock)
        })
        let total_24_gold_by_karat = 0
        finalData!.table.forEach((row) => {
          total_24_gold_by_karat =
            total_24_gold_by_karat +
            Number(row.weight) * (Number(row.karat_value) / 24)
        })
        let val = total_24_gold_by_stock - total_24_gold_by_karat
        if (val < 0) {
          val = val * -1
          const computational_movement =
            item.nature === "debtor" ? "creditor" : "debtor"
          return {
            ...item,
            value: val,
            computational_movement,
          }
        } else {
          return {
            ...item,
            value: val,
          }
        }
      case "gold3yar":
        let total_24_gold_by_karat2 = 0
        finalData!.table.forEach((row) => {
          total_24_gold_by_karat2 =
            total_24_gold_by_karat2 +
            Number(row.weight) * (Number(row.karat_value) / 24)
        })
        let value = finalData!.boxes.total_weight - total_24_gold_by_karat2
        if (value < 0) {
          value = value * -1
          const computational_movement =
            item.nature === "debtor" ? "creditor" : "debtor"
          return {
            ...item,
            value,
            computational_movement,
          }
        } else {
          return {
            ...item,
            value,
          }
        }
      case "supplier_money":
        return {
          ...item,
          value: finalData!.boxes.total_tax + getTotalWages(),
        }
      case "supplier_gold":
        return {
          ...item,
          value: finalData!.boxes.total_24_gold_by_stock,
        }
      default:
        return item
    }
  }

  function sendForm() {
    const boxes = boxesResponse.map(mapBox)
    const sendData = {
      operation_name: "goldtwred",
      bian: "test",
      bond: {
        twred_type: formValues?.twred_type,
        bond_date: formatDate(formValues!.bond_date),
        employee_id: formValues?.employee_id,
        supplier_id: formValues?.supplier_id,
        bond_number: formValues?.bond_number,
        api_gold_price: formValues?.api_gold_price,
        entity_gold_price: formValues?.entity_gold_price,
        total_gold_by_24: finalData?.boxes.total_24_gold_by_stock,
        total_wages: finalData?.boxes.total_wages,
        total_tax: finalData?.boxes.total_tax,
        total_weight: finalData?.boxes.total_weight,
        total_gold_18: finalData?.boxes.karat_18_aggregate,
        total_gold_21: finalData?.boxes.karat_21_aggregate,
        total_gold_22: finalData?.boxes.karat_22_aggregate,
        total_gold_24: finalData?.boxes.karat_24_aggregate,
      },
      items: finalData?.table.map((item) => {
        return {
          number: item.number,
          category_id: item.category_id,
          weight: item.weight,
          karat_id: item.karat_id,
          stocks: item.stock,
          wage: item.wage,
          total_wage: item.total_wages,
          wage_tax: item.wage_tax,
          gold_tax: item.gold_tax,
        }
      }),
      boxes,
      media: formValues?.media,
    }
    console.log(sendData)
    mutate({
      endpointName: "twredGold/api/v1/create",
      values: sendData,
      method: "post",
      dataType: "formData",
    })
  }

  return (
    <>
      <OuterFormLayout>
        <GoldFirstFormView
          formValues={formValues}
          setStage={setStage}
          setFormValues={setFormValues}
        />
      </OuterFormLayout>
      <div className="px-4">
        <h1 className="text-2xl mb-5 mt-10">{`${t('document total')}`}</h1>
        <div className="grid-cols-4 grid gap-8">
          {/* اجمالي الذهب حسب الاسهم */}
          <div className="col-span-1">
            <BoxesDataBase>
              <p>اجمالي الذهب 24 حسب الأسهم</p>
              <p>{finalData?.boxes.total_24_gold_by_stock} جرام</p>
            </BoxesDataBase>
          </div>
          {/* اجمالي الذهب حسب الاسهم */}

          {/* اجمالي الاجور */}
          <div className="col-span-1">
            <BoxesDataBase>
              <p>اجمالي الأجور</p>
              <p>{getTotalWages()} ر.س</p>
            </BoxesDataBase>
          </div>
          {/* اجمالي الاجور */}

          {/* اجمالي الضريبة */}
          <div className="col-span-1">
            <BoxesDataBase>
              <p>اجمالي الضريبة</p>
              <p>{finalData?.boxes.total_tax} ر.س</p>
            </BoxesDataBase>
          </div>
          {/* اجمالي الضريبة */}

          {/* اجمالي الوزن القائم */}
          <div className="col-span-1">
            <BoxesDataBase>
              <p>اجمالي الوزن القائم</p>
              <p>{finalData?.boxes.total_weight} جرام</p>
            </BoxesDataBase>
          </div>
          {/* اجمالي الوزن القائم */}

          {/* اجمالي صندوق الذهب 18 */}
          <div className="col-span-1">
            <BoxesDataBase>
              <p> اجمالي صندوق الذهب 18</p>
              <p>{finalData?.boxes.karat_18_aggregate} جرام</p>
            </BoxesDataBase>
          </div>
          {/* اجمالي صندوق الذهب 18 */}

          {/* اجمالي صندوق الذهب 21 */}
          <div className="col-span-1">
            <BoxesDataBase>
              <p> اجمالي صندوق الذهب 21</p>
              <p>{finalData?.boxes.karat_21_aggregate} جرام</p>
            </BoxesDataBase>
          </div>
          {/* اجمالي صندوق الذهب 21 */}

          {/* اجمالي صندوق الذهب 22 */}
          <div className="col-span-1">
            <BoxesDataBase>
              <p> اجمالي صندوق الذهب 22</p>
              <p>{finalData?.boxes.karat_22_aggregate} جرام</p>
            </BoxesDataBase>
          </div>
          {/* اجمالي صندوق الذهب 22 */}

          {/* اجمالي صندوق الذهب 24 */}
          <div className="col-span-1">
            <BoxesDataBase>
              <p> اجمالي صندوق الذهب 24</p>
              <p>{finalData?.boxes.karat_24_aggregate} جرام</p>
            </BoxesDataBase>
          </div>
          {/* اجمالي صندوق الذهب 24 */}
        </div>
        <h1 className="text-2xl mb-5 mt-10">{`${t("document items")}`}</h1>
        <div className="flex flex-col gap-6 items-center">
          <Table data={finalData!.table} showNavigation columns={cols} />
          <Button
            action={() => sendForm()}
            loading={isLoading}
            disabled={boxesLoading}
            className="mr-auto  flex"
          >
            {t("submit")}
          </Button>
        </div>
      </div>
    </>
  )
}
