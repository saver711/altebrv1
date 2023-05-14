/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import * as Yup from "yup"
import { NationalAddress } from "../.."
import { useMutate } from "../../../../hooks"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../atoms"
import { InnerFormLayout, OuterFormLayout } from "../../../molecules"
import { BaseInputField } from "../../../molecules/formik-fields/BaseInputField"
import { Country_city_distract_markets } from "../Country_city_distract_markets"
///
/////////// Types
///
type CreateBranchProps_TP = {
  value?: string
  onAdd?: (value: string) => void
  editData?: { [key: string]: any }
}

type InitialValues_TP = {
  [x: string]: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const CreateBranch = ({
  value,
  onAdd,
  editData,
}: CreateBranchProps_TP) => {
  /////////// VARIABLES
  ///
  console.log("v", editData)
  const initialValues: InitialValues_TP = {
    name: editData ? editData.name_ar : "",
    market_id: editData ? editData.market_name : "",
    city_id: editData ? editData.city_name : "",
    district_id: editData ? editData.nationalAddress.name : "",
    market_number: editData ? editData.market_number : "",
    phone: editData ? editData.phone : "",
    fax: editData ? editData.fax : "",
    number: editData ? editData.number : "",
    building_number: editData ? editData.nationalAddress.building_number : "",
    street_number: editData ? editData.nationalAddress.street_number : "",
    sub_number: editData ? editData.nationalAddress.sub_number : "",
    address: editData ? editData.nationalAddress.address : "",
    zip_code: editData ? editData.nationalAddress.zip_code : "",
  }
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    market_id: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    city_id: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    district_id: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    market_number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    phone: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    fax: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    building_number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    street_number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    sub_number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    address: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    zip_code: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
  })

  /////////// STATES
  ///
  ///
  /////////// CUSTOM HOOKS
  ///
  const queryClient = useQueryClient()
  const { mutate, error, isLoading } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data) => {
      notify("success")
      queryClient.setQueryData(["branches"], (old: any) => {
        return [...old, data]
      })
      onAdd(value)
    },
    onError: (error) => {
      notify("error")
      console.log(error)
    },
  })
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  function PostNewValue(values: InitialValues_TP) {
    mutate({
      endpointName: "branch/api/v1/branches",
      values: {
        ...values,
        nationalAddress: {
          sub_number: values.sub_number,
          city_id: values.city_id,
          district_id: values.district_id,
          zip_code: values.zip_code,
          address: values.address,
          building_number: values.building_number,
          street_number: values.street_number,
        },
      },
    })
  }
  ///
  return (
    <div className="flex items-center justify-between gap-2">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          PostNewValue(values)
        }}
        validationSchema={validationSchema}
      >
        <HandleBackErrors errors={error?.response?.data?.errors}>
          <OuterFormLayout header={t("Add Branch")}>
            <Form className="w-full">
              <InnerFormLayout title={t("main data")}>
                {/* branch name  start */}
                <div className="col-span-1">
                  <BaseInputField
                    id="name"
                    label={`${t("branch in arabic")}`}
                    name="name_ar"
                    type="text"
                    placeholder={`${t("branch in arabic")}`}
                    defaultValue={editData && editData.name}
                  />
                </div>
                {/* branch name  end */}

                {/* branch number  start */}
                <div className="col-sapn-1">
                  <BaseInputField
                    id="number"
                    label={`${t("branch number")}`}
                    name="number"
                    type="text"
                    placeholder={`${t("branch number")}`}
                    defaultValue={editData && editData.number}
                  />
                </div>
                {/* branch number  end */}
                {/* market  start */}
                <Country_city_distract_markets
                  cityFieldKey="value"
                  cityLabel={`${t("city")}`}
                  cityName="city_branch_value"
                  countryFieldKey="value"
                  countryLabel={`${t("country")}`}
                  countryName="country_branch_value"
                  distractFieldKey="value"
                  distractLabel={`${t("district")}`}
                  distractName="district_branch_value"
                  marketFieldKey="id"
                  marketLabel={`${t("market")}`}
                  marketName="market_id"
                  editData={editData}
                />
                {/* market  end */}

                {/* market number start */}
                <div className="col-sapn-1">
                  <BaseInputField
                    id="market_number"
                    label={`${t("market number")}`}
                    name="market_number"
                    type="number"
                    placeholder={`${t("market number")}`}
                    defaultValue={editData && editData.market_number}
                  />
                </div>
                {/* market number  end */}

                {/* address start */}
                <div className="col-sapn-1">
                  <BaseInputField
                    id="address"
                    label={`${t("address")}`}
                    name="address"
                    type="text"
                    placeholder={`${t("address")}`}
                    defaultValue={editData && editData.nationalAddress.address}
                  />
                </div>
                {/* address  end */}

                {/* phone start */}
                <div className="col-sapn-1">
                  <BaseInputField
                    id="phone"
                    label={`${t("phone")}`}
                    name="phone"
                    type="text"
                    placeholder={`${t("phone")}`}
                    defaultValue={editData && editData.phone}
                  />
                </div>
                {/* phone end */}

                {/* fax start */}
                <div className="col-span-1">
                  <BaseInputField
                    id="fax"
                    label={`${t("fax")}`}
                    name="fax"
                    type="text"
                    placeholder={`${t("fax")}`}
                    defaultValue={editData && editData.fax}
                  />
                </div>
                {/* fax end */}
              </InnerFormLayout>
              <NationalAddress editData={editData} />
              <Button loading={isLoading} type="submit" className="mr-auto">
                {t("submit")}
              </Button>
            </Form>
          </OuterFormLayout>
        </HandleBackErrors>
      </Formik>
    </div>
  )
}
