/////////// IMPORTS
///
import { FormikSharedConfig, useFormikContext } from "formik"
import { t } from "i18next"
import { useState } from "react"
import { AiOutlineReload } from "react-icons/ai"
import { SingleValue } from "react-select"
import { useFetch } from "../../../../hooks"
import { supplier } from "../../../../pages/suppliers/AllSuppliers"
import { SelectOption_TP } from "../../../../types"
import {
  BaseInputField,
  CheckBoxField,
  DateInputField,
  InnerFormLayout,
  PhoneInput,
  Select,
} from "../../../molecules"
import RadioGroup from "../../../molecules/RadioGroup"
import { DropFile } from "../../../molecules/files/DropFile"
import { CreateNationalities } from "../../CreateNationalities"
import { Country_city_distract_markets } from "../../reusableComponants/Country_city_distract_markets"
import { SelectNationality } from "../SelectNationality"
///
/////////// Types
///
type SupplierMainDataProps_TP = {
  title: string
  editData?: supplier
}
/////////// HELPER VARIABLES & FUNCTIONS
///
///
export const SupplierMainData = ({
  title,
  editData,
}: SupplierMainDataProps_TP) => {
  /////////// VARIABLES
  /////
  const { setFieldValue } = useFormikContext<FormikSharedConfig>()
  ///
  /////////// CUSTOM HOOKS
  ///
  const {
    data: nationalitiesOptions,
    isLoading: nationalitiesLoading,
    refetch: refetchNationalities,
    failureReason: nationalitiesErrorReason,
  } = useFetch<SelectOption_TP[]>({
    endpoint: "governorate/api/v1/nationalities",
    queryKey: ["nationalities"],
    select: (nationalities) =>
      nationalities.map((nationality: any) => ({
        id: nationality.id,
        value: nationality.id,
        label: nationality.name,
      })),
  })

  ///
  /////////// STATES
  ///
  const [updateLogo, setUpdateLogo] = useState(false)
  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <>
      <InnerFormLayout title={title}>
        <div className="col-span-4 flex justify-between">
          <div className="flex gap-3">
            <span className="font-bold">{t("supplier type")}:</span>
            <RadioGroup name="type">
              <div className="flex gap-3">
                <RadioGroup.RadioButton
                  value="local"
                  label={`${t("local")}`}
                  id="local"
                />
                <RadioGroup.RadioButton
                  value="global"
                  label={`${t("global")}`}
                  id="global"
                />
              </div>
            </RadioGroup>
            <CheckBoxField
              label={`${t("is mediator")}`}
              name="is_mediator"
              id="is_mediator"
            />
          </div>
          <div className="flex gap-3">
            <span className="flex items-center font-bold">
              {t("dealing type")}:
            </span>
            <CheckBoxField
              label={`${t("gold tax")}`}
              name="gold_tax"
              id="gold_tax"
            />
            <CheckBoxField
              label={`${t("wages tax")}`}
              name="wages_tax"
              id="wages_tax"
            />
          </div>
        </div>
        <BaseInputField
          id="name"
          required
          label={`${t("name")}`}
          name="name"
          type="text"
          placeholder={`${t("name")}`}
          labelProps={{ className: "mb-1" }}
        />
        <BaseInputField
          id="company_name"
          required
          label={`${t("company name")}`}
          name="company_name"
          type="text"
          placeholder={`${t("company name")}`}
          labelProps={{ className: "mb-1" }}
        />
        <BaseInputField
          id="address"
          required
          label={`${t("address")}`}
          name="address"
          type="text" 
          placeholder={`${t("address")}`}
          labelProps={{ className: "mb-1" }}
        />
        <Country_city_distract_markets
          countryName="country_id "
          countryLabel={`${t("country")}`}
          editData={{
            nationalAddress: {
              country: {
                id: editData?.country?.id,
                name: editData?.country?.name,
              },
              city: {
                id: editData?.city?.id,
                name: editData?.city?.name,
              },
              district: {
                id: editData?.nationalAddress?.district?.id,
                name: editData?.nationalAddress?.district?.name,
              },
            },
          }}
        />
        {!!!editData?.phone && (
          <PhoneInput
            label={`${t("mobile number")}`}
            name="phone"
            placeholder={`${t("mobile number")}`}
          />
        )}

        <BaseInputField
          id="email"
          required
          label={`${t("email")}`}
          name="email"
          type="email"
          placeholder={`${t("email")}`}
        />
        {!!!editData?.phone && (
          <BaseInputField
            id="password"
            required
            label={`${t("password")}`}
            name="password"
            type="password"
            placeholder={`${t("password")}`}
          />
        )}
        <BaseInputField
          id="fax"
          required
          label={`${t("fax")}`}
          name="fax"
          type="text"
          placeholder={`${t("fax")}`}
          labelProps={{ className: "mb-1" }}
        />
        <div className="flex flex-col">
          <SelectNationality name="nationality_id" editData={editData} />
        </div>
        <BaseInputField
          id="national_number"
          required
          label={`${t("national number")}`}
          name="national_number"
          type="text"
          placeholder={`${t("national number")}`}
          labelProps={{ className: "mb-1" }}
        />
        <DateInputField
          label={`${t("national expire date")}`}
          name="national_expire_date"
          minDate={new Date()}
          labelProps={{ className: "mb-2" }}
        />

        <div className="col-span-4">
          <h2>{`${t("attach the company logo")}`}</h2>
          <DropFile name="logo" />
        </div>
        {/* {updateLogo && (
          <div className="col-span-4">
            <h2>{`${t("attach the company logo")}`}</h2>
            <DropFile name="logo" />
          </div>
        )} */}
      </InnerFormLayout>
    </>
  )
}
