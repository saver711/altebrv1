/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import { Dispatch, SetStateAction } from "react"
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
import { Country_city_distract_markets } from "../reusableComponants/Country_city_distract_markets"
import { ViewCities_TP } from "./view/ViewCities"

///
/////////// Types
///
type InitialValues_TP = {
  name_ar: string
  name_en: string
  country_id: string
}

type CitiesType = {
  name_en: string
  name_ar: string
  id: string
  country_id: string
  country_name: string
}
type AddCitiesProps_TP = {
  editData?: ViewCities_TP
  setDataSource?: Dispatch<SetStateAction<ViewCities_TP[]>>
  setShow?: Dispatch<SetStateAction<boolean>>
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddCities = ({
  editData,
  setDataSource,
  setShow,
}: AddCitiesProps_TP) => {
  /////////// VARIABLES
  ///

  const isRTL = useIsRTL()

  const initialValues: InitialValues_TP = {
    name_ar: editData ? editData?.name_ar : "",
    name_en: editData ? editData?.name_en : "",
    country_id: editData ? editData.country_id : "",
  }

  const cityValidatingSchema = Yup.object({
    name_ar: Yup.string().trim().required(requiredTranslation),
    name_en: Yup.string().trim().required(requiredTranslation),
    country_id: Yup.string().trim().required(requiredTranslation),
  })
  ///
  /////////// CUSTOM HOOKS
  ///

  ///

  const queryClient = useQueryClient()
  const {
    mutate,
    error: errorQuery,
    isLoading,
  } = useMutate<CitiesType>({
    mutationFn: mutateData,
    onSuccess: (data) => {
      notify("success")
      if (data) {
        queryClient.setQueryData(["cities"], (old: any) => {
          return [
            ...(old || []),
            {
              id: data.id,
              name: isRTL ? data.name_ar : data.name_en,
              country_id: data.country_id,
              country_name: data.country_name,
            },
          ]
        })
      }
      if (setDataSource && setShow && !editData && !errorQuery) {
        // setDataSource((prev: any) => [...prev, data])
        queryClient.refetchQueries(['AllCities'])
        setShow(false)
      }
      if (setDataSource && setShow && editData && !errorQuery) {
        setShow(false)
        queryClient.refetchQueries(['AllCities'])
        // setDataSource((prev: any) =>
        //   prev.map((p: ViewCities_TP) => (p.id === data?.id ? data : p))
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
  // const { setFieldValue } =  useFormikContext<FormikSharedConfig>()
  
  ///
  /////////// SIDE EFFECTS
  ///
  
  ///
  /////////// IF CASES
  ///
  
  ///
  /////////// FUNCTIONS & EVENTS
  ///
  
  const handleSubmit = (values: InitialValues_TP) => {
    console.log("cities", values)

    mutate({
      endpointName: editData
        ? `governorate/api/v1/cities/${editData.id}`
        : `governorate/api/v1/cities`,
      values: {
        country_id: values.country_id,
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
      <div className="flex items-center ">
        <Formik
          initialValues={initialValues}
          validationSchema={cityValidatingSchema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          <HandleBackErrors errors={errorQuery?.response.data.errors}>
            <Form className="w-full">
              <OuterFormLayout
                submitComponent={
                  <Button
                    type="submit"
                    loading={isLoading}
                    className="ms-auto mt-8"
                  >
                    {t("submit")}
                  </Button>
                }
              >
                <InnerFormLayout title={`${t("city")}`}>
                  <Country_city_distract_markets
                    countryName="country_id"
                    editData={editData}
                  />
                  <BaseInputField
                    id="name_ar"
                    label={`${t("city name arabic")}`}
                    name="name_ar"
                    type="text"
                    placeholder={`${t("city name arabic")}`}
                    required
                  />
                  <BaseInputField
                    id="name_en"
                    label={`${t("city name english")}`}
                    name="name_en"
                    type="text"
                    placeholder={`${t("city name english")}`}
                    labelProps={{ className: "mb-1" }}
                    required
                  />
                </InnerFormLayout>
              </OuterFormLayout>
            </Form>
          </HandleBackErrors>
        </Formik>
      </div>
    </>
  )
}
