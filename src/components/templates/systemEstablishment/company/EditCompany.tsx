/////////// IMPORTS
///
import { Form, Formik } from "formik"
import { Dispatch, SetStateAction, useState } from "react"
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../atoms"
import { OuterFormLayout } from "../../../molecules"

import { useQueryClient } from "@tanstack/react-query"
import { t } from "i18next"
import { useMutate } from "../../../../hooks"
import { formatDate } from "../../../../utils/date"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { NationalAddress } from "../../NationalAddress"
import {
  Documents,
  allDocs_TP,
} from "../../reusableComponants/documents/Documents"
import { CompanyMainData } from "./CompanyMainData"
import {
  InitialValues_TP,
  companyValidatingSchema,
} from "./validation-and-types-comapny"
import { CompanyDetails_TP } from "../partners/ViewCompanyDetails"
///
/////////// Types
///

type EditCompany_TP = {
  values: CompanyDetails_TP
  setEditCompanyOpen: Dispatch<SetStateAction<boolean>>
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const EditCompany = ({ values, setEditCompanyOpen }: EditCompany_TP) => {
  console.log(
    "🚀 ~ file: EditCompany.tsx:36 ~ EditCompany ~ values:",
    values.document
  )

  const docs = values.document.map((item) => item.data)
  console.log("🚀 ~ file: EditCompany.tsx:39 ~ EditCompany ~ docs:", docs)
  /////////// VARIABLES
  ///
  const initialValues: InitialValues_TP = {
    name_ar: "" || values.name,
    name_en: "" || values.name,
    country_id: "" || values.country,
    city_id: "" || values.city,
    district_id: "" || values.district,
    address: "" || values.address,
    establishment_date: new Date() || values.establishmentDate,
    phone: "" || values.phone,
    email: "" || values.email,
    fax: "" || values.fax,
    tax_number: "" || values.tax_number,
    logo: [] || values.logo,

    // docs data initial values
    docType: "",
    docName: "",
    docNumber: "",
    endDate: new Date(),
    reminder: "",
    files: [],

    //national Address
    building_number: "" || values.nationalAddress.building_number,
    // address: "" || values.nationalAddress.address,
    street_number: "" || values.nationalAddress.street_number,
    sub_number: "" || values.nationalAddress.sub_number,
    zip_code: "" || values.nationalAddress.zip_code,
  }

  ///
  /////////// CUSTOM HOOKS
  ///
  const queryClient = useQueryClient()
  const {
    mutate,
    error: errorQuery,
    isLoading,
  } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data) => {
      queryClient.setQueryData(["viewCompany"], () => {
        return [data]
      })
      setEditCompanyOpen(false)
      notify("success")
    },
    onError: (error) => {
      console.log(
        "🚀 ~ file: EmployeeCard.tsx:46 ~ EmployeeCard ~ error:",
        error
      )
      notify("error")
    },
  })
  ///
  /////////// STATES
  ///
  const [docsFormValues, setDocsFormValues] = useState<allDocs_TP[]>([...values.document,])
  const [docData, setDocData] = useState<allDocs_TP[]>([])

  console.log(
    "🚀 ~ file: EditCompany.tsx:97 ~ EditCompany ~ docsFormValues:",
    docsFormValues
  )

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///
  // const filesData = docsFormValues.map((el) => el.files)

  const updateHandler = (values: InitialValues_TP) => {
    const editedValues = {
      name_en: values.name_en,
      name_ar: values.name_ar,
      address: values.address,
      city_id: values.city_id,
      country_id: values.country_id,
      district_id: values.district_id,
      email: values.email,
      establishment_date: formatDate(values.establishment_date),
      fax: values.fax,
      logo: values.logo[0],
      tax_number: values.tax_number,
      // endDate: formatDate(values.document.endDate),
      
      phone: values.phone,
      nationalAddress: {
        address: values.address,
        city_id: values.city_id,
        district_id: values.district_id,
        building_number: values.building_number,
        street_number: values.street_number,
        sub_number: values.sub_number,
        zip_code: values.zip_code,
      },
      document: docsFormValues,
      _method: "PUT",
    }
    console.log(
      "🚀 ~ file: EditCompany.tsx:107 ~ updateHandler ~ editedValues:",
      editedValues
    )

    mutate({
      endpointName: `companySettings/api/v1/companies/1`,
      values: editedValues,
      method: "post",
      dataType: "formData",
    })
  }

  ///
  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={companyValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          updateHandler(values)
          console.log({ ...values, ...docsFormValues })
        }}
      >
        <Form>
          <HandleBackErrors errors={errorQuery?.response.data.errors}>
            <OuterFormLayout
              header={`${t("edit company")}`}
              submitComponent={
                <Button
                  type="submit"
                  className="mr-auto mt-8"
                  loading={isLoading}
                >
                  {t("submit")}
                </Button>
              }
            >
              <CompanyMainData />
              <Documents
                docsFormValues={docsFormValues}
                setDocsFormValues={setDocsFormValues}
              />
              <NationalAddress />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </>
  )
}
