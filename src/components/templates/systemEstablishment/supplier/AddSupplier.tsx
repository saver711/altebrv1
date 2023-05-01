/////////// IMPORTS
///
//import classes from './AddEmployee.module.css'
import { Form, Formik } from "formik"
import { t } from "i18next"
import { Dispatch, SetStateAction, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { useFetch, useMutate } from "../../../../hooks"
import { supplier } from "../../../../pages/suppliers/AllSuppliers"
import { Email_TP } from "../../../../types"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../atoms"
import { OuterFormLayout } from "../../../molecules"
import { Loading } from "../../../organisms/Loading"
import { NationalAddress } from "../../NationalAddress"
import {
    allDocs_TP, Documents
} from "../../reusableComponants/documents/Documents"
import { SupplierMainData } from "./SupplierMainData"
import { supplierValidatingSchema } from "./validation-and-types"
///
/////////// Types
///
type AddSupplierProps_TP = {
  title: string
  editData?: supplier
  setDataSource?: Dispatch<SetStateAction<supplier[]>>
  setShow?: Dispatch<SetStateAction<boolean>>
}

/////////// HELPER VARIABLES & FUNCTIONS
///
///
const AddSupplier = ({
  title,
  editData,
  setDataSource,
  setShow,
}: AddSupplierProps_TP) => {
  /////////// VARIABLES

  const initialValues = {
    // supplier data
    name: editData ? editData.name : "",
    type: editData ? editData.type : "local",
    is_mediator: editData ? editData.is_mediator : true,
    gold_tax: editData
      ? editData.tax === "gold" || "gold_and_wages"
        ? true
        : false
      : true,
    // gold
    wages_tax: editData
      ? editData.tax === "gold_and_wages"
        ? true
        : false
      : false,
    company_name: editData ? editData.company_name : "",
    country_id: editData ? editData.country_id : "",
    city_id: editData ? editData.city_id : "",
    address: editData ? editData.address : "",
    mobile: "",
    phone: editData ? editData.phone : "",
    fax: editData ? editData.fax : "",
    email: editData ? editData.email : ("" as Email_TP),
    password: "",
    nationality_id: editData ? editData.nationality_id : "",
    national_number: editData ? editData.national_number : "",
    national_expire_date: new Date(),
    logo:[],
    // national address data
    district_id: editData ? editData?.nationalAddress?.district?.id : "",
    min_Address: "",
    building_number: editData ? editData?.nationalAddress?.building_number : "",
    street_number: editData ? editData?.nationalAddress?.street_number : "",
    sub_number: editData ? editData?.nationalAddress?.sub_number : "",
    zip_code: editData ? editData?.nationalAddress?.zip_code : "",
  }
  ///
  console.log("editData", editData)
  ///
  /////////// CUSTOM HOOKS
  ///

  const {
    data: checkOperations,
    isLoading: checkOperationsLoading,
    refetch: checkOperationsTitles,
    failureReason: checkOperationsErrorReason,
  } = useFetch<{ status: "" }>({
    endpoint: "/supplier/api/v1/check",
    queryKey: ["checkOperations"],
  })

  const { mutate, isLoading, error } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data) => {
      notify("success")
      if (setDataSource && setShow && !editData && !error) {
        setDataSource((prev: any) => [...prev, data])
        setShow(false)
      }
      if (setDataSource && setShow && editData && !error) {
        setShow(false)
        setDataSource((prev: any) =>
          prev.map((p: supplier) => (p.id === data?.id ? data : p))
        )
      }
    },
    onError: (error) => {
      console.log(error)
    },
  })
  ///
  /////////// STATES
  ///
  const [docsFormValues, setDocsFormValues] = useState<allDocs_TP[]>([])
  const navigate = useNavigate()

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  if (checkOperationsLoading)
    return (
      <Loading
        mainTitle={`${t("loading")}`}
        subTitle="checking accounts operations"
      />
    )
  if (!checkOperations?.status)
    return (
      <div className="h-screen flex justify-center items-center  bg-flatWhite ">
        <h2
          className="font-bold text-2xl p-8 rounded-lg bg-mainGreen text-white cursor-pointer"
          onClick={() => navigate("/operation")}
        >
          please complete accounts operations first click to complete the
          operation
        </h2>
      </div>
    )
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
        
          const tax =
            values.gold_tax && values.wages_tax
              ? "gold_and_wages"
              : values.gold_tax
              ? "gold"
              : values.wages_tax
              ? "wages"
              : "no"

          const is_mediator = values.is_mediator ? 1 : 0
          const editedVals = {
            ...values,
            document: docsFormValues,
            tax,
            is_mediator,
            logo: values.logo[0],
            // _method: "put",
            nationalAddress: {
              city_id: values.city_id,
              district_id: values.district_id,
              building_number: values.building_number,
              address: values.address,
              street_number: values.street_number,
              sub_number: values.sub_number,
              zip_code: values.zip_code,
            },
          }
          console.log("editedVals=>", editedVals)

          mutate({
            endpointName: editData
              ? `supplier/api/v1/suppliers/${editData.id}`
              : "supplier/api/v1/suppliers",
            values: { ...editedVals, ...(editData && { _method: "put" }) },
            dataType: "formData",
            method: "post",
          })
          //    mutate({
          //     endpointName: editData
          //       ? `supplier/api/v1/suppliers/${editData.id}`
          //       : "supplier/api/v1/suppliers",
          //     values: editedVals,
          //     ...(editData && { _method: "put" }),
          //     dataType: "formData",
          //     method: "post",
          //   })
          // }}
        }}
        validationSchema={() => supplierValidatingSchema()}
      >
        <Form>
          <HandleBackErrors errors={error?.response?.data?.errors}>
            <OuterFormLayout
              header={`${t("add supplier")}`}
              submitComponent={
                <Button
                  type="submit"
                  className="ms-auto mt-8"
                  loading={isLoading}
                >
                  {t("submit")}
                </Button>
              }
            >
              <SupplierMainData
                editData={editData}
                title={`${t("main data")}`}
              />
              <Documents
                editData={editData}
                setDocsFormValues={setDocsFormValues}
                docsFormValues={docsFormValues}
              />
              <NationalAddress editData={editData} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </>
  )
}

export default AddSupplier
