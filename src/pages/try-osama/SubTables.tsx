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
import { FilesPreviewOutFormik } from "../../components/molecules/files/FilesPreviewOutFormik"
import { Query_TP } from "../coding/gold/AddStone"
import { StoneTable } from "./StoneTable"
/////////// HELPER VARIABLES & FUNCTIONS
///

///
const columnHelper = createColumnHelper<any>()

export const SubTables = ({ subTableData }: any) => {
console.log("🚀 ~ file: SubTables.tsx:23 ~ SubTables ~ subTableData:", subTableData)
/// variables 
const selectedRow = subTableData.data.filter(item => item.index === subTableData.index)
  console.log("🚀 ~ file: SubTables.tsx:25 ~ SubTables ~ selectedRow:", selectedRow)
  const columns = useMemo<any>(
    () => [
      columnHelper.accessor('supply_date', {
        header: `${t('supply date')}`
      }),
      columnHelper.accessor('size_type', {
        header: `${t('size type')}`
      }),
      columnHelper.accessor('size_number', {
        header: `${t('size number')}`
      }),
      columnHelper.accessor('country', {
        header: `${t('country')}`
      }),
      columnHelper.accessor('sellingPrice', {
        header: `${t('selling price')}`
      }),
    ]
    ,
    []
  )
  ////////// STATES
  const [queryData, setQueryData] = useState<any[] | undefined>()

  const queryClient = useQueryClient()

  //@ts-ignore
  const modifiedData = selectedRow.map(item => ({ ...item, supply_date: '1-10-95', size_type:!!item?.sizes[0] ? item?.sizes[0].sizeType_value
  : "", size_number: item?.sizes[0]?  item?.sizes[0].sizeNumber_value : '' }))
  
  useEffect(() => {
    if(queryClient){
      const types = queryClient.getQueryData<Query_TP[]>(["sizes"])
      const colors = queryClient.getQueryData<Query_TP[]>(["colors"])
      const countries = queryClient.getQueryData<Query_TP[]>(["countries"])
      const allQueries = modifiedData?.map((item) => {
        const finaleItem = {
          cc:countries,
          types: types?.find((type) => type.id == item.stones[0].stone_id)?.name,
          country: countries?.find((country) => country.id == item.country_id)?.name,
        }
        console.log('finaleItem' , finaleItem)
        return finaleItem
      })
      setQueryData(allQueries)
    }
  }, [queryClient])

  
  ///
  //@ts-ignore

  const [data, setData] = useState(modifiedData)
  
  useEffect(() => {
    if(queryData){
      setData(modifiedData.map(item => ({ ...item?.sizes[0],types:queryData[0]?.types , country:queryData[0]?.country})))
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
          <tfoot className='h-8' >
            {table.getRowModel().rows.map(row => {
              console.log("first=>" , row.original)
              return <td colSpan={10} className='text-start px-4' key={row.id}>
              <span>{selectedRow[0].details} :</span> <span className="text-l font-bold">{t('piece description')} </span> 
              </td>
            }).slice(0, 1)}
          </tfoot>
        </table>
        <div/>
        
        <div className="p-2 flex flex-col justify-center items-center gap-x-4" >
          {
            !!selectedRow[0].media &&
            selectedRow[0].media.length >=0 &&
          <FilesPreviewOutFormik images={selectedRow[0].media} pdfs={[]} preview />
          }
        </div>
      </div>
      <StoneTable subTableData={subTableData} />
    </>
  )
}