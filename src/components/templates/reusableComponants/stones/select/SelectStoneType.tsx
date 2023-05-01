///
/////////// IMPORTS
///
import { t } from "i18next"
import { useFetch } from "../../../../../hooks"
import { SelectOption_TP } from "../../../../../types"
import { Select } from "../../../../molecules"
import CreateStoneType from "../create/CreateStoneType"

///
/////////// Types
///
type SelectStoneTypeProps_TP = {
  name: string,
  label?: string,
  field: "id" | "value"
  onChange?: (option:any) => void
  value?:any
}

const SelectStoneType = ({ name, field, label , onChange , value }: SelectStoneTypeProps_TP) => {
  ///
  /////////// CUSTOM HOOKS
  ///
  const {
    data: types,
    isLoading: typeLoading
  } = useFetch<SelectOption_TP[]>({ 
    endpoint: "stones/api/v1/stones",
    queryKey: ["stone_type"],
    select: (types) => {
      return types.map((type: any) => ({
        id: type.id,
        label: type.name,
        name: type.name,
        value: type.name,
      }))
    }
  })

  return (
    <Select
      id="select_type"
      label={label}
      name={name}
      placeholder={`${t('stones types')}`}
      loadingPlaceholder={`${t('Loading...')}`}
      options={types}
      creatable
      fieldKey={field}
      CreateComponent={CreateStoneType}
      loading={typeLoading}
      onChange={onChange}
      {...{...(value && {value})}}
    />
  )
}

export default SelectStoneType