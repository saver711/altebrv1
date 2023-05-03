/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch, useMutate } from "../../../../hooks"
import { formatDate } from "../../../../utils/date"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../atoms"
import { OuterFormLayout } from "../../../molecules"
import { Loading } from "../../../organisms/Loading"
import { NationalAddress } from "../../NationalAddress"
import { Documents } from "../../reusableComponants/documents/Documents"
import { PartnerMainData } from "./PartnerMainData"
import {
  InitialValues_TP,
  partnerValidatingSchema,
} from "./validation-and-types-partner"
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
  setModel,
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
    name: editData?.name || "",
    email: editData?.email || "",
    phone: editData?.phone || "",
    end_date: editData ? new Date(editData?.end_date) : new Date(),
    start_date: editData ? new Date(editData?.start_date) : new Date(),
    x_city: editData?.city?.id || "",
    // city_value: editData?.city?.name || "",
    x_country: editData?.country?.id || "",
    // country_value: editData?.country?.name || "",
    nationality_name: editData?.nationality_name || "",
    nationality_id: editData?.nationality_id || "",
    national_image: !!editData?.national_image
      ? [
          {
            path: editData?.national_image,
            type: "image",
          },
        ]
      : [],
    // document type
    docType: "",
    docName: "",
    docNumber: "",
    endDate: new Date(),
    reminder: "",
    files: [],
    //national Address
    district_id: editData?.nationalAddress?.district.id || "",
    building_number: editData?.nationalAddress?.building_number || "",
    street_number: editData?.nationalAddress?.street_number || "",
    sub_number: editData?.nationalAddress?.sub_number || "",
    zip_code: editData?.nationalAddress?.zip_code || "",
    address: editData?.nationalAddress?.address || "",
  }
  ///
  /////////// CUSTOM HOOKS
  ///
  const incomingData = !!editData
    ? editData!.document.map((item) => ({
        ...item.data,
        endDate: new Date(item.data.endDate),
        files: item?.files || [],
        id: item.id,
      }))
    : []
  ///
  /////////// STATES
  ///
  const [docsFormValues, setDocsFormValues] =
    useState<InitialValues_TP[]>(incomingData)

  const {
    data: checkOperations,
    isLoading: checkOperationsLoading,
    refetch: checkOperationsTitles,
    failureReason: checkOperationsErrorReason,
  } = useFetch<{ status: string }>({
    endpoint: "partner/api/v1/check",
    queryKey: ["checkSupplier"],
  })

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
      setModel(false)
      queryClient.refetchQueries(["partner"])
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const queryClient = useQueryClient()

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
        validationSchema={partnerValidatingSchema}
        onSubmit={(values: InitialValues_TP) => {
          let editedValues = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            end_date: formatDate(values.end_date),
            start_date: formatDate(values.start_date),
            city_id: values.x_city,
            country_id: values.x_country,
            nationality_name: values.nationality_name,
            national_image: values.national_image[0],
            nationality_id: values.nationality_id,
            // district_id: values.district_id,
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
            document: docsFormValues,
          }
          console.log("🚀 ~ file: AddPartners.tsx:262 ~ values:", values)
          if (!!editData) {
            console.log(
              "🚀 ~ file: AddPartners.tsx:262 ~ editedValues:",
              editedValues
            )

            let { document, ...editedValuesWithoutDocument } = editedValues
            if (docsFormValues.length > editData.document.length)
              editedValues = {
                ...editedValues,
                document: editedValues.document.slice(editData.document.length),
              }
            if (docsFormValues.length === editData.document.length)
              editedValues = editedValuesWithoutDocument
            if (
              JSON.stringify(values.national_image[0].path) ===
              JSON.stringify(editData.national_image)
            )
              delete editedValues.national_image
            mutate({
              endpointName: `partner/api/v1/partners/${editData.id}`,
              values: editedValues,
              dataType: "formData",
              editWithFormData: true,
            })
          } else {
            console.log("editedValues=>", editedValues)
            mutate({
              endpointName: "partner/api/v1/partners",
              values: editedValues,
              dataType: "formData",
            })
          }

          // console.log("partners values ", { ...values, ...[docsFormValues] })
        }}
      >
        <Form>
          <HandleBackErrors errors={errorQuery?.response?.data?.errors}>
            <OuterFormLayout
              header={title}
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
              <PartnerMainData editData={editData} />
              <Documents
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