/////////// IMPORTS
///
import { t } from "i18next"
import { useFetch } from "../../../../hooks"
import { SelectOption_TP } from "../../../../types"
import { Select } from "../../../molecules"
import { RefetchErrorHandler } from "../../../molecules/RefetchErrorHandler"
import { CreateBranch } from "./CreateBranch"
///
/////////// Types

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const SelectBranches = ({name}:{name:string}) => {
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
          label: branch.name || "",        }
      }),
      onError:(err)=>console.log(err)
  })
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

  ///
  return (
    <div className="flex flex-col">
      <Select
        id="branch"
        label={`${t("Branch")}`}
        name={name}
        placeholder={branchesOptions?.length !==0 ? `${t("branch")}`: 'اضف فرع '}
        loadingPlaceholder={`${t("loading")}`}
        options={branchesOptions}
        loading={branchesLoading}
        creatable
        CreateComponent={CreateBranch}
        fieldKey="id"
        isDisabled={!branchesLoading && !!branchesErrorReason} />
      <RefetchErrorHandler failureReason={branchesErrorReason} isLoading={branchesLoading} refetch={refetchBranches} />
    </div>
  )
}
