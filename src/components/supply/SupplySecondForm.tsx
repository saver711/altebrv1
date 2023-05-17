//@ts-nocheck
/////////// IMPORTS
///
///
/////////// Types
import { t } from "i18next"
import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "../atoms"
import { OuterFormLayout } from "../molecules"
import { GoldTable } from "../templates/reusableComponants/gold-table/GoldTable"
import { FirstFormView } from "./FirstFormView"
import { FirstFormInitValues_TP } from "./formInitialValues_types"
import { notify } from "../../utils/toast"
import { BoxesView, Box_TP } from "./BoxesView"
import { DiamondTable } from "../templates/reusableComponants/diamond-table/DiamondTable"
///
type GoldSupplySecondFormProps_TP = {
    setBoxesView: Dispatch<SetStateAction<Box_TP[] | undefined>>
    supply: Supply_TP
    formValues: FirstFormInitValues_TP | undefined
    setStage: Dispatch<SetStateAction<number>>
    setFormValues: Dispatch<SetStateAction<FirstFormInitValues_TP | undefined>>
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

///
export const SupplySecondForm = ({ 
    formValues, 
    supply,
    setStage, 
    setFormValues, 
    setFinalData,
    data,
    setData,
    boxValues,
    setBoxesView,
    setBoxValues,
    editData,
    setEditData,
}: GoldSupplySecondFormProps_TP) => {
    const [dirty, setDirty] = useState(false)
    const defaultValues: OTableDataTypes = supply == 'gold' ? {
        id: crypto.randomUUID(),
        number: editData.number || '',
        category_id: editData.category_id || '',
        weight: editData.weight || '',
        karat_id: editData.karat_id || '',
        stock: editData.stock || '',
        wage: editData.wage || '',
        total_wages: editData.total_wages || '',
        wage_tax: editData.wage_tax || '',
        gold_tax: editData.gold_tax || '',
        karat_value: '',
        category_value: ''
    } : {
        id: crypto.randomUUID(),
        number: editData.number || '',
        category_id: editData.category_id || '',
        weight: editData.weight || '',
        gold_weight: editData.gold_weight || '',
        karat_id: editData.karat_id || '',
        stock: editData.stock || '',
        diamond_value: editData.diamond_value || '',
        diamond_amount: editData.diamond_amount || '',
        diamond_stone_weight: editData.diamond_stone_weight || '',
        other_stones_weight: editData.other_stones_weight || '',
        diamond_tax: editData.diamond_tax || '',
        karat_value: '',
        category_value: ''
    }
    const karat_24_values = boxValues.filter(item => item.karat_value === '24')
    const karat_22_values = boxValues.filter(item => item.karat_value === '22')
    const karat_21_values = boxValues.filter(item => item.karat_value === '21')
    const karat_18_values = boxValues.filter(item => item.karat_value === '18')

    const boxes = supply == 'gold' ? {
        karat_24_aggregate: {
            title: 'total 24 gold box',
            value: karat_24_values.reduce((acc, curr) => {
                return +acc + Number(curr.weight)
            }, 0),
            unit: 'gram'
        },
        karat_22_aggregate: {
            title: 'total 22 gold box',
            value: karat_22_values.reduce((acc, curr) => {
                return +acc + Number(curr.weight)
            }, 0),
            unit: 'gram'
        },
        karat_21_aggregate: {
            title: 'total 21 gold box',
            value: karat_21_values.reduce((acc, curr) => {
                return +acc + Number(curr.weight)
            }, 0),
            unit: 'gram'
        },
        karat_18_aggregate: {
            title: 'total 18 gold box',
            value: karat_18_values.reduce((acc, curr) => {
                return +acc + Number(curr.weight)
            }, 0),
            unit: 'gram'
        },
        total_24_gold_by_stock: {
            title: 'total 24 gold by stock',
            value: boxValues.reduce((acc, curr) => {
                return +acc + (Number(curr.weight) * Number(curr.stock))
            }, 0),
            unit: 'gram'
        },
        total_wages: {
            title: 'total wages',
            value: boxValues.reduce((acc, curr) => {
                return +acc + (Number(curr.wage) * Number(curr.weight))
            }, 0),
            unit: 'reyal'
        },
        total_tax: {
            title: 'total tax',
            value: boxValues.reduce((acc, curr) => {
                if (curr.karat_value == '24') {
                    return +acc + ((Number(curr.weight) * (Number(curr.wage)) * .15) + 0)
                } else {
                    return +acc + ((Number(curr.weight) * (Number(curr.wage)) * .15) + 
                    (Number(curr.weight) * Number(curr.stock) * Number(formValues?.api_gold_price) * .15))
                }
            }, 0),
            unit: 'reyal'
        },
        total_weight: {
            title: 'total weight',
            value: boxValues.reduce((acc, curr) => {
                return +acc + Number(curr.weight)
            }, 0),
            unit: 'gram'
        },
    } : {
        total_diamond_value: {
            title: 'total diamond value',
            value: boxValues.reduce((acc, curr) => {
                return +acc + Number(curr.diamond_value)
            }, 0),
            unit: 'reyal'
        },
        total_tax: {
            title: 'total tax',
            value: boxValues.reduce((acc, curr) => {
                return +acc + (Number(curr.diamond_value) * 0.15)
            }, 0),
            unit: 'reyal'
        },
        total_weight: {
            title: 'total weight',
            value: boxValues.reduce((acc, curr) => {
                return +acc + Number(curr.weight)
            }, 0),
            unit: 'gram'
        },
        total_other_stones_weight: {
            title: 'total other stones weight',
            value: boxValues.reduce((acc, curr) => {
                return +acc + Number(curr.other_stones_weight)
            }, 0),
            unit: 'gram'
        },
        total_diamond_amount: {
            title: 'total diamond amount',
            value: boxValues.reduce((acc, curr) => {
                return +acc + Number(curr.diamond_amount)
            }, 0),
            unit: 'item'
        },
        total_diamond_stone_weight: {
            title: 'total diamond stone weight',
            value: boxValues.reduce((acc, curr) => {
                return +acc + Number(curr.diamond_stone_weight)
            }, 0),
            unit: 'gram'
        },
        total_gold_weight: {
            title: 'total gold weight',
            value: boxValues.reduce((acc, curr) => {
                return +acc + Number(curr.gold_weight)
            }, 0),
            unit: 'gram'
        }
    }
    const boxesView = Object.values(boxes).map(box => {
        return {
            title: box.title,
            value: box.value,
            unit: box.unit,
        }
    })
    ///
    return <>
        <OuterFormLayout>
            <FirstFormView 
                supply={supply} 
                formValues={formValues} 
                setStage={setStage} 
                setFormValues={setFormValues} 
            />
        </OuterFormLayout>
        <div className="px-4">
            <h1 className="text-2xl mb-5 mt-10">{t('bond total')}</h1>
            {boxesView.length > 0 && 
                <BoxesView 
                    boxes={boxesView}
                />
            }
            <h1 className="text-2xl mt-10">{t('bond items')}</h1>
            <div className="flex flex-col gap-6 items-center">
                {supply == 'gold' ? 
                <GoldTable 
                    dirty={dirty} 
                    setDirty={setDirty} 
                    data={data} 
                    setData={setData} 
                    defaultValues={defaultValues} 
                    setEditData={setEditData} 
                    editData={editData} 
                    formValues={formValues} 
                    setBoxValues={setBoxValues} 
                /> : 
                <DiamondTable
                    dirty={dirty} 
                    setDirty={setDirty} 
                    data={data} 
                    setData={setData} 
                    defaultValues={defaultValues} 
                    setEditData={setEditData} 
                    editData={editData} 
                    formValues={formValues} 
                    setBoxValues={setBoxValues} 
                />
                }
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
                                boxes: supply == 'gold' ? {
                                    karat_24_aggregate: boxes.karat_24_aggregate.value,
                                    karat_22_aggregate: boxes.karat_22_aggregate.value,
                                    karat_21_aggregate: boxes.karat_21_aggregate.value,
                                    karat_18_aggregate: boxes.karat_18_aggregate.value,
                                    total_24_gold_by_stock: boxes.total_24_gold_by_stock.value,
                                    total_wages: boxes.total_wages.value,
                                    total_tax: boxes.total_tax.value,
                                    total_weight: boxes.total_weight.value,
                                } : {
                                    total_diamond_value: boxes.total_diamond_value.value,
                                    total_tax: boxes.total_tax.value,
                                    total_weight: boxes.total_weight.value,
                                    total_other_stones_weight: boxes.total_other_stones_weight.value,
                                    total_diamond_amount: boxes.total_diamond_amount.value,
                                    total_diamond_stone_weight: boxes.total_diamond_stone_weight.value,
                                },
                                table: data.map((item, i) => {
                                    return supply == 'gold' ? {
                                        ...item,
                                        number: `${i + 1}`,
                                        total_wages: (Number(item.weight) * Number(item.wage)),
                                        wage_tax: (Number(item.weight) * Number(item.wage) * .15),
                                        gold_tax: item.karat_value == '24' ? 0 : (Number(item.weight) * 
                                        Number(formValues?.api_gold_price) * Number(item.stock) * .15 || 0),
                                    } : {
                                        ...item,
                                        number: `${i + 1}`,
                                        diamond_tax: (Number(item.diamond_value) * 0.15),
                                    }
                                })
                            })
                            if (data.length > 0)  {
                                if (dirty) {
                                    notify('error', `${t('must add the item')}`)
                                } else {
                                    setBoxesView(boxesView)
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