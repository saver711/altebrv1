/////////// IMPORTS
import { useFormikContext } from "formik"
import { default as BasePhoneInput } from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import "react-phone-number-input/style.css"
import { tv } from "tailwind-variants"
import { useIsRTL } from "../../../hooks"
import i18n from "../../../i18n"
import { FormikError } from "../../atoms"
import { Label } from "../../atoms/Label"
import { useEffect } from "react"
///
/////////// Types
///
type PhoneInputs_TP = {
  label: string
  name: "phone" | "mobile"
  placeholder: string
  restData?: any
  isSuccessPost?: any
  required?:any
}
/////////// HELPER VARIABLES & FUNCTIONS
///
const phoneInput = tv({
  base: "rounded-md border-2 border-transparent focus:border-2 focus:border-mainGreen form-input px-4 py-[.30rem] w-full shadows bg-white",
  variants: {
    error: {
      true: "border-mainRed !rounded-md !border-2",
    },
  },
})
///
export const PhoneInput = ({
  label,
  name,
  placeholder,
  restData,
  required,
  isSuccessPost,
}: PhoneInputs_TP) => {
  /////////// VARIABLES
  ///
  ///
  /////////// CUSTOM HOOKS
  ///
  const { setFieldValue, errors, touched, handleBlur, resetForm } =
    useFormikContext<any>()
  ///
  /////////// STATES
  ///

  const isRTL = useIsRTL()

  const textDir = isRTL ? "right" : "left"
  const inputPhone = document.querySelector(".PhoneInputInput")
  const phoneStyle = `text-align: ${textDir};`
  if (inputPhone) {
    //@ts-ignore
    inputPhone!.style.cssText = phoneStyle
  }

  ///
  /////////// SIDE EFFECTS
  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  // useEffect(() => {
  //   if (isSuccessPost) {
  //     resetForm()
  //     restData()
  //     setFieldValue(name, "")
  //   }
  // }, [isSuccessPost])
  ///
  return (
    <>
      <div className="col-span-1">
        <div className="flex flex-col gap-1">
          <Label htmlFor={name} required={required}>
            {label}
          </Label>
          <BasePhoneInput
            // ref={console.log("ref")}
            onBlur={handleBlur(name)}
            className={phoneInput({
              error: touched[name] && !!errors.phone,
            })}
            flags={flags}
            value={isSuccessPost && ""}
            placeholder={placeholder}
            name={name}
            onChange={(number: number | string | undefined) => {
              setFieldValue(name, number)
            }}
            style={{ direction: "ltr" }}
          />
        </div>
        <FormikError name={name} />
      </div>
    </>
  )
}