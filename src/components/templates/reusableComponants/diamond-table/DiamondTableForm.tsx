import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { Field, Form, useFormikContext } from "formik"
import { t } from "i18next"
import { Dispatch, SetStateAction, useEffect } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { numberContext } from "../../../../context/settings/number-formatter"
import { useFetch } from "../../../../hooks"
import { DeleteIcon, EditIcon } from "../../../atoms/icons"
import { FirstFormInitValues_TP } from "../../../gold-supply/formInitialValues_types"
import { OTableDataTypes } from "../../../gold-supply/GoldSupplySecondForm"
import { BaseInputField, Select } from "../../../molecules"
import SelectCategory from "../categories/select/SelectCategory"
import SelectKarat from "../karats/select/SelectKarat"
/////////// HELPER VARIABLES & FUNCTIONS
///
type OTableFormProps_TP = {
  dirty: boolean
  setDirty: Dispatch<SetStateAction<boolean>>
  editRow: boolean
  categoriesOptions: never[]
  karatsOptions: never[]
  data: OTableDataTypes[]
  setBoxValues: Dispatch<SetStateAction<OTableDataTypes[]>>
  setData: Dispatch<SetStateAction<OTableDataTypes[]>>
  formValues: FirstFormInitValues_TP | undefined
  editData: OTableDataTypes
  setEditRow: Dispatch<SetStateAction<boolean>>
  setEditData: Dispatch<SetStateAction<OTableDataTypes>>
}

export type KaratValues_TP = {
  id: number
  karat: string
  value: string
}

///
export const DiamondTableForm = ({
  dirty,
  setDirty,
  editRow,
  categoriesOptions,
  karatsOptions,
  data,
  setBoxValues,
  setData,
  formValues,
  editData,
  setEditRow,
  setEditData,
}: OTableFormProps_TP) => {
  const { formatGram, formatReyal } = numberContext()
  let { enableReinitialize, resetForm, values, setFieldValue, submitForm } =
    useFormikContext<any>()
    useEffect(() => {
      if (
        (values.stock !== undefined && values.stock !== "") || 
        values.weight !== "" ||
        values.category_id !== "" || 
        values.karat_id !== "" ||
        values.gold_weight !== "" || 
        values.diamond_value !== "" || 
        values.diamond_amount !== "" || 
        values.diamond_stone_weight !== "" || 
        values.other_stones_weight !== ""
      )  {
        setDirty(true)
      } else {
        setDirty(false)
      }
    }, [
      values.stock, 
      values.weight, 
      values.category_id, 
      values.karat_id,
      values.gold_weight, 
      values.diamond_value, 
      values.diamond_amount, 
      values.diamond_stone_weight, 
      values.other_stones_weight, 
    ])
  
  const columnHelper = createColumnHelper<any>()
  const columns: any = [
    columnHelper.accessor("number", {
      cell: (info) => `${info.row.index + 1}`,
      header: () => `${t("index")}`,
    }),
    columnHelper.accessor("category_value", {
      header: () => `${t("categories")}`,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("weight", {
      header: () => `${t("weight")}`,
      cell: (info) => formatGram(info.getValue()),
    }),
    columnHelper.accessor("gold_weight", {
      header: () => `${t("gold weight")}`,
      cell: (info) => formatGram(info.getValue()),
    }),
    columnHelper.accessor("karat_value", {
      header: () => `${t("karats")}`,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("stock", {
      header: `${t("stocks")}`,
      cell: (info) => info.getValue().replace(/\.?0+$/, ''),
    }),
    columnHelper.accessor("diamond_value", {
      header: `${t("diamond value")}`,
      cell: (info) => formatReyal(info.getValue()),
    }),
    columnHelper.accessor("diamond_amount", {
      header: `${t("diamond amount")}`,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("diamond_stone_weight", {
      header: `${t("diamond stone weight")}`,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("other_stones_weight", {
      header: `${t("other stones weight")}`,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("diamond_tax", {
      header: `${t("diamond tax")}`,
      cell: (info) => formatReyal(info.row.original.diamond_value * 0.15),
    }),
    columnHelper.accessor("actions", {
      header: `${t("actions")}`,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  console.log("🚀 ~ file: OTableForm.tsx:82 ~ OTableForm ~ data:", data)

  // variables
  // const karatValues = [
  //   { karat: "24", value: "1", id: 1 },
  //   { karat: "22", value: "0.91667", id: 2 },
  //   { karat: "21", value: "0.87500", id: 3 },
  //   { karat: "18", value: "0.75000", id: 4 },
  // ]

  const { data: karatValues } = useFetch<KaratValues_TP[]>({
    endpoint: 'classification/api/v1/allkarats',
    queryKey: ['karat_bond_select'],
  })

  // functions
  function deleteRowHandler(id: string) {
    setData((prev: OTableDataTypes[]) => prev.filter((row) => row.id !== id))
    setBoxValues((prev: OTableDataTypes[]) =>
      prev.filter((row) => row.id !== id)
    )
  }

  function editRowHandler(row: OTableDataTypes, id: string) {
    setEditData(row)
  }
  //side effects
  useEffect(() => {
    if (karatValues) {

      setFieldValue(
        "stock",
        karatValues.find((item) => item.karat === values.karat_value)?.value.replace(/\.?0+$/, '')
      )
    }
  }, [values.karat_id])

  return (
    <>
      <Form>
        <table className="mt-8 border-mainGreen mb-2">
          <thead className="bg-mainGreen text-white ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header, i) => {
                  if (i === 1 || i === 4) {
                    return (
                      <th
                        key={header.id}
                        className="p-4 border-l-2 border-l-lightGreen rounded-t-lg"
                        style={{minWidth: '180px'}}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    )
                  } else {
                    return (
                      <th
                        key={header.id}
                        className="p-4 border-l-2 border-l-lightGreen rounded-t-lg"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    )
                  }
                })}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`${
                  editRow && editData.id !== row.original.id
                    ? "hidden cursor-not-allowed pointer-events-none"
                    : "border-b-2 border-b-flatWhite"
                }`}
              >
                {row.getVisibleCells().map((cell, i) => {

                  return ((i + 1) !== row.getVisibleCells().length) ? (
                    <td
                      key={cell.id}
                      className="border-l-2 px-6 py-4 whitespace-nowrap border-l-flatWhite text-center bg-lightGray"
                      style={{
                        minWidth: "max-content",
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ) : (
                    <td className="flex px-6 py-5 bg-lightGreen gap-x-2 items-center">
                  {!editRow && (
                    <DeleteIcon
                      action={() => deleteRowHandler(row.original.id)}
                    />
                  )}
                  {editRow && editData.id === row.original.id ? (
                    <button
                      type="submit"
                      className="relative active:top-[1px] py-2 px-2 font-bold rounded-md border-mainGreen border-2"
                      onClick={() => {
                        setEditRow(false)
                        const index = data.findIndex(
                          (item) => item.id === row.original.id
                        )
                        const updatedData = [...data]
                        updatedData[index] = {
                          ...editData,
                          category_value: values.category_value || editData.category_value,
                          weight: values.weight || editData.weight,
                          gold_weight: values.gold_weight || editData.gold_weight,
                          karat_value: values.karat_value || editData.karat_value,
                          stock: values.stock || editData.stock,
                          diamond_value: values.diamond_value || editData.diamond_value,
                          diamond_amount: values.diamond_amount || editData.diamond_amount,
                          diamond_stone_weight: values.diamond_stone_weight || editData.diamond_stone_weight,
                          other_stones_weight: values.other_stones_weight || other_stones_weight.stock,
                          diamond_tax: values.diamond_tax || editData.diamond_tax,
                        }
                        setData(updatedData)
                        setBoxValues(updatedData)
                        resetForm()
                        //resetting select field values
                        editData.karat_value = ""
                        editData.category_value = ""
                      }}
                    >
                      {t("edit")}
                    </button>
                  ) : (
                    <EditIcon
                      action={() => {
                        editRowHandler(row.original, row.original.id)
                        enableReinitialize = true
                        setEditRow(true)
                        resetForm()
                      }}
                    />
                  )}
                </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-lightGray">
            {editRow ? (
              <tr>
                <td className="text-center">
                  {table.getRowModel().rows.length}
                </td>
                <td className="px-6 py-4">
                  <Select
                    options={categoriesOptions}
                    id="category"
                    name="category_id"
                    placeholder={`${t("categories")}`}
                    value={{
                      value: values.category_value || editData.category_value,
                      label:
                        values.category_value ||
                        editData.category_value ||
                        t("categories"),
                      id: values.category_id || values.category_id,
                    }}
                    onChange={(option: any) => {
                      setFieldValue("category_id", option!.id)
                      setFieldValue("category_value", option!.value)
                    }}
                  />
                </td>
                <td>
                  <Field
                    id="weight"
                    name="weight"
                    type="number"
                    value={values.weight || editData.weight}
                    onChange={(e: any) => {
                      setFieldValue("weight", e.target.value)
                    }}
                    className="rounded-md border-2 border-transparent focus:!border-2 focus:!border-mainGreen form-input px-4 py-[.30rem] w-full shadows"
                  />
                </td>
                <td>
                  <Field
                    id="gold_weight"
                    name="gold_weight"
                    type="number"
                    value={values.gold_weight || editData.gold_weight}
                    onChange={(e: any) => {
                      setFieldValue("gold_weight", e.target.value)
                    }}
                    className="rounded-md border-2 border-transparent focus:!border-2 focus:!border-mainGreen form-input px-4 py-[.30rem] w-full shadows"
                  />
                </td>
                <td>
                  <Select
                    options={karatsOptions}
                    id="karat"
                    name="karat_id"
                    placeholder={`${t("karats")}`}
                    value={{
                      value: values.karat_value || editData.karat_value,
                      label:
                        values.karat_value ||
                        editData.karat_value ||
                        t("karats"),
                      id: values.karat_id || values.karat_id,
                    }}
                    onChange={(option: any) => {
                      setFieldValue("karat_id", option!.id)
                      setFieldValue("karat_value", option!.value)
                    }}
                  />
                </td>
                <td>
                  <Field
                    id="stock"
                    name="stock"
                    type="number"
                    value={values.stock.replace(/\.?0+$/, '') || editData.stock.replace(/\.?0+$/, '')}
                    onChange={(e: any) => {
                      setFieldValue("stock", e.target.value)
                    }}
                    className="rounded-md border-2 border-transparent focus:!border-2 focus:!border-mainGreen form-input px-4 py-[.30rem] w-full shadows"
                  />
                </td>
                <td>
                  <Field
                    id="diamond_value"
                    name="diamond_value"
                    type="number"
                    value={values.diamond_value || editData.diamond_value}
                    onChange={(e: any) => {
                      setFieldValue("diamond_value", e.target.value)
                    }}
                    className="rounded-md border-2 border-transparent focus:!border-2 focus:!border-mainGreen form-input px-4 py-[.30rem] w-full shadows"
                  />
                </td>
                <td>
                  <Field
                    id="diamond_amount"
                    name="diamond_amount"
                    type="number"
                    value={values.diamond_amount || editData.diamond_amount}
                    onChange={(e: any) => {
                      setFieldValue("diamond_amount", e.target.value)
                    }}
                    className="rounded-md border-2 border-transparent focus:!border-2 focus:!border-mainGreen form-input px-4 py-[.30rem] w-full shadows"
                  />
                </td>
                <td>
                  <Field
                    id="diamond_stone_weight"
                    name="diamond_stone_weight"
                    type="number"
                    value={values.diamond_stone_weight || editData.diamond_stone_weight}
                    onChange={(e: any) => {
                      setFieldValue("diamond_stone_weight", e.target.value)
                    }}
                    className="rounded-md border-2 border-transparent focus:!border-2 focus:!border-mainGreen form-input px-4 py-[.30rem] w-full shadows"
                  />
                </td>
                <td>
                  <Field
                    id="other_stones_weight"
                    name="diamond_value"
                    type="number"
                    value={values.other_stones_weight || editData.other_stones_weight}
                    onChange={(e: any) => {
                      setFieldValue("other_stones_weight", e.target.value)
                    }}
                    className="rounded-md border-2 border-transparent focus:!border-2 focus:!border-mainGreen form-input px-4 py-[.30rem] w-full shadows"
                  />
                </td>
              </tr>
            ) : (
              <tr>
                <td className="text-center border-l-2 border-l-flatWhite">
                  {table.getRowModel().rows.length + 1}
                </td>
                <td className="border-l-2 border-l-flatWhite">
                  <SelectCategory
                    name="category_id"
                    onChange={(option) => {
                      setFieldValue("category_value", option!.value)
                    }}
                    all={true}
                    value={{
                      value: values.category_value || editData.category_value,
                      label:
                        values.category_value ||
                        editData.category_value ||
                        t("categories"),
                      id: values.category_id || values.category_id,
                    }}
                  />
                </td>
                <td className="border-l-2 border-l-flatWhite">
                  <BaseInputField id="weight" name="weight" type="number" />
                </td>
                <td className="border-l-2 border-l-flatWhite">
                  <BaseInputField id="gold_weight" name="gold_weight" type="number" />
                </td>
                <td className="border-l-2 border-l-flatWhite">
                  <SelectKarat
                    field="id"
                    name="karat_id"
                    onChange={(option) => {
                      setFieldValue("karat_value", option!.value)
                      setFieldValue(
                        "stock",
                        karatValues!.find(
                          (item) => item.karat === values.karat_value
                        )?.value
                      )
                    }}
                    value={{
                      value: values.karat_value || editData.karat_value,
                      label:
                        values.karat_value ||
                        editData.karat_value ||
                        t("karats"),
                      id: values.karat_id || values.karat_id,
                    }}
                  />
                </td>
                <td className="border-l-2 border-l-flatWhite">
                  <BaseInputField id="stock" name="stock" type="number" />
                </td>
                <td className="border-l-2 border-l-flatWhite">
                  <BaseInputField id="diamond_value" name="diamond_value" type="number" />
                </td>
                <td className="border-l-2 border-l-flatWhite">
                  <BaseInputField id="diamond_amount" name="diamond_amount" type="number" />
                </td>
                <td className="border-l-2 border-l-flatWhite">
                  <BaseInputField id="diamond_stone_weight" name="diamond_stone_weight" type="number" />
                </td>
                <td className="border-l-2 border-l-flatWhite">
                  <BaseInputField id="other_stones_weight" name="other_stones_weight" type="number" />
                </td>
                <td className="border-l-2 border-l-flatWhite">
                  <Field
                    id="diamond_tax"
                    name="diamond_tax"
                    value={formatReyal(
                      Number(values.diamond_value) * 0.15
                    )}
                    className="border-none bg-inherit outline-none cursor-default caret-transparent text-center w-full"
                  />
                </td>
                <td>
                  {!editRow && (
                    <div className="flex">
                      <AiOutlinePlus
                        className="cursor-pointer text-lg font-bold rounded-md mx-auto w-[30px] h-[30px] active:shadow-none active:w-[28px]"
                        onClick={submitForm}
                      />
                      {dirty && (
                        <DeleteIcon
                          className="cursor-pointer rounded-md mx-auto w-[30px] h-[30px] active:shadow-none active:w-[28px]"
                          action={() => resetForm()}
                        />
                      )}
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      </Form>
    </>
  )
}