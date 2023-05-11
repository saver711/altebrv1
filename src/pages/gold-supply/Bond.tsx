import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { BondTotals } from "../../components/gold-supply/BondTotals"
import { Loading } from "../../components/organisms/Loading"
import { Table } from "../../components/templates/reusableComponants/tantable/Table"
import { useFetch } from "../../hooks"

type BondProps_TP = {
  title: string
}

export type Box_TP = {
  id: number
  accountable_type: string
  accountable_id: number
  account: string
  value: number
  unit_id: "reyal and gram" | "gram" | "reyal"
  computational_movement: "creditor" | "debtor"
  text: "test"
}

type TableRow_TP = {
  category: {
    name: string
    name_ar: string
    name_en: string
  }
  goldWeight: number
  stocks: number
  id: string
  gold_wage: number
  payoffTaxes: number
  wage: number
  totalWage: number
  goldKarat: {
    name: string
  }
}

type Contract_TP = {
  id: number
  bond_number: number
  bond_date: string
  classification: "gold"
  supplier_name: string
  entity_gold_price: number
  items: TableRow_TP[]
  boxes: Box_TP[]
}

export const Bond = ({ title }: BondProps_TP) => {
  const { bondID } = useParams()

  const { 
    data: contract, 
    isError,
    isLoading,
    isSuccess,
    isFetching,
    failureReason
  } = useFetch<Contract_TP>({
    endpoint: `twredGold/api/v1/bond/${bondID}`,
    queryKey: ['one_bond'],
    onSuccess: (data) => {
      console.log('dsdsd')
      console.log(data)
    },
    select: (contract) => ({
      id: contract.id,
      bond_number: contract.bond_number,
      // entity_gold_price: contract.entity_gold_price,
      bond_date: contract.bond_date,
      classification: contract.classification,
      supplier_name: contract.supplier_name,
      items: contract.items.map(item => {
        return {
          itemType: item.category.name,
          itemStock: item.stocks,
          itemTaxes: item.totalWage,
          payoffTaxes: item.totalWage,
          entity_gold_price: contract.entity_gold_price,
          id: item.id,
          goldKarat: item.goldKarat.name,
          goldWeight: item.goldWeight,
          wage: item.wage,
          totalWage: item.totalWage,
        }
      }),
      boxes: contract.boxes.map(box => {
        return {
          id: box.id,
          account: box.account,
          value: box.value,
          unit_id: box.unit_id,
          computational_movement: box.computational_movement
        }
      })
    }),
  })

  const cols1 = useMemo<ColumnDef<TableRow_TP>[]>(
    () => [
      {
        header: `${t('category')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'itemType',
      },
      {
        header: `${t('weight')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'goldWeight',
      },
      {
        header: `${t('karat')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'goldKarat',
      },
      {
        header: `${t('stocks')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'itemStock',
      },
      {
        header: `${t('wage')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'wage',
      },
      {
        header: `${t('gold price')}`,
        cell: (info) => info.row.original.entity_gold_price,
        accessorKey: 'entity_gold_price',
      },
      {
        header: `${t('total wages')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'totalWage',
      },
      {
        header: `${t('wage tax')}`,
        cell: (info) => parseFloat((Number(info.renderValue()) * (15/100)).toFixed(3)),
        accessorKey: 'payoffTaxes',
      },
      {
        header: `${t('gold tax')}`,
        cell: (info) => ((Number(info.row.original.goldWeight) * Number(info.row.original.entity_gold_price) * 15 * Number(info.row.original.itemStock)) / 100).toFixed(3).replace(/\.?0+$/, ''),
        accessorKey: 'goldTaxes',
      },
      {
        header: `${t('total tax')}`,
        cell: (info) => (((Number(info.row.original.goldWeight) * Number(info.row.original.entity_gold_price) * 15 * Number(info.row.original.itemStock)) / 100) + (Number(info.renderValue()) * (15/100))).toFixed(3).replace(/\.?0+$/, ''),
        accessorKey: 'itemTaxes',
      },
    ],
    []
  )

  const cols2 = useMemo<ColumnDef<TableRow_TP>[]>(
    () => [
      {
        header: `${t('description')}`,
        cell: (info) => info.renderValue(),
        accessorKey: 'bian',
      },
      {
        header: `${t('gram (debtor)')}`,
        cell: (info) => info.renderValue().toFixed(3).replace(/\.?0+$/, ''),
        accessorKey: 'debtor_gram',
      },
      {
        header: `${t('reyal (debtor)')}`,
        cell: (info) => info.renderValue().toFixed(3).replace(/\.?0+$/, ''),
        accessorKey: 'debtor_SRA',
      },      
      {
        header: `${t('gram (creditor)')}`,
        cell: (info) => info.renderValue().toFixed(3).replace(/\.?0+$/, ''),
        accessorKey: 'creditor_gram',
      },
      {
        header: `${t('reyal (creditor)')}`,
        cell: (info) => info.renderValue().toFixed(3).replace(/\.?0+$/, ''),
        accessorKey: 'creditor_SRA',
      }
    ],
    []
  );

  let restrictions = contract?.boxes?.map(
    ({ account, computational_movement, unit_id, value }) => ({
      bian: account,
      debtor_gram:
        computational_movement === "debtor" && unit_id === "gram" ? value : 0,
      debtor_SRA:
        computational_movement === "debtor" && unit_id === "reyal" ? value : 0,
      creditor_gram:
        computational_movement === "creditor" && unit_id === "gram" ? value : 0,
      creditor_SRA:
        computational_movement === "creditor" && unit_id === "reyal" ? value : 0,
    })
  );

  // group by account
  const restrictionsWithoutTotals = restrictions?.reduce((prev, curr) => {
    const index = prev.findIndex((item) => item.bian === curr.bian);
    if (index === -1) {
      prev.push(curr);
    } else {
      prev[index].debtor_gram += curr.debtor_gram;
      prev[index].debtor_SRA += curr.debtor_SRA;
      prev[index].creditor_gram += curr.creditor_gram;
      prev[index].creditor_SRA += curr.creditor_SRA;
    }
    return prev;
  }, [] as typeof restrictions);

  restrictions = restrictionsWithoutTotals;

  let restrictionsTotals;
  if (restrictions && !!restrictions.length) {
    restrictionsTotals = restrictions?.reduce((prev, curr) => ({
      bian: `${t('totals')}`,
      debtor_gram: prev.debtor_gram + curr.debtor_gram,
      debtor_SRA: prev.debtor_SRA + curr.debtor_SRA,
      creditor_gram: prev.creditor_gram + curr.creditor_gram,
      creditor_SRA: prev.creditor_SRA + curr.creditor_SRA,
    }));
  }

  if (restrictionsTotals) restrictions?.push(restrictionsTotals!);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isError && <h2 className="text-mainRed">{failureReason?.response.data.message}</h2>}
      {(isLoading || isFetching) && <Loading mainTitle={t('bond total')} />}
      {!(isLoading || isFetching) && isSuccess && !!contract?.boxes?.length && (
        <BondTotals boxesData={contract?.boxes} />
      )}
      {isSuccess && !!!contract?.boxes?.length && !isLoading && !isFetching && (
        <h2 className="text-center">لايوجد إجماليات</h2>
      )}
      {!(isLoading || isFetching) && isSuccess && !!contract?.items?.length && (
        <div className="my-9">
          <Table data={contract.items} showNavigation columns={cols1} />
        </div>
      )}
      {isSuccess && !!!contract?.items?.length && !isLoading && !isFetching && (
        <h2 className="text-center">لايوجد بنود</h2>
      )}
      {!(isLoading || isFetching) && isSuccess && !!restrictions?.length && (
        <>
          <h2 className="text-xl mb-5 font-bold">{t('accounting entry')}</h2>
          <Table data={restrictions} footered showNavigation columns={cols2} />
        </>
      )}
    </>
  )
}
