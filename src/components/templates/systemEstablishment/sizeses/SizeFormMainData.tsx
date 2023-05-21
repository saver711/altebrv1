/////////// IMPORTS
///
///
/////////// Types
///

import { useFormikContext } from "formik"
import { t } from "i18next"
import { useEffect } from "react"
import { Button } from "../../../atoms"
import { BaseInputField, InnerFormLayout, OuterFormLayout, Select } from "../../../molecules"
import { SingleValue } from "react-select"
import { SelectOption_TP } from "../../../../types"



/////////// HELPER VARIABLES & FUNCTIONS
///
type SizeFormMainDataProps_TP = {
  editData?: any
  title?: string
  isLoadingSizes: boolean
  isSuccessPost?: boolean
  resetData?: () => void
  showCategories?: boolean
  sizeTypes?: any
  categoryID?: any
  loadingSizeType?: any
  NewSizeTypeOptionComponent?: any
  newValue?: any
  setNewValue?:any
}
///
export const SizeFormMainData = ({
  resetData,
  title,
  isSuccessPost,
  isLoadingSizes,
  showCategories,
  categoryID,
  sizeTypes,
  loadingSizeType,
  NewSizeTypeOptionComponent,
  newValue,
  setNewValue,
}: SizeFormMainDataProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const { resetForm, values } = useFormikContext<any>()
  console.log("🚀 ~ file: SizeFormMainData.tsx:60 ~ values:", values)

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///
  useEffect(() => {
    resetForm()
    if (resetData) resetData()
  }, [isSuccessPost])

  ///
  return (
    <>
      <OuterFormLayout
        header={title}
        submitComponent={
          <Button
            loading={isLoadingSizes}
            type="submit"
            className="ms-auto mt-8"
          >
            {t("submit")}
          </Button>
        }
      >
        <InnerFormLayout title={`${t("main data")}`}>
          {showCategories && (
            <Select
              label="نوع المقاس"
              name="sizeType"
              id="sizeType"
              isMulti={false}
              required
              isDisabled={!!!categoryID?.id}
              placeholder={
                categoryID?.id &&
                `
                    ${sizeTypes?.length !== 0 ? "اختر النوع" : "لا يوجد "} `
              }
              loadingPlaceholder={`${
                !categoryID?.id ? "اختر الصنف أولا" : t("loading")
              }`}
              loading={loadingSizeType}
              creatable={true}
              CreateComponent={NewSizeTypeOptionComponent}
              // onComplexCreate={(value) => {}}
              options={sizeTypes}
              value={newValue}
              onChange={(option: SingleValue<SelectOption_TP>) => {
                setNewValue(option)
              }}
              fieldKey="id"
            />
          )}
          {!showCategories && (
            <BaseInputField
              id="type"
              label={`${t("size type")}`}
              name="type"
              type="text"
              placeholder={`${t("size type")}`}
              required
            />
          )}
          <BaseInputField
            id="start"
            label=" بدايه معدل المقاس"
            name="start"
            type="text"
            placeholder="من ..."
            required
          />
          <BaseInputField
            id="end"
            label=" نهايه معدل المقاس"
            name="end"
            type="text"
            placeholder="الي ..."
            required
          />
          <BaseInputField
            id="increase"
            label="معدل  الزياده"
            name="increase"
            type="text"
            placeholder=" معدل الزياده"
            required
          />
        </InnerFormLayout>
      </OuterFormLayout>
    </>
  )
}
