import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/atoms"
import { Header } from "../../components/atoms/Header"
import { AddIcon, ViewIcon } from "../../components/atoms/icons"
import { BondTotals } from "../../components/gold-supply/BondTotals"
import { Loading } from "../../components/organisms/Loading"
import { Table } from "../../components/templates/reusableComponants/tantable/Table"
import { useFetch, useIsRTL } from "../../hooks"

type BondsProps_TP = {
  title: string
}

export type Bond_TP = {
  id: number
  classification: string
  twred_type: string
  supplier_name: string
  bond_date: string
  total_gold_by_24: number
  total_money: number
  item_count: number
  bond_number: number
  allboxes: []
}

export const Bonds = ({ title }: BondsProps_TP) => {
  const isRTL = useIsRTL()
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState<Bond_TP[]>([])
  const [page, setPage] = useState<number>(1)

  let count = 1
  const { data, isError, isSuccess, error, refetch, isRefetching, isLoading } = useFetch<Bond_TP[]>({
    endpoint: `twredGold/api/v1/bond?page=${page}`,
    queryKey: ["bonds"],
    pagination: true,
    onSuccess(data) {
      setDataSource(data.data)
      console.log(data.data)
    },
    select(data) {
      return {
        ...data,
        data: data.data.map((item, i) => ({
          ...item,
          index: i + 1,
        })),
      }
    },
  })

  const columns = useMemo<ColumnDef<Bond_TP>[]>(
    () => [
      {
        cell: (info) => info.getValue(),
        accessorKey: "index",
        header: () => <span>{t("Sequence ")}</span>,
      },
      {
        header: () => <span>{t("classifications")} </span>,
        accessorKey: "classification",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("supply type")} </span>,
        accessorKey: "twred_type",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("supplier name")} </span>,
        accessorKey: "supplier_name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("bond date")} </span>,
        accessorKey: "bond_date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("total gold by 24")} </span>,
        accessorKey: "total_gold_by_24",
        cell: (info) => info.getValue().toFixed(3).replace(/\.?0+$/, ''),
      },
      {
        header: () => <span>{t("total money")} </span>,
        accessorKey: "total_money",
        cell: (info) => info.getValue().toFixed(3).replace(/\.?0+$/, ''),
      },
      {
        header: () => <span>{t("item count")} </span>,
        accessorKey: "item_count",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("bond number")} </span>,
        accessorKey: "bond_number",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("view")}</span>,
        accessorKey: "action",
        cell: (info) => {
          return (
            <div className="flex items-center justify-center gap-4">
              <ViewIcon
                size={15}
                action={() => {
                  navigate(`/bonds/${info.row.original.id}`)
                }}
              />
            </div>
          )
        },
      },
    ],
    []
  )

  useEffect(() => {
    refetch()
  }, [page])
   
  // if(dataSource.length === 0) return(
  //   <>
  //   <div className="flex justify-between mb-5">
  //       <h2 className="font-bold text-2xl">{t("bonds")}</h2>
  //       <Button
  //         action={() => navigate(`/bonds/gold`)}
  //         className="flex items-center gap-2"
  //       >
  //         <AddIcon /> {t("add bond")}
  //       </Button>
  //     </div>
  //     <h2 className="text-center font-bold text-2xl mt-40" >{t('There are no bonds')}</h2>
  //   </>
  // )
  return (
    <div className="p-4">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isSuccess &&
          !!dataSource &&
          !isLoading &&
          !isRefetching &&
          !!dataSource.length && (
        <BondTotals title={'total bonds'} boxesData={dataSource[0].allboxes} />
      )}
      <div className="flex justify-between my-5">
        <h3 className="text-2xl">{t("bonds")}</h3>
        <Button
          action={() => navigate(`/bonds/gold`)}
          className="flex items-center gap-2"
        >
          <AddIcon /> {t("add bond")}
        </Button>
      </div>
      {(isLoading || isRefetching) && <Loading mainTitle={t("Bonds")} />}
      {isSuccess && !!!dataSource && !isLoading && !isRefetching && !!dataSource.length && (
          <div className="mb-5 pr-5">
            <Header
              header={t('no items')}
              className="text-center text-2xl font-bold"
            />
          </div>
      )}
      {/* {!(isLoading) && isSuccess && !!data[0]?.boxes?.length && (
        <BondTotals boxesData={data[0]?.boxes} />
      )} */}
      <div className="" >
      {isSuccess &&
          !!dataSource &&
          !isLoading &&
          !isRefetching &&
          !!dataSource.length && (
            <>
              <Table data={dataSource} columns={columns}>
                <div className="mt-3 flex items-center justify-end gap-5 p-2">
                  <div className="flex items-center gap-2 font-bold">
                    {t('page')}
                    <span className=" text-mainGreen">
                      {data.current_page}
                    </span>
                    {t('from')}
                    <span className=" text-mainGreen">{data.pages}</span>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <Button
                      className=" rounded bg-mainGreen p-[.18rem] "
                      action={() => setPage((prev) => prev - 1)}
                      disabled={page == 1}
                    >
                      {isRTL ? <MdKeyboardArrowRight className="h-4 w-4 fill-white" /> : <MdKeyboardArrowLeft className="h-4 w-4 fill-white" />}
                    </Button>
                    <Button
                      className=" rounded bg-mainGreen p-[.18rem] "
                      action={() => setPage((prev) => prev + 1)}
                      disabled={page == data.pages}
                    >
                      {isRTL ? <MdKeyboardArrowLeft className="h-4 w-4 fill-white" /> : <MdKeyboardArrowRight className="h-4 w-4 fill-white" />}
                    </Button>
                  </div>
                </div>
              </Table>
            </>
          )}
      </div>
      {isSuccess && !!!dataSource && !isLoading && !isRefetching && !!dataSource.length && (
          <div className="mb-5 pr-5">
            <Header
              header={t('no items')}
              className="text-center text-2xl font-bold"
            />
          </div>
        )}
    </div>
  )
}
