/////////// IMPORTS
import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/atoms"
import { Header } from "../../components/atoms/Header"
import { EditIcon, ViewIcon } from "../../components/atoms/icons"
import { SvgDelete } from "../../components/atoms/icons/SvgDelete"
import { Modal } from "../../components/molecules"
import { Loading } from "../../components/organisms/Loading"
import { EmptyDataView } from "../../components/templates/reusableComponants/EmptyDataView"
import { Table } from "../../components/templates/reusableComponants/tantable/Table"
import AddSupplier from "../../components/templates/systemEstablishment/supplier/AddSupplier"
import { useFetch, useMutate } from "../../hooks"
import { mutateData } from "../../utils/mutateData"
import { notify } from "../../utils/toast"
import { Back } from "../../utils/utils-components/Back"

///
///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///
type SupplierProps_TP = {
  title: string
}

export type supplier = {
  id: string
  name: string
  type: "local" | "global"
  is_mediator: boolean
  tax: string
  nationalAddress: {
    district: { id: string }
    building_number: string
    street_number: string
    sub_number: string
    zip_code: string
  }
  company_name: string
  country_name: string
  country_id: string
  city_id: string
  city_name: string
  address: string
  phone: string
  email: `${string}@${string}.${string}`
  fax: string
  nationality_name: string
  nationality_id: string
  national_number: string
  national_expire_date: string
  logo: string
  mobile: string
  document: {
    id: string
    data: {
      docName: string
      docNumber: string
      docType: { label: string }
      endDate: string
      id: string
      reminder: string
    }
    file: string
  }[]
}
///
export const AllSuppliers = ({ title }: SupplierProps_TP) => {
  /////////// VARIABLES
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState<supplier>()
  const [deleteData, setDeleteData] = useState<supplier>()
  const [dataSource, setDataSource] = useState<supplier[]>([])
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<supplier>[]>(
    () => [
      {
        cell: (info) => info.getValue(),
        accessorKey: "id",
        header: () => <span>{t("Sequence")} </span>,
      },
      {
        header: () => <span>{t("supplier")} </span>,
        accessorKey: "name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("action")}</span>,
        accessorKey: "action",
        cell: (info) => {
          return (
            <div className="flex items-center justify-center gap-4">
              <EditIcon
                size={15}
                action={() => {
                  setOpen((prev) => !prev)
                  setEditData(info.row.original)
                  setModel(true)
                }}
              />
              <SvgDelete
                action={() => {
                  setOpen((prev) => !prev)
                  setDeleteData(info.row.original)
                  setModel(false)
                }}
                stroke="#ef4444"
              />
              <ViewIcon
                size={15}
                action={() => {
                  navigate(`${info.row.original.id}`)
                }}
              />
            </div>
          )
        },
      },
    ],
    []
  )
  ///
  let count = 1

  const {
    data: suppliers,
    isError,
    isSuccess,
    error,
    isFetching
  } = useFetch<supplier[]>({
    endpoint: "/supplier/api/v1/suppliers",
    queryKey: ["suppliers"],
    select: (suppliers) =>
      suppliers.map((supplier) => ({
        ...supplier,
        index: count++,
      })),
    onSuccess(data) {
      setDataSource(data)
    },
    onError: (err) => console.log(err),
  })
    console.log("🚀 ~ file: AllSuppliers.tsx:151 ~ AllSuppliers ~ suppliers:", suppliers)

  ///
  /////////// CUSTOM HOOKS
  ///

  // const dataSuppliers = suppliers ? suppliers : []

  ///
  /////////// STATES
  ///

  const [showSuppliers, setShowSuppliers] = useState(false)

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///
  const {
    mutate,
    error: mutateError,
    isLoading: mutateLoading,
  } = useMutate<supplier>({
    mutationFn: mutateData,
    onSuccess: () => {
      setDataSource((prev: supplier[]) =>
        prev.filter((p) => p.id !== deleteData?.id)
      )
      setOpen(false)
      notify("success")
    },
  })
  const handleSubmit = () => {
    mutate({
      endpointName: `/supplier/api/v1/suppliers/${deleteData?.id}`,
      method: "delete",
    })
  }
  ///
  return (
    <div className="p-4">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isError && (
        <div className=" m-auto">
          <Header
            className="text-center text-2xl font-bold"
            header={t(`some thing went wrong ${error?.message}`)}
          />
        </div>
      )}
      {isFetching && <Loading mainTitle={t("View Suppliers")} />}
      { (!isFetching && isSuccess && !!!dataSource?.length) && (
        <EmptyDataView>
          <AddSupplier title={"اضافة مورد"} />
        </EmptyDataView>
      )}
      {isSuccess && !!dataSource && !!dataSource.length && (
        <>
          {/* <div className="flex justify-between my-3">
            <h2 className="font-bold text-2xl">{t("show suppliers")}</h2>

            <Button action={() => navigate(-1)} bordered>
              {t("Back")}
            </Button>
          </div> */}
          <div className="flex justify-end mb-2">
            <Back/>
          </div>

          {isSuccess && !!dataSource && !!dataSource.length && (
            <Table data={dataSource} showNavigation columns={columns} />
          )}
        </>
      )}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        {model ? (
          <AddSupplier
            title={"اضافة مورد"}
            editData={editData}
            setDataSource={setDataSource}
            setShow={setOpen}
          />
        ) : (
          <div className="flex flex-col gap-8 justify-center items-center">
            <Header header={` حذف : ${deleteData?.name}`} />
            <div className="flex gap-4 justify-center items-cent">
              <Button action={handleSubmit} variant="danger">
                تاكيد
              </Button>
              <Button>اغلاق</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
