/////////// IMPORTS
///

import { useFormikContext } from "formik"
import { t } from "i18next"
import { ChangeEvent } from "react"
import { Permission_TP } from "../../../context/auth-and-perm/auth-permissions-types"
import { PermissionGroup_TP } from "../../../pages/administrativeStructure/types-and-schemas"
import { CheckBoxField } from "../../molecules"

///
/////////// Types
///
type PermissionGroupProps_TP = {
  permissions: Permission_TP[]
  name: string
  editData?: PermissionGroup_TP | undefined

}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const PermissionGroup = ({
  name,
  permissions,
  editData,
}: PermissionGroupProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const { setFieldValue , values } = useFormikContext()
  ///
  /////////// STATES
  ///
  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
 const handleCheckGroup = (e:any)=>{
 const checkedBoxesIdGroupArray =  permissions.map((group)=>{
  if(name !=='name' && e.target.name === name)
  return group
 }
  )
//  console.log("🚀 ~ file: PermissionGroup.tsx:47 ~ handleCheckGroup ~ checkedBoxesGroupStatus:", checkedBoxesIdGroupArray)

 }
 
  ///
  return (
    <div className="flex flex-col w-full gap-4 border-b-2 border-mainGreen border-opacity-20 pb-5 border-dashed">
      <div className="flex items-center justify-between" >
        <h4 className="flex items-center text-lg ml-8">{name}</h4>
        <div>
        <input type="checkbox" id='check_all' name={name} onChange={(e) => {
          handleCheckGroup(e)
            permissions.map(group=>{
              if(name !=='name' && e.target.name === name)
              Object.values(group).map(value=>{
                setFieldValue(value, e.target.checked)
              }
                )
            }
            )
        }} className="mx-2  text-mainGreen rounded" />
        <label htmlFor="check_all">{t('select group')}</label>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {permissions.map(({ id, name }) => (
          <div key={id}>
            <CheckBoxField
              label={name}
              type="checkbox"
              id={id}
              name={id}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.checked
                  ? setFieldValue(id, id)
                  : setFieldValue(id, "")
              }}
              editData={editData}
            />
          </div>
        ))}
      </div>
    </div>
  )
}