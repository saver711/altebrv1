/////////// IMPORTS
///

import { useFormikContext } from "formik"
import { ChangeEvent } from "react"
import { CheckBoxField } from "../../molecules"
import { Permission_TP } from "../../../context/auth-and-perm/auth-permissions-types"
import { PermissionGroup_TP } from "../../../pages/administrativeStructure/types-and-schemas"

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
  editData
}: PermissionGroupProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const { setFieldValue } = useFormikContext()
  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <div className="flex flex-col gap-4">
      <h4 className="flex items-center  text-lg ">{name}</h4>
      <div className="grid grid-cols-2 gap-5">
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