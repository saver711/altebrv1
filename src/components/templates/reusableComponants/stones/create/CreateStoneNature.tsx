/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import { Dispatch, SetStateAction } from "react"
import * as Yup from "yup"
import { useIsRTL, useMutate } from "../../../../../hooks"
import { mutateData } from "../../../../../utils/mutateData"
import { notify } from "../../../../../utils/toast"
import { HandleBackErrors } from "../../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../../atoms"
import { BaseInputField } from "../../../../molecules/formik-fields/BaseInputField"
import { StonesNatures } from "../view/ViewStoneNature"
import { InnerFormLayout, OuterFormLayout } from "../../../../molecules"

///
/////////// Types
///
type CreateStoneNatureProps_TP = {
  item?: StonesNatures
  value?: string
  onAdd?: (value: string) => void
  setDataSource?: Dispatch<SetStateAction<StonesNatures[]>>
  setShow?: Dispatch<SetStateAction<boolean>>
  title?: string
}

type InitialValues_TP = {
  [x: string]: string
}

const requiredTranslation = () => `${t("required")}`
const validationSchema = Yup.object({
  name_en: Yup.string().trim().required(requiredTranslation),
  name_ar: Yup.string().trim().required(requiredTranslation),
})

const CreateStoneNature = ({
  item,
  value,
  onAdd,
  setDataSource,
  setShow,
  title,
}: CreateStoneNatureProps_TP) => {
  ///
  /////////// HELPER VARIABLES & FUNCTIONS
  ///
  const isRTL = useIsRTL()
  const initialValues: InitialValues_TP = {
    name_en: item ? item.name_en : !isRTL ? value! : "",
    name_ar: item ? item.name_ar : isRTL ? value! : "",
  }
  ///
  /////////// CUSTOM HOOKS
  ///
  const queryClient = useQueryClient()
  const { mutate, isLoading, error } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data: any) => {
      notify("success")
      queryClient.setQueryData(["stone_nature"], (old: any) => {
        return [...old, data]
      })
      if (value && onAdd) {
        onAdd(value)
        queryClient.refetchQueries(["view_stones_natures"])
      }
      if (setDataSource && setShow && !item) {
        // setDataSource((prev: StonesNatures[])=> [...prev, data])
        queryClient.refetchQueries(["view_stones_natures"])
        setShow(false)
      }
      if (setDataSource && setShow && item) {
        setShow(false)
        queryClient.refetchQueries(["view_stones_natures"])
        // setDataSource((prev: StonesNatures[]) =>
        //   prev.map((p: StonesNatures) => p.id === data.id ? data : p))
      }
    },
  })

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  function PostNewValue(values: InitialValues_TP) {
    mutate({
      endpointName: item
        ? `stones/api/v1/natures/${item.id}`
        : "stones/api/v1/natures",
      method: item ? "put" : "post",
      values,
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
            <OuterFormLayout
              header={title}
              submitComponent={
                <Button
                  loading={isLoading}
                  type="submit"
                  className="ms-auto mt-8"
                >
                  {t("submit")}
                </Button>
              }
            >
              <InnerFormLayout title={`${t("main data")}`}>
                <BaseInputField
                  id="stone_nature_ar"
                  label={`${t("stones natures in arabic")}`}
                  name="name_ar"
                  type="text"
                  placeholder={`${t("stones natures in arabic")}`}
                />
                <BaseInputField
                  id="stone_nature_en"
                  label={`${t("stones natures in english")}`}
                  name="name_en"
                  type="text"
                  placeholder={`${t("stones natures in english")}`}
                />
              </InnerFormLayout>
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateStoneNature
