/////////// IMPORTS
///
//import classes from './Karats.module.css'
///
/////////// Types

import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { useFetch, useIsRTL, useMutate } from "../../../../hooks"
import NinjaTable from "../../../molecules/NinjaTable"
import { ColumnTP } from "../../../molecules/table/types"
import { Loading } from "../../../organisms/Loading"
import { Header } from "../../../atoms/Header"
import { BaseInput, Button, Label } from "../../../atoms"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, ViewIcon } from "../../../atoms/icons"
import { SvgDelete } from "../../../atoms/icons/SvgDelete"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { Table } from "../../reusableComponants/tantable/Table"
import { BaseInputField, Modal } from "../../../molecules"
import { EmptyDataView } from "../../reusableComponants/EmptyDataView"
import CreateKarat from "../../reusableComponants/karats/create/CreateKarat"
import { Back } from "../../../../utils/utils-components/Back"
import { Form, Formik } from "formik"
import { BiSearchAlt } from "react-icons/bi"
import { AddButton } from "../../../molecules/AddButton"
import * as Yup from 'yup'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { useQueryClient } from "@tanstack/react-query"
///
export type ViewKarats_TP = {
  id: string
  name: string
  equivalent: number
}

type Search_TP = {
  search: string
}

const initialValues: Search_TP = {
  search: ''
}

const validationSchema = Yup.object({
  search: Yup.string().trim()
})

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const ViewKarats = () => {
  /////////// CUSTOM HOOKS
  ///
  const isRTL = useIsRTL()
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState<ViewKarats_TP>()
  const [deleteData, setDeleteData] = useState<ViewKarats_TP>()
  const [dataSource, setDataSource] = useState<ViewKarats_TP[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState<number>(1)
  const columns = useMemo<ColumnDef<ViewKarats_TP>[]>(
    () => [
      {
        cell: (info) => info.getValue(),
        accessorKey: "index",
        header: () => <span>{t("Sequence ")} </span>,
      },
      {
        header: () => <span>{t("karats")} </span>,
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
              <ViewIcon action={() => console.log("view", info.row.original)} />
            </div>
          )
        },
      },
    ],
    []
  )
  let count = 1
  const {
    data: karats,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isSuccess,
  } = useFetch<ViewKarats_TP[]>({
    // endpoint: `/classification/api/v1/karats`,
    endpoint: search === '' 
    ? `classification/api/v1/karats?page=${page}`
    : `classification/api/v1/karats?page=${page}&name[lk]=${search}`,
    queryKey: [`AllKarats`],
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
  })
  const queryClient = useQueryClient()
  const {
    mutate,
    error: mutateError,
    isLoading: mutateLoading,
  } = useMutate<ViewKarats_TP>({
    mutationFn: mutateData,
    onSuccess: () => {
      // setDataSource((prev: ViewKarats_TP[]) =>
      //   prev.filter((p) => p.id !== deleteData?.id)
      // )
      queryClient.refetchQueries(['AllKarats'])
      setOpen(false)
      notify("success")
    },
  })
  const handleSubmit = () => {
    mutate({
      endpointName: `/classification/api/v1/karats/${deleteData?.id}`,
      method: "delete",
    })
  }
  /////////// VARIABLES
  ///

  ///
  ///
  /////////// STATES
  ///
  ///
  /////////// SIDE EFFECTS
  ///
  console.log(karats)
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
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
      <div className="flex justify-between align-middle mb-8">
        <h3 className="font-bold">
          {`${t("system establishment")} / ${t("karats")}`}
        </h3>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            setSearch(values.search)
          }}
          validationSchema={validationSchema}
        >
          <Form className="flex align-middle gap-2">
            <BaseInputField
              id="search"
              name="search"
              type="text"
              placeholder={`${t("search")}`}
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
        {(isLoading || isRefetching) && <Loading mainTitle={t("karats")} />}
        {isSuccess && !!!dataSource && !isLoading && !isRefetching && !!dataSource.length && (
          <div className="mb-5 pr-5">
            <Header
              header={t('no items')}
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
                  {t('page')}
                  <span className=" text-mainGreen">
                    {karats.current_page}
                  </span>
                  {t('from')}
                  <span className=" text-mainGreen">{karats.pages}</span>
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
                    disabled={page == karats.pages}
                  >
                    {isRTL ? <MdKeyboardArrowLeft className="h-4 w-4 fill-white" /> : <MdKeyboardArrowRight className="h-4 w-4 fill-white" />}
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
            <CreateKarat
              editData={editData}
              setDataSource={setDataSource}
              setShow={setOpen}
            />
          ) : (
            <div className="flex flex-col gap-8 justify-center items-center">
              <Header header={`${t('delete')} : ${deleteData?.name}`} />
              <div className="flex gap-4 justify-center items-cent">
                <Button action={handleSubmit} loading={mutateLoading} variant="danger">
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
