import { useQueryClient } from '@tanstack/react-query'
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
import { Query_TP, StoneRow_TP } from '../coding/gold/AddStone'
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const StoneTable = ({ subTableData }: any) => {
  const columnHelper = createColumnHelper<any>()

  const columns = useMemo<any>(
    () => [
      columnHelper.accessor('types', {
        header: `${t('stone type')}`
      }),
      columnHelper.accessor('colors', {
        header: `${t('stone color')}`
      }),
      columnHelper.accessor('shapes', {
        header: `${t('stone shape')}`
      }),
      columnHelper.accessor('purities', {
        header: `${t('purity degree')}`
      }),
      columnHelper.accessor('weight', {
        header: `${t('stone weight')}`
      }),
      columnHelper.accessor('count', {
        header: `${t('stone count')}`
      }),
      columnHelper.accessor('natures', {
        header: `${t('stone nature')}`
      }),
      columnHelper.accessor('certificate_number', {
        header: `${t('stone certificate')}`
      }),
      columnHelper.accessor('certificate_source', {
        header: `${t('certificate source')}`
      }),
      columnHelper.accessor('certificate_url', {
        header: `${t('certificate url')}`
      }),
    ],
    []
  )
  /////////// STATES





  ///
  //@ts-ignore
  const selectedRow = subTableData.data.filter(item => item.index === subTableData.index)
  const queryClient = useQueryClient()
  const [queryData, setQueryData] = useState<StoneRow_TP[] | undefined>()
  useEffect(() => {
    if (queryClient) {
      const types = queryClient.getQueryData<Query_TP[]>(["stone_type"])
      const colors = queryClient.getQueryData<Query_TP[]>(["colors"])
      const shapes = queryClient.getQueryData<Query_TP[]>(["stone_shape"])
      const purities = queryClient.getQueryData<Query_TP[]>(["stone_purity"])
      const natures = queryClient.getQueryData<Query_TP[]>(["stone_nature"])
      const allQueries = StonesData?.map((stone) => {
        const finaleStone = {
          stone: types?.find((type) => type.id == stone.stones[0].stone_id)?.name,
          color: colors
            ?.filter((item) => stone.stones[0].color_id.includes(item.id))
            .map((item) => item.name)
            .join(" & ")!,
          shape: shapes
            ?.filter((item) => stone.stones[0].shape_id.includes(item.id))
            .map((item) => item.name)
            .join(" & ")!,
          purity: purities?.find((type) => type.id == stone.stones[0].purity_id)?.name!,
          nature: natures?.find((type) => type.id == stone.stones[0].nature_id)?.name!,
        }
        return finaleStone
      })
      setQueryData(allQueries)
    }
  }, [queryClient])
  //@ts-ignore
  const StonesData = selectedRow.filter(item => item?.stones)
  const [data, setData] = useState([])
  //@ts-ignore
  useEffect(() => {
    if(queryData){
      setData(StonesData.map(item => ({ ...item?.stones[0],types:queryData[0]?.stone,  colors:queryData[0]?.color ,shapes:queryData[0]?.shape ,purities:queryData[0]?.purity ,natures:queryData[0]?.nature})))
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
  if(!!!queryData) return <h2>loading</h2>
  if (StonesData.length <= 0) return <h2 className="text-center font-bold text-xl text-mainGreen bg-lightGreen p-2 rounded mt-8 w-1/3 mx-auto" >لا تحتوي هذه القطعه على حجر</h2>
  return (
    <>
    <div className='flex justify-center items-center' >
      <span className="text-center bg-lightGreen p-2 rounded-lg  text-mainGreen inline-block" > {t('stone details')} </span>
    </div>
      <div className="p-2">
        <div/>
        <table className='border-mainGreen shadow-lg mb-2 text-center text-[.8rem] font-light'>
          <thead className='bg-mainGreen text-white'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan} className='p-4 border-l-2 border-l-lightGreen first:rounded-r-lg last:rounded-l-lg last:rounded-b-none first:rounded-b-none min-w-[120px] md:min-w-[80px] lg:min-w-[110px] lg:max-w-[130px] whitespace-nowrap items-start pe-2'>
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
                <tr key={row.id} className='border-l-2 border-l-flatWhite text-center h-[40px]'>
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
          <tfoot className='h-[40px]' >
            {table.getRowModel().rows.map(row => {
              return <td colSpan={10} className='text-start px-4' key={row.id}>
                   {row.original.details} :<span className="text-l font-bold">{t('stone description')} </span> 
                </td>
            }).slice(0, 1)}
          </tfoot>
        </table>
        <div className="h-2" />
      </div>
    </>
  )
}