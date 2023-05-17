/////////// IMPORTS
///
import { useFormikContext } from "formik"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { SingleValue } from "react-select"
import { useFetch } from "../../../hooks"
import { SelectOption_TP } from "../../../types"
import { Select } from "../../molecules"
import { RefetchErrorHandler } from "../../molecules/RefetchErrorHandler"
import { CreateNationalities } from "../CreateNationalities"
///
/////////// Types

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const SelectNationality = ({ name, editData }: { name: string , editData?:any }) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const {
    data: nationalityOptions,
    isLoading: nationalityLoading,
    refetch: refetchNationality,
    failureReason: nationalityErrorReason,
  } = useFetch<SelectOption_TP[]>({
    endpoint: "governorate/api/v1/nationalities",
    queryKey: ["nationalities"],
    select: (nationalities) =>
      nationalities.map((nationality) => {
        return {
          id: nationality.id,
          value: nationality.name!,
          label: nationality.name!,
          name: nationality.name!,
        }
      }),
  })

  ///
  /////////// STATES
  ///
  const [newValue, setNewValue] =
    useState<SingleValue<SelectOption_TP> | null>()
  const { setFieldValue, values } = useFormikContext()
  ///
  /////////// SIDE EFFECTS
  ///
    useEffect(() => {
      setNewValue({
        id: editData?.nationality.id,
        value: editData?.nationality.name,
        label: editData?.nationality.name || "اختر جنسية",
      })
    }, [])

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  return (
    <div className="flex flex-col">
      <Select
        id="nationality"
        label={`${t("nationality")}`}
        name={name}
        placeholder={`${t("nationality")}`}
        loadingPlaceholder={`${t("loading")}`}
        options={nationalityOptions}
        loading={nationalityLoading}
        creatable
        CreateComponent={CreateNationalities}
        fieldKey="id"
        value={newValue}
        isDisabled={!nationalityLoading && !!nationalityErrorReason}
        onChange={(option) => {
          setNewValue(option)
        }}
      />
      <RefetchErrorHandler
        failureReason={nationalityErrorReason}
        isLoading={nationalityLoading}
        refetch={refetchNationality}
      />
    </div>
  )
}
