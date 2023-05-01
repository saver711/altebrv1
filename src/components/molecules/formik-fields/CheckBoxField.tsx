import { useFormikContext } from "formik"
import { FormikError } from "../../atoms"
import { Checkbox } from "../Checkbox"

// props type
type Props_TP = {
  [key: string]: any
}

export const CheckBoxField = ({
  label,
  id,
  name,
  ...props
}: { label: string, name:string } & Props_TP) => {
  const { setFieldValue, setFieldTouched, errors, values } = useFormikContext<{
    [key: string]: any
  }>()
  return (
    <div >
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