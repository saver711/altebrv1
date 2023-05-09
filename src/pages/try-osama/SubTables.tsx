import { useQueryClient } from "@tanstack/react-query"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table"
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { FilesPreviewOutFormik } from "../../components/molecules/files/FilesPreviewOutFormik"
import { Query_TP } from "../coding/gold/AddStone"
import { StoneTable } from "./StoneTable"
/////////// HELPER VARIABLES & FUNCTIONS
///

///
const columnHelper = createColumnHelper<any>()

export const SubTables = ({ subTableData }: any) => {
  /// variables
  const selectedRow = subTableData.data.filter(
    (item) => item.index === subTableData.index
  )
  const columns = useMemo<any>(
    () => [
      columnHelper.accessor("bond_date", {
        header: `${t("supply date")}`,
      }),
      columnHelper.accessor("karat_value", {
        header: `${t("karat value")}`,
      }),
      columnHelper.accessor("size_type", {
        header: `${t("size type")}`,
      }),
      columnHelper.accessor("size_unit_id", {
        header: `${t("size number")}`,
      }),
      columnHelper.accessor("color", {
        header: `${t("color")}`,
      }),
      columnHelper.accessor("country", {
        header: `${t("country")}`,
      }),
      columnHelper.accessor("sellingPrice", {
        header: `${t("selling price")}`,
      }),
    ],
    []
  )
  ////////// STATES
  const [queryData, setQueryData] = useState<any[] | undefined>()

  const queryClient = useQueryClient()

  //@ts-ignore
  const modifiedData = selectedRow.map((item) => ({
    ...item,
    size_type: !!item?.category_sizes ? item?.category_sizes.size_type : "",
    size_number: item?.category_sizes ? item?.category_sizes.size_unit_id : "",
  }))

  useEffect(() => {
    if (queryClient) {
      const types = queryClient.getQueryData<Query_TP[]>(["sizes"])
      const colors = queryClient.getQueryData<Query_TP[]>(["colors"])
      const countries = queryClient.getQueryData<Query_TP[]>(["countries"])
      const allQueries = modifiedData?.map((item) => {
        const finaleItem = {
          types: types?.find((type) => type?.id == item?.stones[0].stone_id)
            ?.name,
          country: countries?.find((country) => country?.id == item?.country_id)
            ?.name,
          color: colors?.find((color) => color?.id == item?.color_id)?.name,
        }
        return finaleItem
      })
      setQueryData(allQueries)
    }
  }, [queryClient])

  ///
  //@ts-ignore

  const [data, setData] = useState(modifiedData)

  useEffect(() => {
    if (queryData) {
      setData(
        modifiedData.map((item) => ({
          ...item?.category_sizes,
          types: queryData[0]?.types,
          country: queryData[0]?.country,
          color: queryData[0]?.color,
          karat_value: item.karat_value,
          bond_date: item.bond_date,
        }))
      )
    }
  }, [queryData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <>
      <div className="flex justify-center items-center">
        <span className="text-center font-bold text-2xl mb-12">
          باقي تفاصيل القطعه
        </span>
      </div>
      <p className="text-center mx-auto bg-lightGreen p-2 rounded-lg w-[150px] text-mainGreen">
        {" "}
        {t("piece details")}{" "}
      </p>
      <div className="p-2 flex justify-center ms-10 w-full ">
        <table className="border-mainGreen shadow-lg mb-7 text-center text-sm font-light w-full">
          <thead className="bg-mainGreen text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="p-4 border-l-2 border-l-lightGreen first:rounded-r-lg last:rounded-l-lg last:rounded-b-none first:rounded-b-none "
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="border-l-2 border-l-flatWhite text-center h-[40px]"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className={`border-l-[#b9b7b7]-500 border  ${
                          !!!cell.getContext().getValue() &&
                          "bg-gray-300 cursor-not-allowed"
                        }`}
                      >
                        {!!cell.getContext().getValue()
                          ? flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          : "---"}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
          <tfoot className="h-[40px]">
            {table
              .getRowModel()
              .rows.map((row) => {
                return (
                  <td colSpan={10} className="text-start px-4" key={row.id}>
                    <span>{selectedRow[0].details} :</span>{" "}
                    <span className="text-l font-bold">
                      {t("piece description")}{" "}
                    </span>
                  </td>
                )
              })
              .slice(0, 1)}
          </tfoot>
        </table>
        <div />

        <div className="p-2 flex flex-col justify-center items-center gap-x-4">
          {!!selectedRow[0].media && selectedRow[0].media.length >= 0 && (
            <FilesPreviewOutFormik
              images={selectedRow[0].media}
              pdfs={[]}
              preview
            />
          )}
        </div>
      </div>
      <StoneTable subTableData={subTableData} />
    </>
  )
}
