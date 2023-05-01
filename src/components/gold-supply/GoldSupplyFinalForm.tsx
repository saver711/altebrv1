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

/////////// HELPER VARIABLES & FUNCTIONS
///
type GoldSupplyFinalFormProps_TP = {
    formValues: GoldFirstFormInitValues_TP | undefined
    setStage: Dispatch<SetStateAction<number>>
    setFormValues:Dispatch<SetStateAction<GoldFirstFormInitValues_TP | undefined>>
    finalData: FinalData_TP | undefined
}
///
export const GoldSupplyFinalForm = ({ formValues, setStage ,setFormValues, finalData }: GoldSupplyFinalFormProps_TP) => {
    /////////// VARIABLES
    ///
    const cols = useMemo<ColumnDef<OTableDataTypes>[]>(
        () => [
          {
            header: 'index',
            cell: (info) => info.renderValue(),
            accessorKey: 'number',
          },
          {
            header: 'categories',
            cell: (info) => info.renderValue(),
            accessorKey: 'category_value',
          },
          {
            header: 'weight',
            cell: (info) => info.renderValue(),
            accessorKey: 'weight',
          },
          {
            header: 'karats',
            cell: (info) => info.renderValue(),
            accessorKey: 'karat_value',
          },
          {
            header: 'stocks',
            cell: (info) => info.renderValue(),
            accessorKey: 'stock',
          },
          {
            header: 'wage',
            cell: (info) => info.renderValue(),
            accessorKey: 'wage',
          },
          {
            header: 'total wages',
            cell: (info: any) => (info.row.original.weight * info.row.original.wage).toFixed(3),
            accessorKey: 'total_wages',
          },
          {
            header: 'wage tax',
            cell: (info: any) => (info.row.original.weight * info.row.original.wage * .15).toFixed(3),
            accessorKey: 'wage_tax',
          },
          {
            header: 'gold tax',
            cell: (info: any) => (info.row.original.weight * info.row.original.stock * Number(formValues?.api_gold_price) * .15).toFixed(3),
            accessorKey: 'gold_tax',
          },
        ],
        []
      )
    ///
    /////////// CUSTOM HOOKS
    ///
    const { mutate, isLoading, error } = useMutate({
        mutationFn: mutateData,
        onSuccess: (data) => {
          notify("success")
        },
        onError: (error) => {
            console.log(error)
        }
      })
    ///
    /////////// STATES
    ///

    ///
    /////////// SIDE EFFECTS
    ///

    const { data: boxesResponse, isSuccess, isLoading: boxesLoading } = useFetch<any>({
    endpoint: `twredGold/api/v1/boxes/${formValues?.supplier_id}`,
    queryKey: ['boxes_response']
    })

    /////////// FUNCTIONS | EVENTS | IF CASES
    ///
    function sendForm() {
        const boxes = boxesResponse.map((item: any) => {
            if (item.front_key === 'gold_18') {
                return {
                    ...item,
                    value: finalData?.boxes.karat_18_aggregate
                }
            } else if (item.front_key === 'gold_21') {
                return {
                    ...item,
                    value: finalData?.boxes.karat_21_aggregate
                }
            } else if (item.front_key === 'gold_22') {
                return {
                    ...item,
                    value: finalData?.boxes.karat_21_aggregate
                }
            } else if (item.front_key === 'gold_24') {
                return {
                    ...item,
                    value: finalData?.boxes.karat_21_aggregate
                }
            } else if (item.front_key === 'total_tax') {
                return {
                    ...item,
                    value: finalData?.boxes.total_tax
                }
            } else if (item.front_key === 'total_wages') {
                return {
                    ...item,
                    value: finalData?.boxes.total_wages
                }
            } else if (item.front_key === 'goldpurities') {
                let karatEquelivent;
                if (item.front_key === 'gold_18') {
                    karatEquelivent = 18 / 24
                } else if (item.front_key === 'gold_21') {
                    karatEquelivent = 21 / 24
                } else if (item.front_key === 'gold_22') {
                    karatEquelivent = 22 / 24
                } else {
                    karatEquelivent = 24 / 24
                }
                const total_24_gold_by_karat = finalData!.boxes.total_weight * karatEquelivent
                let value = finalData!.boxes.total_24_gold_by_stock - total_24_gold_by_karat
                if (value < 0) {
                    value = value * -1
                    const computational_movement = item.nature === 'debtor' ? 'creditor' : 'debtor'
                    return {
                        ...item,
                        value,
                        computational_movement
                    }
                } else {
                    return {
                        ...item,
                        value
                    }
                }
            } else if (item.front_key === 'gold3yar') {
                let value = finalData!.boxes.total_weight - finalData!.boxes.total_24_gold_by_stock
                if (value < 0) {
                    value = value * -1
                    const computational_movement = item.nature === 'debtor' ? 'creditor' : 'debtor'
                    return {
                        ...item,
                        value,
                        computational_movement
                    }
                } else {
                    return {
                        ...item,
                        value
                    }
                }
            } else if (item.front_key === 'supplier_money') {
                return {
                    ...item,
                    value: finalData!.boxes.total_tax + finalData!.boxes.total_wages
                }
            } else if (item.front_key === 'supplier_gold') {
                return {
                    ...item,
                    value: finalData!.boxes.total_24_gold_by_stock
                }
            }
        })
        const sendData = {
            operation_name: 'goldtwred',
            bian: 'test',
            bond: {
                twred_type: 'local',
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
            items: finalData?.table.map(item => {
                return {
                    number: item.number,
                    category_id: item.category_id,
                    weight: item.weight,
                    karat_id: item.karat_id,
                    stocks: item.stock,
                    wage: item.wage,
                    total_wage: item.total_wages,
                    wage_tax: item.wage_tax,
                    gold_tax: item.gold_tax
                }
            }),
            boxes
        }
        console.log(sendData)
        mutate({
            endpointName: 'twredGold/api/v1/create',
            values: sendData,
            method: "post",
        })
    }

    return <>
        <OuterFormLayout>
            <GoldFirstFormView formValues={formValues} setStage={setStage} setFormValues={setFormValues} />
        </OuterFormLayout>
        <div className="px-4">
            <h1 className="text-2xl mb-5 mt-10">اجمالي السند</h1>
            <div className="grid-cols-5 grid gap-8" >

                {/* اجمالي الذهب حسب الاسهم */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>اجمالي الذهب 24 حسب الأسهم</p>
                        <p>{finalData?.boxes.total_24_gold_by_stock} جرام</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي الذهب حسب الاسهم */}

                {/* اجمالي الاجور */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>اجمالي الأجور</p>
                        <p>{finalData?.boxes.total_wages} ر.س</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي الاجور */}

                {/* اجمالي الضريبة */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>اجمالي الضريبة</p>
                        <p>{finalData?.boxes.total_tax} ر.س</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي الضريبة */}

                {/* اجمالي الوزن القائم */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>اجمالي الوزن القائم</p>
                        <p>{finalData?.boxes.total_weight} جرام</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي الوزن القائم */}

                {/* اجمالي الخصم */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>اجمالي الخصم</p>
                        <p>قريبا</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي الخصم */}

                {/* اجمالي صندوق الذهب 18 */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p> اجمالي صندوق الذهب 18</p>
                        <p>{finalData?.boxes.karat_18_aggregate} جرام</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي صندوق الذهب 18 */}

                {/* اجمالي صندوق الذهب 21 */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p> اجمالي صندوق الذهب 21</p>
                        <p>{finalData?.boxes.karat_21_aggregate} جرام</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي صندوق الذهب 21 */}

                {/* اجمالي صندوق الذهب 22 */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p> اجمالي صندوق الذهب 22</p>
                        <p>{finalData?.boxes.karat_22_aggregate} جرام</p>

                    </BoxesDataBase>
                </div>
                {/* اجمالي صندوق الذهب 22 */}

                {/* اجمالي صندوق الذهب 24 */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p> اجمالي صندوق الذهب 24</p>
                        <p>{finalData?.boxes.karat_24_aggregate} جرام</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي صندوق الذهب 24 */}
            </div>
            <h1 className="text-2xl mb-5 mt-10">بنود السند</h1>
            <div className="flex flex-col gap-6 items-center">
                <Table data={finalData!.table} showNavigation columns={cols} />
                <Button 
                    action={() => sendForm()} 
                    loading={isLoading || boxesLoading}
                    className="mr-auto ml-8  flex"
                >
                    {t('submit')}
                </Button>
            </div>
        </div>
    </>
}