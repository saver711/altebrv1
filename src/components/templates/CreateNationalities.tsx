/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import * as Yup from "yup"
import { useIsRTL, useMutate } from "../../hooks"
import { mutateData } from "../../utils/mutateData"
import { notify } from "../../utils/toast"
import { HandleBackErrors } from "../../utils/utils-components/HandleBackErrors"
import { Button } from "../atoms"
import { BaseInputField, InnerFormLayout, OuterFormLayout } from "../molecules"
import { ViewNationalities_TP } from "./systemEstablishment/view/ViewNationalities"
import { Dispatch, SetStateAction } from "react"

///
/////////// Types
///
type CreateNationalitiesProps_TP = {
  value?: string
  onAdd?: (value: string) => void
  editData?: ViewNationalities_TP
  setDataSource?: Dispatch<SetStateAction<ViewNationalities_TP[]>>
  setShow?: Dispatch<SetStateAction<boolean>>
  title?: string
}

type InitialValues_TP = {
  [x: string]: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const CreateNationalities = ({
  value,
  onAdd,
  editData,
  setDataSource,
  setShow,
  title,
}: CreateNationalitiesProps_TP) => {
  /////////// VARIABLES
  ///

  const isRTL = useIsRTL()
  const initialValues: InitialValues_TP = {
    name_en: editData ? editData.name_en : !isRTL ? value! : "",
    name_ar: editData ? editData.name_ar : isRTL ? value! : "",
  }
  const validationSchema = Yup.object({
    name_ar: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    name_en: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
  })

  /////////// STATES
  ///
  ///
  /////////// CUSTOM HOOKS
  ///
  const queryClient = useQueryClient()

  const {
    mutate,
    error: errorQuery,
    isLoading,
  } = useMutate<ViewNationalities_TP>({
    mutationFn: mutateData,
    onSuccess: (data) => {
      notify("success")
      queryClient.setQueryData(["nationalities"], (old: any) => {
        return [...(old || []), data]
      })
      if (value && onAdd) {
        onAdd(value)
      }
      if (setDataSource && setShow && !editData && !errorQuery) {
        // setDataSource((prev: any) => [...prev, data])
        queryClient.refetchQueries(["AllNationalities"])
        // setShow(false)
      }
      if (setDataSource && setShow && editData && !errorQuery) {
        // setShow(false)
        queryClient.refetchQueries(["AllNationalities"])
        // setDataSource((prev: any) =>
        //   prev.map((p: ViewNationalities_TP) => (p.id === data?.id ? data : p))
        // )
      }
    },
    onError: (error) => {
      console.log(error)
      notify("error")
    },
  })
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  function PostNewValue(values: InitialValues_TP) {
    mutate({
      endpointName: editData
        ? `/governorate/api/v1/nationalities/${editData.id}`
        : `/governorate/api/v1/nationalities`,
      values: {
        name_en: values.name_en,
        name_ar: values.name_ar,
        ...(editData && { _method: "put" }),
      },
      method: "post",
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

          <Form className="w-full">
          <HandleBackErrors errors={errorQuery?.response?.data?.errors}>
                    <OuterFormLayout
          header={title}
          submitComponent={
            <Button type="submit" loading={isLoading} className="ms-auto mt-8">
              {t("submit")}
            </Button>
          }
        >
              <>
                <InnerFormLayout title={`${t("nationalities")}`}>
                  {/* nationality ar  start */}
                  <BaseInputField
                    id="name_ar"
                    label={`${t("nationality in arabic")}`}
                    name="name_ar"
                    type="text"
                    placeholder={`${t("nationality in arabic")}`}
                    defaultValue={editData ? editData.name : ""}
                    // value={value}
                  />
                  {/* nationality ar  end */}

                  {/* nationality en  start */}
                  <BaseInputField
                    id="name_en"
                    label={`${t("nationality in english")}`}
                    name="name_en"
                    type="text"
                    placeholder={`${t("nationality in english")}`}
                    // value={value}
                  />
                  {/* nationality en  end */}
                </InnerFormLayout>
              </>
        </OuterFormLayout>
            </HandleBackErrors>
          </Form>
      </Formik>
    </div>
  )
}
