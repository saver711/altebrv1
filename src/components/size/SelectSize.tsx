/////////// IMPORTS
///
//import classes from './SelectSize.module.css'
///
/////////// Types
///

import { t } from "i18next"
import { useFetch } from "../../hooks"
import { Select } from "../molecules"
import { CreateSizes } from "../CreateSizes"
import { useEffect, useState } from "react"

/////////// HELPER VARIABLES & FUNCTIONS
///
type SelectSize_TP = {
    editData?: any
}
///
export const SelectSize = ({editData}: SelectSize_TP) => {
    /////////// VARIABLES
    ///
    const [newValue, setNewValue] = useState()
    const [sizeValues, setSizeValues] = useState()
    ///
    /////////// CUSTOM HOOKS
    ///
    const { data: sizes , isLoading , isError } = useFetch({
        endpoint: 'size/api/v1/sizes',
        queryKey: ['sizes'],
        select:(sizes=>{
            return sizes.map(item=>({
                value:item.type,
                label:`${item.type} - (${item.start}-${item.end})`,
                id:item.id,
                units:item.units
            }))
        }),
    })


    ///
    /////////// STATES
    ///

    ///
    /////////// SIDE EFFECTS
    ///
    useEffect(() => {
    const best = editData?.category_sizes.map(editItem => {
        return {
            id: editItem.id || "",
            value: editItem.type || "",
            label: editItem.type || "اختر المقاس",
        }
    })
    setNewValue(best)
    }, [])

    // useEffect(() => {
    //     if(!!newValue){
    //         const selectedValue = sizes.find(size=> size.id === newValue[newValue.length-1].units[0].size_id)
    //         console.log("🚀 ~ file: SelectSize.tsx:64 ~ useEffect ~ selectedValue:", newValue)
    //         const sizeUnits = selectedValue.units.map(unit=>({
    //             id:unit.id,
    //             value:unit.value,
    //             label:unit.value                
    //         }))
    //         setSizeValues(sizeUnits) 
    //     }
    // }, [newValue])
    /////////// FUNCTIONS | EVENTS | IF CASES
    ///

    ///
    return <>
        <Select
            id="size"
            label={`${t('size type')}`}
            name='sizes'
            placeholder={`${t('sizes')}`}
            loadingPlaceholder={`${t('loading')}`}
            options={sizes}
            fieldKey="id"
            value={newValue}
            onChange={(option) => {
                //@ts-ignore
                setNewValue(option)
              }}
            loading={isLoading}
            creatable
            //@ts-ignore
            CreateComponent={CreateSizes}
            isMulti={true}
        />
        {/* <Select
              onChange={(option) => {
                // @ts-ignore
                setTheSelectedSize(option)
                // setFieldValue("sizeNumber_value", option!.value)
              }}
            //   isDisabled={!!!selectedSizeTypeOption}
            //   value={theSelectedSize && theSelectedSize}
              fieldKey="id"
              name="size"
              label="المقاس"
              placeholder="المقاس"
              id="select-size-number"
              options={sizeValues}
            /> */}
    </>
}