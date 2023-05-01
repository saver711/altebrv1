import { isValidPhoneNumber } from "react-phone-number-input"
import * as Yup from "yup"
import { requiredTranslation } from "../../../utils/helpers"
import { allDocs_TP } from "../reusableComponants/documents/Documents"


// types 
export type Email_TP = `${string}@${string}.${string}`

export type InitialValues_TP = {
  // employee main data types
  name: string
  branch_id: string
  role_id: string
  address: string
  phone: string
  mobile: string
  nationality_id: string
  date_of_birth: Date
  date_of_hiring: Date
  national_expire_date: Date
  email: Email_TP
  national_number: string
  username: string
  password: string
  country_id: string
  city_id: string
  district_id: string
  min_Address: string
  building_number: string
  street_number: string
  sub_number: string
  national_image: any
  is_active: string
  image: any
  document?:allDocs_TP
}

export const employeeValidatingSchema = ()=> Yup.object({
    // employee main data validation
    name: Yup.string().trim().required(requiredTranslation),
    branch_id: Yup.string().trim().required(requiredTranslation),
    role_id: Yup.string().trim().required(requiredTranslation),
    address: Yup.string().trim().required(requiredTranslation),
    mobile: Yup.string()
    .trim()
    .required(requiredTranslation).test('isValidateNumber', 'رقم غير صحيح', function (value: string) {
      return isValidPhoneNumber(value || "")
    }),
    phone: Yup.string().trim().required(requiredTranslation),
    nationality_id: Yup.string().required(requiredTranslation),
    date_of_birth: Yup.date().required(requiredTranslation),
    national_expire_date: Yup.date().required(requiredTranslation),
    email: Yup.string().trim().required(requiredTranslation),
    national_number: Yup.string().trim().required(requiredTranslation),
  username: Yup.string().trim().required(requiredTranslation),
  password: Yup.string().trim().required(requiredTranslation),
  national_image: Yup.array().required(requiredTranslation).min(1, 'can not be empty'),
  // national address validation
  country_id: Yup.string().trim().required(requiredTranslation),
  city_id: Yup.string().trim().required(requiredTranslation),
  district_id: Yup.string().trim().required(requiredTranslation),
  min_Address: Yup.string().trim().required(requiredTranslation),
  building_number: Yup.string().trim().required(requiredTranslation),
  street_number: Yup.string().trim().required(requiredTranslation),
  sub_number: Yup.string().trim().required(requiredTranslation),
  is_active: Yup.string().required(requiredTranslation),
  image: Yup.array().required(requiredTranslation).min(1, 'can not be empty'),
})