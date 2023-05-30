///
/////////// IMPORTS
///
import { t } from "i18next"
import { useFetch } from "../../../../../hooks"
import { Category_TP, SelectOption_TP } from "../../../../../types"
import { Select } from "../../../../molecules"
import CreateCategory from "../create/CreateCategory"
///
/////////// Types
///
interface ExtendedCategory_TP extends Category_TP {
  value: string
  label: string
  id: string
}
type SelectCategory_TP = {
  showNotDefinedType?: boolean
  name: string
  label?: string
  noMb?: boolean
  placement?: "top" | "auto" | "bottom"
  onChange?: (option: ExtendedCategory_TP) => void
  field?: "id" | "value"
  value?:{[x:string]:string}
  all?: boolean
}

const SelectCategory = ({
  label,
  name,
  field = "id",
  onChange,
  noMb = false,
  placement = "auto",
  showNotDefinedType = true,
  value,
  all = false
}: SelectCategory_TP) => {
  ///
  /////////// CUSTOM HOOKS
  ///
  const { data: categories, isLoading: categoryLoading } = useFetch<
    ExtendedCategory_TP[]
  >({
    endpoint: all
      ? "classification/api/v1/categories?type=all"
      : "classification/api/v1/categories?type=all",
    queryKey: ["categories"],
    select: (categories) => {
      if (showNotDefinedType) {
        return categories.map((category) => ({
          ...category,
          id: category.id,
          label: category.name,
          value: category.name,
        }))
      }

      return categories
        .filter((category) => category.id != "1")
        .map((category) => ({
          ...category,
          id: category.id,
          label: category.name,
          value: category.name,
        }))
    },
  })

  return (
    <Select
      id="select_categories"
      label={label}
      name={name}
      noMb={noMb}
      placement={placement}
      placeholder={`${t("categories")}`}
      loadingPlaceholder={`${t("Loading...")}`}
      options={categories}
      creatable
      CreateComponent={CreateCategory}
      loading={categoryLoading}
      fieldKey={field}
      // @ts-ignore
      onChange={onChange}
      {...{...(value && {value})}}
    />
  )
}

export default SelectCategory
