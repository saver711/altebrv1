//@ts-nocheck
/////////// IMPORTS
///
///
/////////// Types

import { t } from "i18next"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button } from "../atoms"
import { BoxesDataBase } from "../atoms/card/BoxesDataBase"
import { OuterFormLayout } from "../molecules"
import { OTable } from "../templates/reusableComponants/o-table/OTable"
import { GoldFirstFormView } from "./GoldFirstFormView"
import { GoldFirstFormInitValues_TP } from "./formInitialValues_types"
import { notify } from "../../utils/toast"
import { numberContext } from "../../context/settings/number-formatter"

///
type GoldSupplySecondFormProps_TP = {
    formValues: GoldFirstFormInitValues_TP | undefined
    setStage: Dispatch<SetStateAction<number>>
    setFormValues: Dispatch<SetStateAction<GoldFirstFormInitValues_TP | undefined>>
    setFinalData: Dispatch<SetStateAction<FinalData_TP | undefined>>
    data: OTableDataTypes[]
    setData: Dispatch<SetStateAction<OTableDataTypes[]>>
    boxValues: OTableDataTypes[]
    setBoxValues: Dispatch<SetStateAction<OTableDataTypes[]>>
    editData: OTableDataTypes
    setEditData: Dispatch<SetStateAction<OTableDataTypes>>
}
export type BoxesTypes = {
    karat_24_aggregate: number
    karat_22_aggregate: number
    karat_21_aggregate: number
    karat_18_aggregate: number
    total_24_gold_by_stock: number
    total_wages: number
    total_tax: number   
    total_weight: number
}
export type GoldTableProperties_TP = {
    id: string
    number: string
    category_id: string
    weight: string
    karat_id: string
    stock: string
    wage: string
    total_wages: string
    wage_tax: string
    gold_tax: string
}
export type TableHelperValues_TP = {
    karat_value: string
    category_value: string
}
export type OTableDataTypes = GoldTableProperties_TP & TableHelperValues_TP
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const GoldSupplySecondForm = ({ 
    formValues, 
    setStage, 
    setFormValues, 
    setFinalData,
    data,
    setData,
    boxValues,
    setBoxValues,
    editData,
    setEditData,
}: GoldSupplySecondFormProps_TP) => {
    ///
    /////////// CUSTOM HOOKS
    ///
    const { formatGram, formatReyal } = numberContext()
    ///
    /////////// STATES
    ///
    const [dirty, setDirty] = useState(false)
    const defaultValues: OTableDataTypes = {
        id: crypto.randomUUID(),
        number: editData.number || '',
        category_id: editData.category_id || '',
        weight: editData.weight || '',
        karat_id: editData.karat_id || '',
        stock: editData.stock || '', // must be stocks
        wage: editData.wage || '',
        total_wages: editData.total_wages || '', // must be total_wage
        wage_tax: editData.wage_tax || '',
        gold_tax: editData.gold_tax || '',
        karat_value: '',
        category_value: ''
    }
    ///
    /////////// SIDE EFFECTS
    ///
    /////////// VARIABLES
    ///
    const karat_24_values = boxValues.filter(item => item.karat_value === '24')
    const karat_22_values = boxValues.filter(item => item.karat_value === '22')
    const karat_21_values = boxValues.filter(item => item.karat_value === '21')
    const karat_18_values = boxValues.filter(item => item.karat_value === '18')

    const karat_24_aggregate = karat_24_values.reduce((acc, curr) => {
        return +acc + Number(curr.weight)
    }, 0)

    const karat_22_aggregate = karat_22_values.reduce((acc, curr) => {
        return +acc + Number(curr.weight)
    }, 0)

    const karat_21_aggregate = karat_21_values.reduce((acc, curr) => {
        return +acc + Number(curr.weight)
    }, 0)

    const karat_18_aggregate = karat_18_values.reduce((acc, curr) => {
        return +acc + Number(curr.weight)
    }, 0)

    const total_24_gold_by_stock = boxValues.reduce((acc, curr) => {
        return +acc + (Number(curr.weight) * Number(curr.stock))
    }, 0)

    const total_wages = boxValues.reduce((acc, curr) => {
        return +acc + (Number(curr.wage) * Number(curr.weight))
    }, 0)

    const total_tax = boxValues.reduce((acc, curr) => {
        if (curr.karat_value == '24') {
            return +acc + ((Number(curr.weight) * (Number(curr.wage)) * .15) + 0)
        } else {
            return +acc + ((Number(curr.weight) * (Number(curr.wage)) * .15) + (Number(curr.weight) * Number(curr.stock) * Number(formValues?.api_gold_price) * .15))
        }
    }, 0)

    const total_weight = boxValues.reduce((acc, curr) => {
        return +acc + Number(curr.weight)
    }, 0)

    /////////// FUNCTIONS | EVENTS | IF CASES
    ///
    ///
    return <>
        <OuterFormLayout>
            <GoldFirstFormView formValues={formValues} setStage={setStage} setFormValues={setFormValues} />
        </OuterFormLayout>
        <div className="px-4">
            <h1 className="text-2xl mb-5 mt-10">{t('bond total')}</h1>
            <div className="grid-cols-4 grid gap-8" >

                {/* اجمالي الذهب حسب الاسهم */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>{t('total 24 gold by stock')}</p>
                        <p>{formatGram(total_24_gold_by_stock)} {t('gram')}</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي الذهب حسب الاسهم */}

                {/* اجمالي الاجور */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>{t('total wages')}</p>
                        <p>{formatReyal(total_wages)} {t('reyal')}</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي الاجور */}

                {/* اجمالي الضريبة */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>{t('total tax')}</p>
                        <p>{formatReyal(total_tax)} {t('reyal')}</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي الضريبة */}

                {/* اجمالي الوزن القائم */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>{t('total weight')}</p>
                        <p>{formatGram(total_weight)} {t('gram')}</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي الوزن القائم */}

                {/* اجمالي صندوق الذهب 18 */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>{t('total 18 gold box')}</p>
                        <p>{formatGram(karat_18_aggregate)} {t('gram')}</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي صندوق الذهب 18 */}

                {/* اجمالي صندوق الذهب 21 */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>{t('total 21 gold box')}</p>
                        <p>{formatGram(karat_21_aggregate)} {t('gram')}</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي صندوق الذهب 21 */}

                {/* اجمالي صندوق الذهب 22 */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>{t('total 22 gold box')}</p>
                        <p>{formatGram(karat_22_aggregate)} {t('gram')}</p>

                    </BoxesDataBase>
                </div>
                {/* اجمالي صندوق الذهب 22 */}

                {/* اجمالي صندوق الذهب 24 */}
                <div className="col-span-1" >
                    <BoxesDataBase>
                        <p>{t('total 24 gold box')}</p>
                        <p>{formatGram(karat_24_aggregate)} {t('gram')}</p>
                    </BoxesDataBase>
                </div>
                {/* اجمالي صندوق الذهب 24 */}

            </div>
            <h1 className="text-2xl mb-5 mt-10">{t('bond items')}</h1>
            <div className="flex flex-col gap-6 items-center">
                <OTable dirty={dirty} setDirty={setDirty} data={data} setData={setData} defaultValues={defaultValues} setEditData={setEditData} editData={editData} formValues={formValues} setBoxValues={setBoxValues} />
                <div className="flex justify-end gap-4 w-full">
                    <Button
                        action={() => setStage(1)}
                        className="bg-mainGray border-mainGreen text-mainGreen"
                        >
                        {t("back")}
                    </Button>  
                    <Button 
                        action={() => {
                            setFinalData({
                                boxes: {
                                    karat_24_aggregate,
                                    karat_22_aggregate,
                                    karat_21_aggregate,
                                    karat_18_aggregate,
                                    total_24_gold_by_stock,
                                    total_wages,
                                    total_tax,
                                    total_weight,
                                },
                                table: data.map((item, i) => {
                                    return {
                                        ...item,
                                        number: `${i + 1}`,
                                        total_wages: (Number(item.weight) * Number(item.wage)),
                                        wage_tax: (Number(item.weight) * Number(item.wage) * .15),
                                        gold_tax: item.karat_value == '24' ? 0 : (Number(item.weight) * Number(formValues?.api_gold_price) * .15 || 0),
                                    }
                                })
                            })
                            if (data.length > 0)  {
                                if (dirty) {
                                    notify('error', `${t('must add the item')}`)
                                } else {
                                    setStage(prev => prev + 1)
                                }
                            } else {
                                notify('error', `${t('must add one item at least')}`)
                            }
                        }} 
                    >
                        {t('next')}
                    </Button>
                </div>
            </div>
        </div>
    </>
}