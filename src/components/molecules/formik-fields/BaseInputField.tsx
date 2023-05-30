import { useFormikContext } from "formik"
import { useEffect, useState } from "react"
import { BaseInput, FormikError, Label } from "../../atoms"

export const BaseInputField = ({
  label,
  id,
  required,
  labelProps,
  noMb = false,
  type = "text",
  ...props
}: {
  label?: string
  id: string
  noMb?: boolean
  required?: boolean
  labelProps?: {
    [key: string]: any
  }
  name: string
  type: "text" | "number" | "password" | "email"
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext<{
      [key: string]: any
    }>()

  // const [fieldValue, setFieldValueState] = useState(
  //   props.value || values[props.name]
  // )

  // useEffect(() => {
  //   setFieldValue(props.name, fieldValue)
  // }, [fieldValue])

  return (
    <div 
      className={noMb ? "col-span-1 relative" 
      : "col-span-1 relative mb-[10px]"}
    >
      <div className="flex flex-col gap-1">
        {label && (
          <Label htmlFor={id} {...labelProps} required={required}>
            {label}
          </Label>
        )}

        <BaseInput
          type={type}
          id={id}
          {...props}
          // value={fieldValue}
          value={props.value || values[props.name]}
          error={touched[props.name] && !!errors[props.name]}
          autoComplete="off"
          onBlur={() => {
            setFieldTouched(props.name, true)
          }}
          onChange={(e) => {
            props.onChange && props.onChange(e)
            if (props.value === undefined) {
              // setFieldValueState(e.target.value)
              setFieldValue(props.name, e.target.value)
            }
          }}
        />
      </div>
      <FormikError name={props.name} className="whitespace-nowrap absolute" />
    </div>
  )
}
