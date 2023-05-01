/////////// IMPORTS
///
import { t } from "i18next"
import { Select } from "../../../molecules"
import { AiOutlineReload } from "react-icons/ai"
import { useFetch } from "../../../../hooks"
import { SelectOption_TP } from "../../../../types"
import { AddAdministrativeStructure } from "../../../../pages/AdministrativeStructure/AddAdministrativeStructure"
///
/////////// Types
type SelectRoleProps_TP = {
  name: string,
  label?: string,
  field?: "id" | "value",
  stateValue?: any
  onChange?: (option:any) => void,
  value?:{[x:string]:string}
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const SelectRole = ({ name , field , onChange , value }:SelectRoleProps_TP) => {
  /////////// VARIABLES
  ///




  ///
  /////////// CUSTOM HOOKS
  ///
 // get job title
 const {
    data: jobTitlesOptions,
    isLoading: jobTitlesLoading,
    refetch: refetchJobTitles,
    failureReason: jobTitlesErrorReason,
  } = useFetch<SelectOption_TP[]>({
    endpoint: "/administrative/api/v1/roles",
    queryKey: ["allRoles"],
    select: (jobTitles) =>
      jobTitles.map((jobTitle: any) => ({
        id: jobTitle.id,
        value: jobTitle.name,
        label: jobTitle.name,
      })),
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
      id="role_id"
      label={`${t('job title')}`}
      name={name}
      placeholder={`${t('job title')}`}
      loadingPlaceholder={`${t('loading')}`}
      options={jobTitlesOptions}
      fieldKey= {field || "id"}
      loading={jobTitlesLoading}
      creatable
      //@ts-ignore
      CreateComponent={AddAdministrativeStructure}
      isDisabled={!jobTitlesLoading && !!jobTitlesErrorReason}
      onChange={onChange}
      {...{...(value && {value})}}
    />
    {
      jobTitlesErrorReason &&
      <div className="flex gap-x-2 items-center" >
        {!jobTitlesLoading && <span className="text-mainRed">حدث خطأ أثناء جلب الباتات  </span>}
        {!jobTitlesLoading && <AiOutlineReload onClick={()=>refetchJobTitles()} className="cursor-pointer hover:animate-spin font-bold  text-xl text-mainGreen " title="إعادة التحميل" />}
      </div>
    }
  </div>
  )
}
