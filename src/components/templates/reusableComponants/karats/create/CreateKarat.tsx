/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import { Dispatch, SetStateAction } from "react"
import * as Yup from "yup"
import { useMutate } from "../../../../../hooks"
import { requiredTranslation } from "../../../../../utils/helpers"
import { mutateData } from "../../../../../utils/mutateData"
import { notify } from "../../../../../utils/toast"
import { HandleBackErrors } from "../../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../../atoms"
import { BaseInputField } from "../../../../molecules/formik-fields/BaseInputField"
import { ViewKarats_TP } from "../../../systemEstablishment/view/Viewkarats"

///
/////////// Types
///
type CreateKaratProps_TP = {
  value?: string
  onAdd?: (value: string) => void
  editData?: ViewKarats_TP
  setDataSource?: Dispatch<SetStateAction<ViewKarats_TP[]>>
  setShow?: Dispatch<SetStateAction<boolean>>
}

type InitialValues_TP = {
  name: string
  equivalent: number
}

const karatsRateMax = () => `${t("karats rate max is 1")}`
const validationSchema = Yup.object({
  name: Yup.string().required(requiredTranslation),
  equivalent: Yup.number().min(0.1, requiredTranslation).max(1, karatsRateMax),
})

const CreateKarat = ({
  value,
  onAdd,
  editData,
  setDataSource,
  setShow,
}: CreateKaratProps_TP) => {
  ///
  /////////// HELPER VARIABLES & FUNCTIONS
  ///
  const initialValues: InitialValues_TP = {
    name: editData ? editData.name : value!,
    equivalent: editData ? editData.equivalent : 0,
  }
  ///
  /////////// CUSTOM HOOKS
  ///
  const queryClient = useQueryClient()
  const { mutate, isLoading, error } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data) => {
      notify("success")
      if (value && onAdd) {
        onAdd(value)
        queryClient.setQueryData(["karats"], (old: any) => {
          return [...old, data]
        })
      }
      if (setDataSource && setShow && !editData && !error) {
        setDataSource((prev: any) => [...prev, data])
        setShow(false)
      }
      if (setDataSource && setShow && editData && !error) {
        setShow(false)
        setDataSource((prev: any) =>
          prev.map((p: ViewKarats_TP) => (p.id === data?.id ? data : p))
        )
      }
    },
  })

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  function PostNewValue(values: InitialValues_TP) {
    mutate({
      endpointName: editData
        ? `classification/api/v1/karats/${editData.id}`
        : `classification/api/v1/karats`,
      values: {
        name: values.name,
        equivalent: values.equivalent,
        ...(editData && { _method: "put" }),
      },
      method: "post",
    })
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => PostNewValue(values)}
        validationSchema={validationSchema}
      >
        <Form className="w-full">
          <HandleBackErrors errors={error?.response?.data?.errors}>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-4">{t("karats")}</h2>
              <div className="grid grid-cols-4 mb-4 gap-3 text-start">
                <BaseInputField
                  id="karats_number"
                  label={`${t("karats number")}`}
                  name="name"
                  type="text"
                  placeholder={`${t("karats number")}`}
                />
                <BaseInputField
                  id="karats_equivalent"
                  label={`${t("karats rate")}`}
                  name="equivalent"
                  type="number"
                  placeholder={`${t("karats rate")}`}
                />
              </div>
              <Button type="submit" className="self-end" loading={isLoading}>
                {t("submit")}
              </Button>
            </div>
          </HandleBackErrors>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateKarat
