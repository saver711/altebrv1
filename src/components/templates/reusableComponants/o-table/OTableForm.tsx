import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  import { Field, Form, useFormikContext } from "formik"
  import { t } from "i18next"
  import { Dispatch, SetStateAction, useEffect } from "react"
  import { AiOutlinePlus } from "react-icons/ai"
  import { DeleteIcon, EditIcon } from "../../../atoms/icons"
  import { OTableDataTypes } from "../../../gold-supply/GoldSupplySecondForm"
  import { GoldFirstFormInitValues_TP } from "../../../gold-supply/formInitialValues_types"
  import { BaseInputField, Select } from "../../../molecules"
  import SelectCategory from "../categories/select/SelectCategory"
  import SelectKarat from "../karats/select/SelectKarat"
  /////////// HELPER VARIABLES & FUNCTIONS
  ///
  type OTableFormProps_TP = {
    setDirty: Dispatch<SetStateAction<boolean>>
    editRow: boolean
    categoriesOptions: never[]
    karatsOptions: never[]
    data: OTableDataTypes[]
    setBoxValues: Dispatch<SetStateAction<OTableDataTypes[]>>
    setData: Dispatch<SetStateAction<OTableDataTypes[]>>
    formValues: GoldFirstFormInitValues_TP | undefined
    editData: OTableDataTypes
    setEditRow: Dispatch<SetStateAction<boolean>>
    setEditData: Dispatch<SetStateAction<OTableDataTypes>>
  }
  
  ///
  export const OTableForm = ({
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
    let { enableReinitialize, resetForm, values, setFieldValue, submitForm, dirty } =
      useFormikContext<any>()
      useEffect(() => {
        if (
          values.wage !== "" || 
          (values.stock !== undefined && values.stock !== "") || 
          values.weight !== "" ||
          values.category_id !== "" || 
          values.karat_id !== ""
        )  {
          setDirty(true)
        } else {
          setDirty(false)
        }
      }, [values.wage, values.stock, values.weight, values.category_id, values.karat_id])
    
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
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("karat_value", {
        header: () => `${t("karats")}`,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("stock", {
        header: `${t("stocks")}`,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("wage", {
        header: `${t("wage")}`,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("total_wages", {
        header: `${t("total wages")}`,
        cell: (info) =>
          (info.row.original.weight * info.row.original.wage).toFixed(3),
      }),
      columnHelper.accessor("wage_tax", {
        header: `${t("wage tax")}`,
        cell: (info) =>
          (info.row.original.weight * info.row.original.wage * 0.15).toFixed(3),
      }),
      columnHelper.accessor("gold_tax", {
        header: `${t("gold tax")}`,
        cell: (info) =>
          (
            info.row.original.weight *
            Number(formValues?.api_gold_price) *
            0.15
          ).toFixed(3),
      }),
      columnHelper.accessor("actions", {
        header: `${t("action")}`,
      }),
    ]
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
    console.log("🚀 ~ file: OTableForm.tsx:82 ~ OTableForm ~ data:", data)
  
    // variables
    const karatValues = [
      { karat: "24", value: "1", id: 1 },
      { karat: "22", value: "0.91667", id: 2 },
      { karat: "21", value: "0.87500", id: 3 },
      { karat: "18", value: "0.75000", id: 4 },
    ]
  
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
      setFieldValue(
        "stock",
        karatValues.find((item) => item.karat === values.karat_value)?.value
      )
    }, [values.karat_id])
  
    return (
      <>
        <Form>
          <table className="mt-8 border-mainGreen mb-2">
            <thead className="bg-mainGreen text-white ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="">
                  {headerGroup.headers.map((header, i) => {
                    if (i === 1 || i === 3) {
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
                            stock: values.stock || editData.stock,
                            weight: values.weight || editData.weight,
                            wage: values.wage || editData.wage,
                            karat_value:
                              values.karat_value || editData.karat_value,
                            category_value:
                              values.category_value || editData.category_value,
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
                      value={values.stock || editData.stock}
                      onChange={(e: any) => {
                        setFieldValue("stock", e.target.value)
                      }}
                      className="rounded-md border-2 border-transparent focus:!border-2 focus:!border-mainGreen form-input px-4 py-[.30rem] w-full shadows"
                    />
                  </td>
                  <td>
                    <Field
                      id="wage"
                      name="wage"
                      type="number"
                      value={values.wage || editData.wage}
                      onChange={(e: any) => {
                        setFieldValue("wage", e.target.value)
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
                    <SelectKarat
                      field="id"
                      name="karat_id"
                      onChange={(option) => {
                        setFieldValue("karat_value", option!.value)
                        setFieldValue(
                          "stock",
                          karatValues.find(
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
                    <BaseInputField id="wage" name="wage" type="number" />
                  </td>
                  <td className="border-l-2 border-l-flatWhite">
                    <Field
                      id="total_wages"
                      name="total_wages"
                      value={(
                        Number(values.weight) * Number(values.wage)
                      ).toFixed(3)}
                      className="border-none bg-inherit outline-none cursor-default caret-transparent text-center w-full"
                    />
                  </td>
                  <td className="border-l-2 border-l-flatWhite">
                    <Field
                      id="wage_tax"
                      name="wage_tax"
                      value={(
                        Number(values.weight) *
                        Number(values.wage) *
                        0.15
                      ).toFixed(3)}
                      onChange={() =>
                        setFieldValue(
                          "wage_tax",
                          Number(values.weight) * Number(values.wage) * 0.15
                        )
                      }
                      className="border-none bg-inherit outline-none cursor-default caret-transparent text-center w-full"
                    />
                  </td>
                  <td className="border-l-2 border-l-flatWhite">
                    <Field
                      id="gold_tax"
                      name="gold_tax"
                      value={(
                        Number(values.weight) *
                          Number(formValues?.api_gold_price) *
                          0.15 || 0
                      ).toFixed(3)}
                      onChange={() =>
                        setFieldValue(
                          "gold_tax",
                          Number(values.weight) *
                            Number(formValues?.api_gold_price) *
                            0.15
                        )
                      }
                      className="border-none bg-inherit outline-none cursor-default caret-transparent text-center w-full"
                    />
                  </td>
                  <td>
                    {!editRow && (
                      <AiOutlinePlus
                        className="cursor-pointer text-lg font-bold rounded-md mx-auto w-[30px] h-[30px] active:shadow-none active:w-[28px]"
                        onClick={submitForm}
                      />
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