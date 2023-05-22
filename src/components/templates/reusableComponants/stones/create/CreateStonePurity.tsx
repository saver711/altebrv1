///
/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import { Dispatch, SetStateAction } from "react"
import * as Yup from "yup"
import { useMutate } from "../../../../../hooks"
import { mutateData } from "../../../../../utils/mutateData"
import { notify } from "../../../../../utils/toast"
import { HandleBackErrors } from "../../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../../atoms"
import {
  BaseInputField,
  InnerFormLayout,
  OuterFormLayout,
} from "../../../../molecules"
import { StonesPurities } from "../view/ViewStonePurity"
import { StonePurityMainData } from "./StonePurityMainData"

///
/////////// Types
///
type CreateStonePurity_TP = {
  item?: StonesPurities
  value?: string
  onAdd?: (value: string) => void
  setDataSource?: Dispatch<SetStateAction<StonesPurities[]>>
  setShow?: Dispatch<SetStateAction<boolean>>
  title?: string
}

type InitialValues_TP = {
  name: string
}

const requiredTranslation = () => `${t("required")}`
const validationSchema = Yup.object({
  name: Yup.string().required(requiredTranslation),
})

const CreateStonePurity = ({
  item,
  value='',
  onAdd,
  setDataSource,
  setShow,
  title,
}: CreateStonePurity_TP) => {
  ///
  /////////// HELPER VARIABLES & FUNCTIONS
  ///
  const initialValues: InitialValues_TP = {
    name: value!,
  }
  ///
  /////////// CUSTOM HOOKS
  ///
  const queryClient = useQueryClient()
  const { mutate, isLoading, error, isSuccess , reset } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data: any) => {
      notify("success")
      queryClient.setQueryData(["stone_purity"], (old: any) => {
        return [...old || [], data]
      })
      if (value && onAdd) {
        onAdd(value)
        queryClient.refetchQueries(["view_stones_purities"])
      }
      if (setDataSource && setShow) {
        // setDataSource((prev: StonesPurities[])=> [...prev, data])
        queryClient.refetchQueries(["view_stones_purities"])
        setShow(false)
      }
      if (setDataSource && setShow && item) {
        setShow(false)
        queryClient.refetchQueries(["view_stones_purities"])
        // setDataSource((prev: StonesPurities[]) =>
        //   prev.map((p: StonesPurities) => p.id === data.id ? data : p))
      }
    },
  })

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  function PostNewValue(values: InitialValues_TP) {
    mutate({
      endpointName: item
        ? `stones/api/v1/purities/${item.id}`
        : "stones/api/v1/purities",
      method: item ? "put" : "post",
      values,
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => PostNewValue(values)}
      validationSchema={validationSchema}
    >
      <Form>
        <HandleBackErrors errors={error?.response?.data?.errors}>
          <StonePurityMainData
            editData={item}
            title={title}
            isSuccessPost={isSuccess}
            resetData={reset}
            isLoading={isLoading}
          />
        </HandleBackErrors>
      </Form>
    </Formik>
  )
}

export default CreateStonePurity
