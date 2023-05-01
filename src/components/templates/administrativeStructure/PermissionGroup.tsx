/////////// IMPORTS
///

import { useFormikContext } from "formik"
import { ChangeEvent } from "react"
import { CheckBoxField } from "../../molecules"
import { Permission_TP } from "../../../context/auth-and-perm/auth-permissions-types"

///
/////////// Types
///
type PermissionGroupProps_TP = {
  permissions: Permission_TP[]
  name: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const PermissionGroup = ({
  name,
  permissions,
}: PermissionGroupProps_TP) => {
  console.log("🚀 ~ file: PermissionGroup.tsx:24 ~ permissions:", permissions)
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
            />
          </div>
        ))}
      </div>
    </div>
  )
}