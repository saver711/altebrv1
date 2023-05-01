/////////// IMPORTS
///
import { FormikSharedConfig, useFormikContext } from "formik"
import { t } from "i18next"
import { InnerFormLayout } from "../molecules/InnerFormLayout"
import { BaseInputField } from "../molecules/formik-fields/BaseInputField"
import { Country_city_distract_markets } from "./reusableComponants/Country_city_distract_markets"
import { supplier } from "../../pages/suppliers/AllSuppliers"

///
/////////// Types
///
type NationalAddress_TP = {
  editData?: supplier
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const NationalAddress = ({ editData }: NationalAddress_TP) => {
  /////////// VARIABLES
  ///

  ///
  ///
  /////////// STATES
  ///
  ///
  /////////// CUSTOM HOOKS
  const { setFieldValue } = useFormikContext<FormikSharedConfig>()

  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <>
      <InnerFormLayout title={`${t("national address")}`}>
        <Country_city_distract_markets
          cityName="city_id"
          countryName="country_id"

          distractName="district_id"
          editData={editData}
        />
        {/* min address start */}
        <BaseInputField
          id="minAddress"
          label={`${t("short address")}`}
          name="min_Address"
          type="text"
          placeholder={`${t("short address")}`}
          required
        />
        {/* min address end */}

        {/* street number start */}
        <BaseInputField
          id="streetNumber"
          label={`${t("street number")}`}
          name="building_number"
          type="text"
          placeholder={`${t("street number")}`}
          required
        />
        {/* street number end */}

        {/* building number start */}
        <BaseInputField
          id="buildingNumber"
          label={`${t("building number")}`}
          name="street_number"
          type="text"
          placeholder={`${t("building number")}`}
          required
        />
        {/* building number end */}

        {/* sub number start */}
        <BaseInputField
          id="subNumber"
          label={`${t("sub number")}`}
          name="sub_number"
          type="text"
          placeholder={`${t("sub number")}`}
          required
        />
        {/* sub number end */}

        {/* postal number start */}
        <BaseInputField
          id="zip_code"
          label={`${t("zip code")}`}
          name="zip_code"
          type="text"
          placeholder={`${t("zip code")}`}
          required
        />
        {/* postal number end */}
      </InnerFormLayout>
    </>
  )
}
