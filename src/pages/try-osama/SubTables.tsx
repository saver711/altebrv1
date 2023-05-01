import { useQueryClient } from "@tanstack/react-query"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { FilesPreview } from "../../components/molecules/files/FilesPreview"
import { Query_TP } from "../coding/gold/AddStone"
import { StoneTable } from "./StoneTable"
/////////// HELPER VARIABLES & FUNCTIONS
///

///
const columnHelper = createColumnHelper<any>()

export const SubTables = ({ subTableData }: any) => {

  const columns = useMemo<any>(
    () => [
      columnHelper.accessor('supply_date', {
        header: `${t('supply date')}`
      }),
      columnHelper.accessor('size_type', {
        header: `${t('size type')}`
      }),
      columnHelper.accessor('sizeNumber_id', {
        header: `${t('size number')}`
      }),
      columnHelper.accessor('country_value', {
        header: `${t('country')}`
      }),
      //   columnHelper.accessor('selling_price', {
      //     header: `${t('selling price')}`
      // }),
    ],
    []
  )
  ////////// STATES
  const [sizeType, setSizeType] = useState([])
  console.log("🚀 ~ file: SubTables.tsx:51 ~ SubTables ~ sizeType:", sizeType)
  const queryClient = useQueryClient()

  useEffect(() => {
    if(queryClient){
      const types = queryClient.getQueryData<Query_TP[]>(["sizeType"])
      setSizeType(types)
    }
  }, [])
  
  ///
  //@ts-ignore
  const selectedRow = subTableData.data.filter(item => item.index === subTableData.index)


  //@ts-ignore
  const modifiedData = selectedRow.map(item => ({ ...item, supply_date: '1-10-95', size_type: item!.sizes[0].sizeNumber_id, sizeNumber_id: item!.sizes[0].size_type }))
  const [data, setData] = useState(modifiedData)

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
      <div className='flex justify-center items-center'>
        <span className="text-center font-bold text-2xl mb-12" >باقي تفاصيل القطعه</span>
      </div>
      <p className="text-center mx-auto bg-lightGreen p-2 rounded-lg w-[150px] text-mainGreen" > {t('piece details')} </p>
      <div className="p-2 flex justify-center ms-40">
        <div />
        <table className='border-mainGreen shadow-lg mb-7 text-center text-sm font-light'>
          <thead className='bg-mainGreen text-white'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} >
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan} className='p-4 border-l-2 border-l-lightGreen first:rounded-r-lg last:rounded-l-lg last:rounded-b-none first:rounded-b-none'>
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
            {table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id} className='border-l-2 border-l-flatWhite text-center'>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className="border-l-[#b9b7b7]-500 border" >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
          <tfoot className='h-8' >
            {table.getRowModel().rows.map(row => {
              return <td colSpan={10} className='text-start px-4' key={row.id}>
               <span className="text-l font-bold">{t('piece description')} </span> :{row.original.details}
              </td>
            }).slice(0, 1)}
          </tfoot>
        </table>
        <div className="h-2" />
        {/* <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>{table.getRowModel().rows.length} Rows</div>
        <div>
          <button onClick={() => rerender()}>Force Rerender</button>
        </div> */}
        <div className="p-2 flex flex-col justify-center items-center gap-x-4" >
          {
            !!selectedRow[0].media &&
            selectedRow[0].media.length >=0 &&
          <FilesPreview images={selectedRow[0].media} pdfs={[]} preview />
          }
        </div>
      </div>
      <StoneTable subTableData={subTableData} />
    </>
  )
}