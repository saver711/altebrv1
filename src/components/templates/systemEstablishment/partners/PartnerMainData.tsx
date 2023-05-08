/////////// IMPORTS
///
///
/////////// Types
///

import { FormikSharedConfig, useFormikContext } from "formik"
import { t } from "i18next"
import {
  BaseInputField,
  DateInputField,
  InnerFormLayout,
  PhoneInput,
} from "../../../molecules"
import { DropFile } from "../../../molecules/files/DropFile"
import { Country_city_distract_markets } from "../../reusableComponants/Country_city_distract_markets"
import { SelectNationality } from "../SelectNationality"

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const PartnerMainData = ({ editData }: { editData?: any }) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const { setFieldValue } = useFormikContext<FormikSharedConfig>()

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  return (
    <>
      <InnerFormLayout title={"البياينات الاساسية"}>
        {/* اسم الشريك */}
        <BaseInputField
          id="partner_name"
          label={`${t("partner name")}`}
          name="name"
          type="text"
          placeholder={`${t("partner name")}`}
          labelProps={{ className: "mb-1" }}
          required
        />
        {/* ايميل الشريك */}
        <BaseInputField
          id="partner_email"
          label={`${t("partner email")}`}
          name="email"
          type="email"
          placeholder={`${t("partner email")}`}
          labelProps={{ className: "mb-1" }}
          required
        />

        {/* رقم الجوال */}
        {!!!editData && (
          <PhoneInput
            label={`${t("mobile number")}`}
            name="phone"
            placeholder={`${t("mobile number")}`}
          />
        )}

        {/* <BaseInputField
          id="address"
          label={`${t("address")}`}
          name="address_partner"
          type="text"
          placeholder={`${t("address")}`}
          labelProps={{ className: "mb-1" }}
          required
        /> */}

        <Country_city_distract_markets
          countryName="country_id"
          countryLabel={`${t("country")}`}
          cityName="city_id"
          cityLabel={`${t("city")}`}
          editData={{
            nationalAddress: {
              country: {
                id: editData?.country.id,
                name: editData?.country.name,
              },
              city: {
                id: editData?.city.id,
                name: editData?.city.name,
              },
              district: {
                id: editData?.nationalAddress?.district.id,
                name: editData?.nationalAddress?.district.name,
              },
            },
          }}
        />
        <SelectNationality name="nationality_id" editData={editData} />
        {/* تاريخ انتهاء الهوية */}
        <DateInputField label={`${t("End IdNumber")}`} name="end_date" />

        {/* تاريخ بدء الشراكة */}
        <DateInputField
          label={`${t("start Date Partner")}`}
          name="start_date"
        />
        <div className="col-span-4">
          <h2> {`${t("national image")}`}</h2>
          <DropFile name="national_image" />
        </div>
      </InnerFormLayout>
          
    </>
  )
}
