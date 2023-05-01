import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  FilterFn,
  getFilteredRowModel,
} from "@tanstack/react-table"
import type { ColumnDef } from "@tanstack/react-table"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { Button } from "../../../atoms"
interface ReactTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T>[]
  showNavigation?: boolean
  showGlobalFilter?: boolean
  filterFn?: FilterFn<T>
}

export const Table = <T extends object>({
  data,
  columns,
  showNavigation,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <div className="overflow-hidden GlobalTable w-full flex flex-col gap-4">
        <table className="min-w-full text-center">
          <thead className="border-b bg-mainGreen">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-sm font-medium text-white"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='border-b" bg-white'>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {showNavigation ? (
          <div className="mt-3 flex items-center justify-end gap-5 p-2">
            <div className="flex items-center gap-2 font-bold">
              عدد الصفحات
              <span className=" text-mainGreen">
                {table.getState().pagination.pageIndex + 1}
              </span>
              من
              <span className=" text-mainGreen">{table.getPageCount()} </span>
            </div>
            <div className="flex items-center gap-2 ">
              <Button
                className=" rounded bg-mainGreen p-[.18rem] "
                action={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <MdKeyboardArrowRight className="h-4 w-4 fill-white" />
              </Button>
              <Button
                className=" rounded bg-mainGreen p-[.18rem] "
                action={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <MdKeyboardArrowLeft className="h-4 w-4 fill-white" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
