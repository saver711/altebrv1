//@ts-noCheck
import React from 'react'


import { useQueryClient } from '@tanstack/react-query'
import {
  createColumnHelper, ExpandedState, flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'
import { ViewIcon } from '../../components/atoms/icons'
import { Modal } from '../../components/molecules'
import { SubTables } from './SubTables'

// types 
type Categories_TP = {
  has_selsal: string
  has_size: string
  id: string
  name: string
  name_ar: string
  name_en: string
  selling_type: string
  type: string
}
export function ExpandableTable({addedPieces}:any) {
console.log("🚀 ~ file: ExapndableTable.tsx:39 ~ ExpandableTable ~ addedPieces:", addedPieces)
// variables
  let count = 0


  const columnHelper = createColumnHelper<any>()
  // عشان احط الداتا اللي ناقصه ستاتيك حاليا لحد ما نشوف بعدين
  const modifiedData = addedPieces.map(item => ({ ...item, classification: 'ذهب', id_code: crypto.randomUUID().slice(0, 5), karat_id: crypto.randomUUID().slice(0, 2), index: ++count , sizes:item?.sizes || []
}))

  //states
  const [data, setData] = useState(modifiedData)


  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const [modalOpen, setModalOpen] = useState(false)
  const [subTableData, setSubTableData] = useState<{ index: string, data: typeof data }>()
  const [queryData, setQueryData] = useState<any[] | undefined>()

  const columns = useMemo<any>(
    () => [
      columnHelper.accessor('index', {
        header: `${t('index')}`
      }),
      // columnHelper.accessor('id_code', {
      //   header: `${t('identification code')}`
      // }),
      columnHelper.accessor('classification', {
        header: `${t('classification')}`
      }),
      columnHelper.accessor('category', {
        header: `${t('category')}`
      }),
      columnHelper.accessor('karat_id', {
        header: `${t('karat')}`
      }),
      columnHelper.accessor('model_number', {
        header: `${t('model number')}`
      }),
      columnHelper.accessor('weight', {
        header: `${t('weight')}`
      }),
      columnHelper.accessor('wage', {
        header: `${t('wage')}`
      }),
      columnHelper.accessor('value', {
        header: `${t('value')}`
      }),
      columnHelper.accessor('view', {
        header: `${t('view')}`,
        cell: (info) => <ViewIcon action={() => {
          setSubTableData({ index: info.row.original.index, data: modifiedData })
          setModalOpen(true)
        }
        } className='ms-5' />
      }),
    ],
    []
  )
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  // custom hooks 
  const queryClient = useQueryClient()
  
  useEffect(() => {
    if(queryClient){
      const categories = queryClient.getQueryData(['categories'])
      const allQueries = modifiedData?.map((item) => {
        const finaleItem = {
          category: categories?.find((category) => category.id == item.category_id)?.name,
        }
        return finaleItem
      })
      setQueryData(allQueries)
    }
  }, [queryClient])

  useEffect(() => {
    if(queryData){
      setData(modifiedData.map(item => ({ ...item,category:queryData[0]?.category , view:'icon'})))
    }
  }, [queryData])

  return (
    <div className='flex flex-col justify-center items-center'>
    <h2 className='font-bold text-2xl' >{t('final review')}</h2>
    <h3>الهويات المرقمه من سند رقم -<span className='text-orange-500' >001</span></h3>
      <div>
        <div />
        <table className='mt-2 border-mainGreen shadow-lg mb-2 w-[1500px]'>
          <thead className='bg-mainGreen text-white'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
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
                      <td key={cell.id} className={`border-l-[#b9b7b7]-500 border  ${!!!cell.getContext().getValue() && 'bg-gray-300 cursor-not-allowed' }`} >
                        {
                          !!cell.getContext().getValue() ?
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        ) : '---'}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
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
        </div>
        <pre>{JSON.stringify(expanded, null, 2)}</pre> */}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <SubTables subTableData={subTableData} />
      </Modal>
    </div>
  )
}

 // ----------------   filtration section -------------------------
// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, any>
//   table: Table<any>
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id)

//   const columnFilterValue = column.getFilterValue()

//   return typeof firstValue === 'number' ? (
//     <div className="flex space-x-2">
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         onChange={e =>
//           column.setFilterValue((old: [number, number]) => [
//             e.target.value,
//             old?.[1],
//           ])
//         }
//         placeholder={`Min`}
//         className="w-24 border shadow rounded"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         onChange={e =>
//           column.setFilterValue((old: [number, number]) => [
//             old?.[0],
//             e.target.value,
//           ])
//         }
//         placeholder={`Max`}
//         className="w-24 border shadow rounded"
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(columnFilterValue ?? '') as string}
//       onChange={e => column.setFilterValue(e.target.value)}
//       placeholder={`Search...`}
//       className="w-36 border shadow rounded"
//     />
//   )
// }

 // ----------------   checkbox section -------------------------
// function IndeterminateCheckbox({
//   indeterminate,
//   className = '',
//   ...rest
// }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
//   const ref = React.useRef<HTMLInputElement>(null!)

//   React.useEffect(() => {
//     if (typeof indeterminate === 'boolean') {
//       ref.current.indeterminate = !rest.checked && indeterminate
//     }
//   }, [ref, indeterminate])

//   return (
//     <input
//       type="checkbox"
//       ref={ref}
//       className={className + ' cursor-pointer'}
//       {...rest}
//     />
//   )
// }
