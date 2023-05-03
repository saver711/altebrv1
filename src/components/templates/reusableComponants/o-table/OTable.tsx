import { useQueryClient } from "@tanstack/react-query"
import { Formik } from "formik"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
  GoldTableProperties_TP,
  OTableDataTypes,
  TableHelperValues_TP,
} from "../../../gold-supply/GoldSupplySecondForm"
import { GoldFirstFormInitValues_TP } from "../../../gold-supply/formInitialValues_types"
import { OTableForm } from "./OTableForm"
import * as Yup from "yup"

type OTableProps_TP = {
  data: OTableDataTypes[]
  setData: Dispatch<SetStateAction<OTableDataTypes[]>>
  defaultValues: GoldTableProperties_TP & TableHelperValues_TP
  setEditData: Dispatch<SetStateAction<OTableDataTypes>>
  editData: OTableDataTypes
  formValues: GoldFirstFormInitValues_TP | undefined
  setBoxValues: Dispatch<SetStateAction<OTableDataTypes[]>>
}

const validationSchema = Yup.object({
  category_id: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
  weight: Yup.number().positive('برجاء إدخال وزن صحيح').required("برجاء ملئ هذا الحقل"),
  karat_id: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
  stock: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
  wage: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
})

export function OTable({
  data,
  setData,
  defaultValues,
  setEditData,
  editData,
  formValues,
  setBoxValues,
}: OTableProps_TP) {
  // states
  const [editRow, setEditRow] = useState(false)
  const [categoriesOptions, setCategoriesOptions] = useState([])
  const [karatsOptions, setKaratsOptions] = useState([])

  // query client
  const queryClient = useQueryClient()
  const categories = queryClient.getQueryData(["categories"])
  console.log("🚀 ~ file: OTable.tsx:39 ~ OTable ~ categories:", categories)
  const karats = queryClient.getQueryData(["karats"])

  // side effects
  useEffect(() => {
    if (categories) {
      //@ts-ignore
      const categoriesArray = categories.map((category: any) => ({
        value: category.name,
        label: category.name,
        id: category.id,
      }))
      setCategoriesOptions(categoriesArray)
    }
  }, [categories])

  useEffect(() => {
    if (karats) {
      //@ts-ignore
      const karatsArray = karats.map((karat: any) => ({
        value: karat.name,
        label: karat.name,
        id: karat.id,
      }))
      setKaratsOptions(karatsArray)
    }
  }, [karats])

  return (
    <div className="p-2">
      <Formik
        initialValues={defaultValues}
        onSubmit={(values, { resetForm, setFieldValue }) => {
          const uniqueID = crypto.randomUUID() // because i need the same id for both data of row and boxes
          setData((prev) => [...Array.from(prev), { ...values, id: uniqueID }])
          setEditRow(false)
          resetForm()
          setBoxValues((prev) => [
            ...Array.from(prev),
            { ...values, id: uniqueID },
          ])
          console.log("🚀 ~ file: OTable.tsx:96 ~ OTable ~ values:", values)
        }}
        validationSchema={validationSchema}
      >
        {({}) => (
          <OTableForm
            editRow={editRow}
            categoriesOptions={categoriesOptions}
            karatsOptions={karatsOptions}
            data={data}
            setBoxValues={setBoxValues}
            setData={setData}
            formValues={formValues}
            editData={editData}
            setEditRow={setEditRow}
            setEditData={setEditData}
          />
        )}
      </Formik>
    </div>
  )
}
