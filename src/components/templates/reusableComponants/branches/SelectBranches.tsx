/////////// IMPORTS
///
import { useFormikContext } from "formik"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { SingleValue } from "react-select"
import { useFetch } from "../../../../hooks"
import { SelectOption_TP } from "../../../../types"
import { Select } from "../../../molecules"
import { RefetchErrorHandler } from "../../../molecules/RefetchErrorHandler"
import { CreateBranch } from "./CreateBranch"
///
/////////// Types
type SelectBranchesProps_TP =  {
  name: string
  editData?: any
  isSuccessPost?: any
  resetSelect?:any
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const SelectBranches = ({
  name,
  editData,
  isSuccessPost,
  resetSelect,
}: SelectBranchesProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const {
    data: branchesOptions,
    isLoading: branchesLoading,
    refetch: refetchBranches,
    failureReason: branchesErrorReason,
  } = useFetch<SelectOption_TP[]>({
    endpoint: "branch/api/v1/branches",
    queryKey: ["branches"],
    select: (branches) =>
      branches.map((branch) => {
        return {
          id: branch.id,
          value: branch.name || "",
          label: branch.name || "",
        }
      }),
    onError: (err) => console.log(err),
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
      id: editData?.branch.id,
      value: editData?.branch.name,
      label: editData?.branch.name || "اختر فرع",
    })
  }, [])
  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///
  useEffect(() => {
    if (!!!editData) {
      setNewValue({
        id: "",
        value: "",
        label: "اختر فرع",
      })
      if (resetSelect) resetSelect()
    }
  }, [isSuccessPost])
  ///
  return (
    <div className="flex flex-col">
      <Select
        id="branch"
        label={`${t("Branch")}`}
        name={name}
        placeholder={
          branchesOptions?.length !== 0 ? `${t("branch")}` : "اضف فرع "
        }
        loadingPlaceholder={`${t("loading")}`}
        options={branchesOptions}
        loading={branchesLoading}
        creatable
        CreateComponent={CreateBranch}
        fieldKey="id"
        value={newValue}
        isDisabled={!branchesLoading && !!branchesErrorReason}
        onChange={(option) => {
          setNewValue(option)
        }}
      />
      <RefetchErrorHandler
        failureReason={branchesErrorReason}
        isLoading={branchesLoading}
        refetch={refetchBranches}
      />
    </div>
  )
}
