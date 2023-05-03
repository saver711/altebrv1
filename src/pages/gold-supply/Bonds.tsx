import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/atoms"
import { AddIcon, ViewIcon } from "../../components/atoms/icons"
import { Loading } from "../../components/organisms/Loading"
import { Table } from "../../components/templates/reusableComponants/tantable/Table"
import { useFetch } from "../../hooks"

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
}

export const Bonds = ({ title }: BondsProps_TP) => {
  const navigate = useNavigate()

  let count = 1
  const { data, isError, isSuccess, error, isLoading } = useFetch<Bond_TP[]>({
    endpoint: "/twredGold/api/v1/bond",
    queryKey: ["bonds"],
    select: (data) =>
      data.map((item) => ({
        ...item,
        index: count++,
      })),
  })

  const columns = useMemo<ColumnDef<Bond_TP>[]>(
    () => [
      {
        cell: (info) => info.getValue(),
        accessorKey: "index",
        header: () => <span>{t("index")} </span>,
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
        header: () => <span>{t("document date")} </span>,
        accessorKey: "bond_date",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("total gold by 24")} </span>,
        accessorKey: "total_gold_by_24",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("total money")} </span>,
        accessorKey: "total_money",
        cell: (info) => info.getValue(),
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

  return (
    <div className="p-4">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-2xl">{t("bonds")}</h2>
        <Button
          action={() => navigate(`/bonds/gold`)}
          className="flex items-center gap-2"
        >
          <AddIcon /> {t("add bond")}
        </Button>
      </div>
      {isLoading && <Loading mainTitle={t("View Bonds")} />}
      <div className="">
        {isSuccess && data.length > 0 && (
          <Table data={data} showNavigation columns={columns} />
        )}
      </div>
      {isSuccess && data.length === 0 && (
        <div>
          <p>لا يوجد سندات</p>
          <Button
            action={() => navigate(`/bonds/gold`)}
            className="flex items-center gap-2"
          >
            <AddIcon /> {t("Add bond")}
          </Button>
        </div>
      )}
    </div>
  )
}
