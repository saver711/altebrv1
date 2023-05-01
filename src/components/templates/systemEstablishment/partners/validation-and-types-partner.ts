import { t } from "i18next"
import { isValidPhoneNumber } from "react-phone-number-input"
import * as Yup from "yup"

export type InitialValues_TP = {
  name: string
  email: string
  phone: string
  end_date: Date
  start_date: Date
  city_id: string
  country_id: string
  nationality_name: string
  nationality_id: string
  national_image: any
  address: string
  // document type
  docType: string
  docName: string
  docNumber: string
  endDate: Date
  reminder: string
  files: any
  //national address
  building_number: string
  district_id: string
  street_number: string
  sub_number: string
  zip_code: string
}
const requiredTranslation = () => `${t("required")}`

export const partnerValidatingSchema = () =>
  Yup.object({
    name: Yup.string().trim().required(requiredTranslation),
    email: Yup.string().email().trim().required(requiredTranslation),
    phone: Yup.string().trim().required(requiredTranslation),
    end_date: Yup.date().required(requiredTranslation),
    start_date: Yup.date().required(requiredTranslation),
    city_id: Yup.string().trim().required(requiredTranslation),
    country_id: Yup.string().trim().required(requiredTranslation),
    IdNumber: Yup.string().trim().required(requiredTranslation),
    nationality_id: Yup.string().trim().required(requiredTranslation),
    national_image: Yup.string().trim().required(requiredTranslation),
    
  })
