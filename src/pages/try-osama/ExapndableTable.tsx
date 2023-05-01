//@ts-noCheck
import React, { HTMLProps } from 'react'


import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import CreateCategory from '../../components/templates/reusableComponants/categories/create/CreateCategory'
import { GrFormView } from 'react-icons/gr'
import { ViewIcon } from '../../components/atoms/icons'
import { Modal } from '../../components/molecules'
import { useState, useMemo, useReducer, useEffect } from 'react'
import { SubTables } from './SubTables'
import { t } from 'i18next'
import { useQueryClient } from '@tanstack/react-query'

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
export function ExpandableTable({tableData}:any) {
// variables
  let count = 0

  //  select states
  const [categoriesOptions, setCategoriesOptions] = useState<Categories_TP>()

  const rerender = useReducer(() => ({}), {})[1]
  const columnHelper = createColumnHelper<any>()
  // عشان احط الداتا اللي ناقصه ستاتيك حاليا لحد ما نشوف بعدين
  const modifiedData = tableData.map(item => ({ ...item, classification: 'ذهب', id_code: crypto.randomUUID().slice(0, 5), karat_id: crypto.randomUUID().slice(0, 2), index: ++count
}))

  //states
  const [data, setData] = useState(modifiedData)


  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const [modalOpen, setModalOpen] = useState(false)
  const [subTableData, setSubTableData] = useState<{ index: string, data: typeof data }>()
  const columns = useMemo<any>(
    () => [
      columnHelper.accessor('index', {
        header: `${t('index')}`
      }),
      columnHelper.accessor('id_code', {
        header: `${t('identification code')}`
      }),
      columnHelper.accessor('classification', {
        header: `${t('classification')}`
      }),
      columnHelper.accessor('category_value', {
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
      columnHelper.accessor('color_value', {
        header: `${t('wage tax')}`
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
  const categories = queryClient.getQueryData(['categories'])

  // side effects
  useEffect(() => {
    if (categories) {
      setCategoriesOptions(categories as Categories_TP)
    }
  }, [categories])

  return (
    <>
      <div>
        <div />
        <table className='mt-2 border-mainGreen shadow-lg mb-2'>
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
                      <td key={cell.id} className="border-l-[#b9b7b7]-500 border">
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
    </>
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
