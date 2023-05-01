/////////// IMPORTS
///
import { t } from "i18next"
import { useFetch } from "../../../hooks"
import { SelectOption_TP } from "../../../types"
import { Select } from "../../molecules"
import { RefetchErrorHandler } from "../../molecules/RefetchErrorHandler"
import { CreateNationalities } from "../CreateNationalities"
import { useFormikContext } from "formik"
///
/////////// Types

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const SelectNationality = ({ name }:{ name:string}) => {
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
        id="nationality"
        label={`${t("Nationality")}`}
        name={name}
        placeholder={`${t("nationality")}`}
        loadingPlaceholder={`${t("loading")}`}
        options={nationalityOptions}
        loading={nationalityLoading}
        creatable
        CreateComponent={CreateNationalities}
        fieldKey="id"
        isDisabled={!nationalityLoading && !!nationalityErrorReason} />
      <RefetchErrorHandler failureReason={nationalityErrorReason} isLoading={nationalityLoading} refetch={refetchNationality} />
    </div>
  )
}
