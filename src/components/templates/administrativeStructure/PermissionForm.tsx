/////////// IMPORTS
///
///
/////////// Types
///
import { useFormikContext } from "formik"
import { BaseInputField, InnerFormLayout } from "../../molecules"
import { PermissionGroup } from "./PermissionGroup"
import { Permission_TP } from "../../../context/auth-and-perm/auth-permissions-types"
import { PermissionGroup_TP } from "../../../pages/administrativeStructure/types-and-schemas"

/////////// HELPER VARIABLES & FUNCTIONS
///
type PermissionProps_TP = {
  permissions: PermissionGroup_TP[]
  editData: PermissionGroup_TP | undefined
}
///
export const PermissionForm = ({ permissions , editData }: PermissionProps_TP) => {
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
    <InnerFormLayout>
      <div className="col-span-1">
        <BaseInputField
          placeholder="مدير"
          labelProps={{ className: "mb-5" }}
          type="text"
          id="name"
          label="الإسم"
          name="name"
        />
      </div>
      <div className="flex flex-col gap-1 col-span-4">
        <h4 className="flex items-center justify-center text-2xl underline  underline-offset-2 decoration-1 mb-5">
          الصلاحيات
        </h4>

        <div className=" flex flex-col justify-center items-start gap-8">
          {permissions.map(({ id, name, permissions }: {id:string , name:string , permissions: Permission_TP[]}) => (
            <PermissionGroup key={id} name={name} permissions={permissions} editData={editData}/>
          ))}
        </div>
      </div>
    </InnerFormLayout>
  )
}