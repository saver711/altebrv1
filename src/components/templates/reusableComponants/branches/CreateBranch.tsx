/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import { useState } from "react"
import * as Yup from "yup"
import { NationalAddress } from "../.."
import { useIsRTL, useMutate } from "../../../../hooks"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../atoms"
import { InnerFormLayout, OuterFormLayout } from "../../../molecules"
import { BaseInputField } from "../../../molecules/formik-fields/BaseInputField"
import { Country_city_distract_markets } from "../Country_city_distract_markets"
import { allDocs_TP, Documents } from "../documents/Documents"
import { Branch_Props_TP } from "./ViewBranches"
import { BranchMainData } from "./BranchMainData"
///
/////////// Types
///
type CreateBranchProps_TP = {
  value?: string
  onAdd?: (value: string) => void
  editData?: Branch_Props_TP
}

type InitialValues_TP = {
  [x: string]: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const CreateBranch = ({
  value,
  title,
  onAdd,
  editData,
}: CreateBranchProps_TP) => {
  /////////// VARIABLES
  ///
  console.log("branch editData", editData)
  const initialValues = {
    name_ar: editData ? editData.name_ar : "",
    name_en: editData ? editData.name_en : "",
    country_id_out: editData ? editData.country.id : "",
    city_id_out: editData ? editData.city.id : "",
    district_id_out: editData ? editData.district.id : "",
    country_id: editData ? editData.country.id : "",
    city_id: editData ? editData.city.id : "",
    district_id: editData ? editData.district.id : "",
    market_id: editData ? editData.market.id : "",
    market_number: editData ? editData.market_number : "",
    phone: editData ? editData.phone : "",
    fax: editData ? editData.fax : "",
    number: editData ? editData.number : "",
    main_address: editData ? editData.address : "",

    // national address data
    building_number: editData ? editData.nationalAddress.building_number : "",
    street_number: editData ? editData.nationalAddress.street_number : "",
    sub_number: editData ? editData.nationalAddress.sub_number : "",
    address: editData ? editData.nationalAddress.address : "",
    zip_code: editData ? editData.nationalAddress.zip_code : "",
    // document type
    docType: "",
    docName: "",
    docNumber: "",
    endDate: new Date(),
    reminder: "",
    files: [],
  }
  const validationSchema = Yup.object({
    name_ar: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    name_en: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    market_id: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    country_id_out: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    country_id: Yup.string().trim().required("برجاء ملئ هذا الحقل"),

    city_id_out: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    district_id_out: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    city_id: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    district_id: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    market_number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    phone: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    fax: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    building_number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    street_number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    sub_number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    address: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    main_address: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    zip_code: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
  })

  /////////// STATES
  ///
  //@ts-ignore
  const incomingData = !!editData
    ? editData!.document.map((item) => ({
        ...item.data,
        endDate: new Date(item.data.endDate),
        files: item?.files || [],
        id: item.id,
      }))
    : []

  const [docsFormValues, setDocsFormValues] =
    useState<allDocs_TP[]>(incomingData)
  ///
  /////////// CUSTOM HOOKS
  ///
  const queryClient = useQueryClient()
  const { mutate, error, isLoading, isSuccess, reset } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data) => {
      notify("success")
      queryClient.refetchQueries(["branch"])
      queryClient.setQueryData(["branches"], () => {
        return [data]
      })
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

  ///
  return (
    <div className="flex items-center justify-between gap-2">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          let editedValues = {
            ...values,
            country_id: values.country_id_out,
            city_id: values.city_id_out,
            district_id: values.district_id_out,
            address: values.main_address,
            document: docsFormValues,
            nationalAddress: {
              address: values.address,
              country_id: values.country_id,
              city_id: values.city_id,
              district_id: values.district_id,
              building_number: values.building_number,
              street_number: values.street_number,
              sub_number: values.sub_number,
              zip_code: values.zip_code,
            },
          }
          if (!!editData) {
            let { document, ...editedValuesWithoutDocument } = editedValues
            if (docsFormValues.length > editData.document.length)
              editedValues = {
                ...editedValues,
                document: editedValues.document.slice(editData.document.length),
              }
            if (docsFormValues.length === editData.document.length)
              editedValues = editedValuesWithoutDocument
            console.log("editedValues", editedValues)
            mutate({
              endpointName: `branch/api/v1/branches/${editData.id}`,
              values: editedValues,
              dataType: "formData",
              editWithFormData: true,
            })
          } else {
            mutate({
              endpointName: "branch/api/v1/branches",
              values: editedValues,
              dataType: "formData",
            })
          }
          console.log("values", editedValues)
        }}
        validationSchema={validationSchema}
      >
        <HandleBackErrors errors={error?.response?.data?.errors}>
          <Form className="w-full">
            <BranchMainData
              isLoading={isLoading}
              title={title}
              editData={editData}
              isSuccessPost={isSuccess}
              restData={reset}
              setDocsFormValues={setDocsFormValues}
              docsFormValues={docsFormValues}
            />
          </Form>
        </HandleBackErrors>
      </Formik>
    </div>
  )
}
