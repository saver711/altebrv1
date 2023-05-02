/////////// IMPORTS
///
//import classes from './Countries.module.css'
///
/////////// Types

import { t } from "i18next"
import { useMemo, useState } from "react"
import { useFetch, useMutate } from "../../../../hooks"
import { Loading } from "../../../organisms/Loading"
import { Header } from "../../../atoms/Header"
import { Button } from "../../../atoms"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { EditIcon, ViewIcon } from "../../../atoms/icons"
import { ColumnDef } from "@tanstack/react-table"
import { SvgDelete } from "../../../atoms/icons/SvgDelete"
import { Modal } from "../../../molecules"
import { AddCountry } from "../AddCountry"
import { useQueryClient } from "@tanstack/react-query"
import { Table } from "../../reusableComponants/tantable/Table"
import { EmptyDataView } from "../../reusableComponants/EmptyDataView"
///
export type ViewCountries_TP = {
  id: string
  name: string
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const ViewCountries = () => {
  /////////// CUSTOM HOOKS
  ///
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState<ViewCountries_TP>()
  const [deleteData, setDeleteData] = useState<ViewCountries_TP>()
  const [dataSource, setDataSource] = useState<ViewCountries_TP[]>([])

  const columns = useMemo<ColumnDef<ViewCountries_TP>[]>(
    () => [
      {
        cell: (info) => info.getValue(),
        accessorKey: "id",
        header: () => <span>{t("Sequence")} </span>,
      },
      {
        header: () => <span>{t("countries")} </span>,
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
  const { data, isLoading, isError, error, isSuccess } = useFetch<
    ViewCountries_TP[]
  >({
    endpoint: `/governorate/api/v1/countries`,
    queryKey: [`AllCountries`],
    select: (countries) =>
      countries.map((country) => ({
        ...country,
        index: count++,
      })),
    onSuccess(data) {
      setDataSource(data)
    },
  })

  const queryClient = useQueryClient()
  const {
    mutate,
    error: mutateError,
    isLoading: mutateLoading,
  } = useMutate<ViewCountries_TP>({
    mutationFn: mutateData,
    onSuccess: () => {
      setDataSource((prev: ViewCountries_TP[]) =>
        prev.filter((p) => p.id !== deleteData?.id)
      )
      setOpen(false)
      notify("success")
    },
    // onSuccess: (data) => {
    //   queryClient.setQueryData(["countries"], (old: any) => {
    //     console.log("old", old)
    //     return [
    //       ...(old || []),
    //       {
    //         //@ts-ignore
    //         id: data.id,
    //         name: data?.name,
    //       },
    //     ]
    //   })
    //   notify("success")
    //   setOpen(false)
    // },
  })

  const handleSubmit = () => {
    mutate({
      endpointName: `/governorate/api/v1/countries/${deleteData?.id}`,
      method: "delete",
    })
  }
  /////////// VARIABLES
  ///

  ///
  ///
  /////////// STATES
  ///

  /////////// SIDE EFFECTS
  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
const fake =[{id:'1',name:'llll'}]
  ///
  return (
    <div className="p-4">
      {/* <Table data={fake} showNavigation columns={columns} /> */}

       {isError && (
        <div className=" m-auto">
          <Header
            className="text-center text-2xl font-bold"
            header={t(`some thing went wrong ${error.message}`)}
          />
        </div>
      )}
      {isLoading && <Loading mainTitle={t("countries")} />}
      {isSuccess && !!!dataSource?.length && (
        <EmptyDataView>
          <AddCountry />
        </EmptyDataView>
      )} 
      {isSuccess && !!dataSource && !!dataSource.length && (
        
        <Table data={dataSource} showNavigation columns={columns} />
      )}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        {model ? (
          <AddCountry
            editData={editData}
            setDataSource={setDataSource}
            setShow={setOpen}
          />
        ) : (
          <div className="flex flex-col gap-8 justify-center items-center">
            <Header header={` حذف : ${deleteData?.name}`} />
            <div className="flex gap-4 justify-center items-cent">
              <Button action={handleSubmit} variant="danger">
                {`${t("confirm")}`}
              </Button>
              <Button>{`${t("close")}`}</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
