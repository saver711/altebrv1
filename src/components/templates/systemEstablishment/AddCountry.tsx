/////////// IMPORTS
///
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import * as Yup from "yup"
import { useIsRTL, useMutate } from "../../../hooks"
import { requiredTranslation } from "../../../utils/helpers"
import { mutateData } from "../../../utils/mutateData"
import { notify } from "../../../utils/toast"
import { HandleBackErrors } from "../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../atoms"
import {
  BaseInputField,
  InnerFormLayout,
  OuterFormLayout,
} from "../../molecules"
import { Dispatch, SetStateAction } from "react"
import { ViewCountries_TP } from "./view/ViewCountries"

///
/////////// Types
///
type InitialValues_TP = {
  name_ar: string
  name_en: string
}

type AddCountriesProps_TP = {
  editData?: ViewCountries_TP
  setDataSource?: Dispatch<SetStateAction<ViewCountries_TP[]>>
  setShow?: Dispatch<SetStateAction<boolean>>
}
type CountryType = { name_en: string; name_ar: string; id: string }

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddCountry = ({
  editData,
  setDataSource,
  setShow,
}: AddCountriesProps_TP) => {
  /////////// VARIABLES
  ///
  const isRTL = useIsRTL()
  const initialValues: InitialValues_TP = {
    name_ar: editData ? editData?.name_ar : "",
    name_en: editData ? editData?.name_en : "",
  }

  const countryValidatingSchema = Yup.object({
    name_ar: Yup.string().trim().required(requiredTranslation),
    name_en: Yup.string().trim().required(requiredTranslation),
  })
  ///
  /////////// CUSTOM HOOKS
  ///
console.log("co",initialValues)

  const queryClient = useQueryClient()
  const {
    mutate,
    error: errorQuery,
    isLoading,
  } = useMutate<CountryType>({
    mutationFn: mutateData,
    onSuccess: (data) => {
      notify("success")
      if (data) {
        queryClient.setQueryData(["countries"], (old: any) => {
          return [
            ...(old || []),
            {
              id: crypto.randomUUID(),
              name: isRTL ? data.name_ar : data.name_en,
            },
          ]
        })
      }
      if (setDataSource && setShow && !editData && !errorQuery) {
        // setDataSource((prev: any) => [...prev, data])
        queryClient.refetchQueries(['AllCountries'])
        setShow(false)
      }
      if (setDataSource && setShow && editData && !errorQuery) {
        setShow(false)
        queryClient.refetchQueries(['AllCountries'])
        // setDataSource((prev: any) =>
        //   prev.map((p: ViewCountries_TP) => (p.id === data?.id ? data : p))
        // )
      }
    },
    onError: (error) => {
      console.log(error)
      notify("error")
    },
  })
  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///
  function PostNewValue(values: InitialValues_TP) {
console.log("co", values)

    mutate({
      endpointName: editData
        ? `/governorate/api/v1/countries/${editData.id}`
        : "governorate/api/v1/countries",
      values: {
        name_ar: values.name_ar,
        name_en: values.name_en,
        ...(editData && { _method: "put" }),
      },
      method: "post",
    })
  }
  ///
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={countryValidatingSchema}
        onSubmit={(values) => {
          PostNewValue(values)
        }}
      >
        <HandleBackErrors errors={errorQuery?.response.data.errors}>
          <Form>
            <OuterFormLayout
              header={`${t("add Country")}`}
              submitComponent={
                <Button
                  type="submit"
                  loading={isLoading}
                  className="mr-auto mt-8"
                >
                  {t("submit")}
                </Button>
              }
            >
              <InnerFormLayout title={"البيانات الاساسية"}>
                <BaseInputField
                  id="Country_name"
                  label={`${t("Country name arabic")}`}
                  name="name_ar"
                  type="text"
                  placeholder={`${t("Country name arabic")}`}
                  labelProps={{ className: "mb-1" }}
                  required
                />
                <BaseInputField
                  id="Country_name"
                  label={`${t("Country name english")}`}
                  name="name_en"
                  type="text"
                  placeholder={`${t("Country name english")}`}
                  labelProps={{ className: "mb-1" }}
                  required
                />
              </InnerFormLayout>
            </OuterFormLayout>
          </Form>
        </HandleBackErrors>
      </Formik>
    </>
  )
}
