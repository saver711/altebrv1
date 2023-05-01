import * as Yup from "yup"
import { isValidPhoneNumber } from "react-phone-number-input"
import { Supplier_TP } from "./supplier-types"
import {
  nationalNumberMax,
  nationalNumberMin,
  requiredTranslation,
} from "../../../../utils/helpers"

// types

export const supplierValidatingSchema = () =>
  Yup.object({
    // supplier validation
    name: Yup.string().trim().required(requiredTranslation),
    type: Yup.string().trim().required(requiredTranslation),
    is_mediator: Yup.boolean(),
    company_name: Yup.string().trim().required(requiredTranslation),
    address: Yup.string().trim().required(requiredTranslation),
    // mobile: Yup.string()
    // .trim()
    // .required(requiredTranslation).test('isValidateNumber', 'رقم غير صحيح', function (value:string) {
    //   return isValidPhoneNumber(value || "")
    // }),
    mobile: Yup.string().trim().required(requiredTranslation),
    phone: Yup.string().trim().required(requiredTranslation),
    email: Yup.string().trim().required(requiredTranslation),
    password: Yup.string().trim().required(requiredTranslation),
    fax: Yup.string().trim().required(requiredTranslation),
    nationality_id: Yup.string().trim().required(requiredTranslation),
    national_number: Yup.string()
      .min(10, nationalNumberMin)
      .max(30, nationalNumberMax)
      .required(requiredTranslation),
    national_expire_date: Yup.string().required(requiredTranslation),
    // national address validation
    country_id: Yup.string().trim().required(requiredTranslation),
    city_id: Yup.string().trim().required(requiredTranslation),
    district_id: Yup.string().trim().required(requiredTranslation),
    min_Address: Yup.string().trim().required(requiredTranslation),
    building_number: Yup.string().trim().required(requiredTranslation),
    street_number: Yup.string().trim().required(requiredTranslation),
    sub_number: Yup.string().trim().required(requiredTranslation),
    zip_code: Yup.string().trim().required(requiredTranslation),
  })
