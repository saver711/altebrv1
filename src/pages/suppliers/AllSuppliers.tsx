/////////// IMPORTS
import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/atoms"
import { Header } from "../../components/atoms/Header"
import { EditIcon, ViewIcon } from "../../components/atoms/icons"
import { SvgDelete } from "../../components/atoms/icons/SvgDelete"
import { BaseInputField, Modal } from "../../components/molecules"
import { Loading } from "../../components/organisms/Loading"
import { EmptyDataView } from "../../components/templates/reusableComponants/EmptyDataView"
import { Table } from "../../components/templates/reusableComponants/tantable/Table"
import AddSupplier from "../../components/templates/systemEstablishment/supplier/AddSupplier"
import { useFetch, useIsRTL, useMutate } from "../../hooks"
import { mutateData } from "../../utils/mutateData"
import { notify } from "../../utils/toast"
import { Back } from "../../utils/utils-components/Back"
import * as Yup from "yup"
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { BiSearchAlt } from "react-icons/bi"
import { AddButton } from "../../components/molecules/AddButton"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
///
///
/////////// Types
///

type Search_TP = {
  search: string
}

const initialValues: Search_TP = {
  search: "",
}

const validationSchema = Yup.object({
  search: Yup.string().trim(),
})

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
  const isRTL = useIsRTL()
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState<supplier>()
  const [deleteData, setDeleteData] = useState<supplier>()
  const [dataSource, setDataSource] = useState<supplier[]>([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState<number>(1)
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<supplier>[]>(
    () => [
      {
        cell: (info) => info.getValue(),
        accessorKey: "index",
        header: () => <span>{t("Sequence ")} </span>,
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
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
    isRefetching,
    isFetching,
  } = useFetch<supplier[]>({
    endpoint:
      search === ""
        ? `supplier/api/v1/suppliers?page=${page}`
        : `supplier/api/v1/suppliers?page=${page}&name[lk]=${search}`,
    queryKey: ["suppliers"],
    pagination: true,
    onSuccess(data) {
      setDataSource(data.data)
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
    onError: (err) => console.log(err),
  })
  console.log(
    "🚀 ~ file: AllSuppliers.tsx:151 ~ AllSuppliers ~ suppliers:",
    suppliers
  )

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
  const queryClient = useQueryClient()
  const {
    mutate,
    error: mutateError,
    isLoading: mutateLoading,
  } = useMutate<supplier>({
    mutationFn: mutateData,
    onSuccess: () => {
      // setDataSource((prev: supplier[]) =>
      //   prev.filter((p) => p.id !== deleteData?.id)
      // )
      queryClient.refetchQueries(["suppliers"])
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
  useEffect(() => {
    refetch()
  }, [page])

  useEffect(() => {
    if (page == 1) {
      refetch()
    } else {
      setPage(1)
    }
  }, [search])
  ///

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="flex justify-between align-middle mb-8">
        <h3 className="font-bold">
          {`${t("system establishment")} / ${t("suppliers")}`}
        </h3>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            setSearch(values.search)
          }}
          validationSchema={validationSchema}
        >
          <Form className="flex gap-2 items-center rounded-md border-2 border-slate-200 p-1">
            <BaseInputField
              id="search"
              name="search"
              type="text"
              placeholder={`${t("search")}`}
              className="placeholder-slate-400 p-[.18rem] !shadow-transparent focus:border-transparent"
            />
            <Button type="submit" disabled={isRefetching}>
              <BiSearchAlt
                className={isRefetching ? "fill-mainGreen" : "fill-white"}
              />
            </Button>
          </Form>
        </Formik>
        <div className="flex">
          <AddButton
            action={() => {
              setEditData(undefined)
              setModel(true)
              setOpen(true)
            }}
            addLabel={`${t("add")}`}
          />
          <div className="ms-2">
            <Back />
          </div>
        </div>
      </div>
      {isError && (
        <div className=" m-auto">
          <Header
            className="text-center text-2xl font-bold"
            header={t(`some thing went wrong ${error.message}`)}
          />
        </div>
      )}
      <div className="flex flex-col gap-6 items-center">
        {(isLoading || isRefetching) && <Loading mainTitle={t("suppliers")} />}
        {isSuccess &&
          !!!dataSource &&
          !isLoading &&
          !isRefetching &&
          !!dataSource.length && (
            <div className="mb-5 pr-5">
              <Header
                header={t("no items")}
                className="text-center text-2xl font-bold"
              />
            </div>
          )}
        {isSuccess &&
          !!dataSource &&
          !isLoading &&
          !isRefetching &&
          !!dataSource.length && (
            <Table data={dataSource} columns={columns}>
              <div className="mt-3 flex items-center justify-end gap-5 p-2">
                <div className="flex items-center gap-2 font-bold">
                  {t("page")}
                  <span className=" text-mainGreen">
                    {suppliers.current_page}
                  </span>
                  {t("from")}
                  <span className=" text-mainGreen">{suppliers.pages}</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <Button
                    className=" rounded bg-mainGreen p-[.18rem] "
                    action={() => setPage((prev) => prev - 1)}
                    disabled={page == 1}
                  >
                    {isRTL ? (
                      <MdKeyboardArrowRight className="h-4 w-4 fill-white" />
                    ) : (
                      <MdKeyboardArrowLeft className="h-4 w-4 fill-white" />
                    )}
                  </Button>
                  <Button
                    className=" rounded bg-mainGreen p-[.18rem] "
                    action={() => setPage((prev) => prev + 1)}
                    disabled={page == suppliers.pages}
                  >
                    {isRTL ? (
                      <MdKeyboardArrowLeft className="h-4 w-4 fill-white" />
                    ) : (
                      <MdKeyboardArrowRight className="h-4 w-4 fill-white" />
                    )}
                  </Button>
                </div>
              </div>
            </Table>
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
              <Header header={`${t("delete")} : ${deleteData?.name}`} />
              <div className="flex gap-4 justify-center items-cent">
                <Button
                  action={handleSubmit}
                  loading={mutateLoading}
                  variant="danger"
                >
                  {`${t("confirm")}`}
                </Button>
                <Button action={() => setOpen(false)}>{`${t("close")}`}</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  )
}
