import { useFormikContext } from "formik"
import { useEffect } from "react"
import { PermissionGroup_TP } from "../../../pages/administrativeStructure/types-and-schemas"
import { FormikError } from "../../atoms"
import { Checkbox } from "../Checkbox"

// props type
type Props_TP = {
  [key: string]: any
  editData?: PermissionGroup_TP | undefined
}

export const CheckBoxField = ({
  label,
  id,
  name,
  editData,
  ...props
}: { label: string; name: string } & Props_TP) => {
  const { setFieldValue, setFieldTouched, errors, values } = useFormikContext<{
    [key: string]: any
  }>()

  useEffect(() => {
    if (!!editData) {
      editData?.permissions.map((permission) => {
        setFieldValue(permission.id, true)
      })
    }
  }, [JSON.stringify(editData)])

  return (
    <div>
      <Checkbox
        label={label}
        id={id}
        value={values[name]}
        className={`${errors[name] && "border-2 border-mainRed"}`}
        {...props}
        checked={values[name]}
        onChange={(e) => {
          setFieldValue(name, e.target.checked)
        }}
        onBlur={() => {
          setFieldTouched(name, true)
        }}
      />
      <FormikError name={name} />
    </div>
  )
}