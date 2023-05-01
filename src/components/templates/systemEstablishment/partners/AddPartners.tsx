/////////// IMPORTS
///
import { Form, Formik } from "formik"
import { t } from "i18next"
import { useState } from "react"
import { useFetch, useMutate } from "../../../../hooks"
import { formatDate } from "../../../../utils/date"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../atoms"
import { OuterFormLayout } from "../../../molecules"
import { PartnerMainData } from "./PartnerMainData"
import {
  InitialValues_TP,
  partnerValidatingSchema,
} from "./validation-and-types-partner"
import { Documents } from "../../reusableComponants/documents/Documents"
import { useQueryClient } from "@tanstack/react-query"
import { Loading } from "../../../organisms/Loading"
import { useNavigate } from "react-router-dom"
import { NationalAddress } from "../../NationalAddress"
///
/////////// Types
///
type AddPartners_props = {
  title: string
  dataSource?: any
  editData?: any
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddPartners = ({
  title,
  dataSource,
  editData,
}: AddPartners_props) => {
  console.log(
    "🚀 ~ file: AddPartners.tsx:27 ~ AddPartners ~ editData:",
    editData
  )

  /////////// VARIABLES
  ///
  const initialValues: InitialValues_TP = {
    name: "" || editData?.name,
    email: "" || editData?.email,
    phone: "" || editData?.phone,
    end_date: new Date() || editData?.end_date,
    start_date: new Date() || editData?.start_date,
    city_id: "" || editData?.city_id,
    country_id: "" || editData?.country_id,
    nationality_name: "" || editData?.nationality_name,
    nationality_id: "" || editData?.nationality_id,
    national_image: [],
    address: "",
    // document type
    docType: "",
    docName: "",
    docNumber: "",
    endDate: new Date(),
    reminder: "",
    files: [],

    // national address
    building_number: "",
    district_id: "",
    street_number: "",
    sub_number: "",
    zip_code: "",
  }
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const [docsFormValues, setDocsFormValues] = useState<InitialValues_TP[]>([])

  const {
    data: checkOperations,
    isLoading: checkOperationsLoading,
    refetch: checkOperationsTitles,
    failureReason: checkOperationsErrorReason,
  } = useFetch<{ status: string }>({
    endpoint: "partner/api/v1/check",
    queryKey: ["checkSupplier"],
  })
    console.log("🚀 ~ file: AddPartners.tsx:93 ~ checkOperations:", checkOperations)


  const navigate = useNavigate()

  ///
  /////////// SIDE EFFECTS
  ///
  const {
    mutate,
    isLoading,
    error: errorQuery,
  } = useMutate({
    mutationFn: mutateData,
    onSuccess: () => {
      notify("success")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const queryClient = useQueryClient()

  const { mutate: Edit, isLoading: editLoading } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data) => {
      queryClient.setQueryData([`partners`], () => {
        return [data]
      })
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
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///
  const updateHandler = (values: InitialValues_TP) => {
    const editedValues = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      city_id: values.city_id,
      country_id: values.country_id,
      nationality_name: values.nationality_name,
      nationality_id: values.nationality_id,
      end_date: formatDate(values.end_date),
      start_date: formatDate(values.start_date),
      national_image: values.national_image[0],
      building_number: values.building_number,

      district_id: values.district_id,
      street_number: values.street_number,
      sub_number: values.sub_number,
      zip_code: values.zip_code,
      document: [docsFormValues],
      _method: "put",
    }
    console.log(
      "🚀 ~ file: EditCompany.tsx:107 ~ updateHandler ~ editedValues:",
      editedValues
    )

    Edit({
      endpointName: `partner/api/v1/partners/${editData.id}`,
      values: editedValues,
      method: "post",
      dataType: "formData",
    })
  }

  function PostNewValue(values: InitialValues_TP) {
    mutate({
      endpointName: "partner/api/v1/partners",
      values: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        city_id: values.city_id,
        country_id: values.country_id,
        nationality_name: values.nationality_name,
        nationality_id: values.nationality_id,
        end_date: formatDate(values.end_date),
        start_date: formatDate(values.start_date),
        national_image: values.national_image[0],
        building_number: values.building_number,

        address: values.address,
        district_id: values.district_id,
        street_number: values.street_number,
        sub_number: values.sub_number,
        zip_code: values.zip_code,
        document: { document : docsFormValues },
      },
      dataType: "formData",
    })
  }
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
          onClick={() => navigate("/testSystem")}
        >
          please complete accounts operations first click to complete the
          operation{" "}
        </h2>
      </div>
    )
  ///
  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={partnerValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          console.log("partners values ", { ...values, ...[docsFormValues] })
          PostNewValue(values)
        }}
      >
        <Form>
          <HandleBackErrors errors={errorQuery?.response.data.errors}>
            <OuterFormLayout
              header={title}
              submitComponent={
                <Button
                  type="submit"
                  className="mr-auto mt-8"
                  loading={isLoading || editLoading}
                >
                  {t("submit")}
                </Button>
              }
            >
              <PartnerMainData />
              <Documents
                setDocsFormValues={setDocsFormValues}
                docsFormValues={docsFormValues}
              />
              <NationalAddress />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </>
  )
}
