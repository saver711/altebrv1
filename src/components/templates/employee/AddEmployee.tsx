/////////// IMPORTS
///
//import classes from './AddEmployee.module.css'
import { Form, Formik } from "formik"
import { t } from "i18next"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { EmployeeMainData, NationalAddress } from ".."
import { useMutate } from "../../../hooks"
import { formatDate, getDayBefore } from "../../../utils/date"
import { mutateData } from "../../../utils/mutateData"
import { notify } from "../../../utils/toast"
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../atoms"
import { OuterFormLayout } from "../../molecules"

import { allDocs_TP, Documents } from "../reusableComponants/documents/Documents"
import { Email_TP, InitialValues_TP } from "./validation-and-types"
///
/////////// Types
///
type AddEmployeeProps_TP = {
  title: string
  editEmployeeData:InitialValues_TP | undefined
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddEmployee = ({ title , editEmployeeData }: AddEmployeeProps_TP) => {
console.log("🚀 ~ file: AddEmployee.tsx:33 ~ AddEmployee ~ editEmployeeData:", editEmployeeData)


  /////////// VARIABLES
  ///
   /////////// STATES
  ///
  const [docsFormValues, setDocsFormValues] = useState<allDocs_TP[]>([])
  ///
  const initialValues: InitialValues_TP = {
    // employee main data initial values
    name: editEmployeeData?.name ||  "",
    phone: editEmployeeData?.phone ||  "",
    mobile: editEmployeeData?.mobile || "",
    username: editEmployeeData?.username || "",
    is_active:editEmployeeData?.is_active ? 'Yes' : "No" || "Yes",
    city_id: editEmployeeData?.city_id || "",
    nationality_id:editEmployeeData?.nationality_id || "",
    country_id: editEmployeeData?.country_id ||"",
    role_id: "",
    date_of_birth: !!editEmployeeData ? new Date(editEmployeeData?.date_of_birth) : new Date(),
    branch_id:editEmployeeData?.branch_id || "",
    national_number:editEmployeeData?.national_number || "",
    national_expire_date:  new Date(),
    national_image: [],
    address:editEmployeeData?.address || "",
    image: [],
    email: editEmployeeData?.email || "" as Email_TP,
    // not required ↓↓↓
    date_of_hiring:new Date(),
    password:editEmployeeData?.password || "",  // national address initial values
    district_id:editEmployeeData?.district_id || "",
    min_Address:editEmployeeData?.min_Address || "", // review backend
    building_number:editEmployeeData?.nationalAddress?.street_number  || "",
    street_number: editEmployeeData?.nationalAddress?.street_number || "",
    sub_number:editEmployeeData?.nationalAddress?.sub_number || "",
    zip_code:editEmployeeData?.nationalAddress?.zip_code || "",
    min_address:editEmployeeData?.nationalAddress?.address || "",
    // docs data initial values
  }
  

  ///
  /////////// CUSTOM HOOKS
  ///
  const { mutate, isLoading, error } = useMutate({
    mutationFn: mutateData,
    onSuccess: () => {
      notify("success")
    },
    onError: (error) => {
      console.log(error)
    }
  })
  ///
 
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const document = docsFormValues.map(({ id, ...rest }) => ({
            ...rest,
            docType: rest.docType.id,
          }))
          const editedValues = {
            ...values,
            image: values.image[0],
            national_image: values.national_image[0],
            is_active: values.is_active === "No" ? 0 : 1,
            national_expire_date: formatDate(values.national_expire_date),
            date_of_birth: formatDate(getDayBefore(values.date_of_birth)),
            document,
          }
          mutate({
            endpointName: "employee/api/v1/employees",
            values: editedValues,
            dataType: "formData",
          })
        }}
        //validationSchema={() => employeeValidatingSchema()}
      >
        <Form>
          <HandleBackErrors errors={error?.response?.data?.errors}>
            <OuterFormLayout
              header={`${t("add employee")}`}
              submitComponent={
                <Button type="submit" className="ms-auto mt-8" loading={isLoading}>
                  {t("submit")}
                </Button>
              }
            >
              <EmployeeMainData title={`${t("main data")}`} editEmployeeData={editEmployeeData}/>
              <NationalAddress />
              <Documents
                docsFormValues={docsFormValues}
                setDocsFormValues={setDocsFormValues}
              />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </>
  )
}
