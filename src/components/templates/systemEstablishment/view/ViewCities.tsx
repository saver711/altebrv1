/////////// IMPORTS
///
//import classes from './Cities.module.css'
///
/////////// Types

import { t } from "i18next"
import { useMemo, useState } from "react"
import { useFetch, useMutate } from "../../../../hooks"
import { Loading } from "../../../organisms/Loading"
import { Header } from "../../../atoms/Header"
import { BaseInput, Button, Label } from "../../../atoms"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, ViewIcon } from "../../../atoms/icons"
import { SvgDelete } from "../../../atoms/icons/SvgDelete"
import { Modal } from "../../../molecules"
import { AddCities } from "../AddCities"
import { useQueryClient } from "@tanstack/react-query"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { Table } from "../../reusableComponants/tantable/Table"
import { EmptyDataView } from "../../reusableComponants/EmptyDataView"
import { Back } from "../../../../utils/utils-components/Back"

///
export type ViewCities_TP = {
  id: string
  name: string
  country_id: string
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const ViewCities = () => {
  /////////// CUSTOM HOOKS
  ///
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState<ViewCities_TP>()
  const [deleteData, setDeleteData] = useState<ViewCities_TP>()
  const [dataSource, setDataSource] = useState<ViewCities_TP[]>([])
  const columns = useMemo<ColumnDef<ViewCities_TP>[]>(
    () => [
      {
        cell: (info) => info.getValue(),
        accessorKey: "id",
        header: () => <span>{t("Sequence ")} </span>,
      },
      {
        header: () => <span>{t("cities")} </span>,
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
    ViewCities_TP[]
  >({
    endpoint: `/governorate/api/v1/cities`,
    queryKey: [`AllCities`],
    select: (cities) =>
      cities.map((city) => ({
        ...city,
        index: count++,
      })),
    onSuccess(data) {
      setDataSource(data)
    },
  })

  /////////// VARIABLES
  ///
  ///
  ///
  /////////// STATES
  ///
  ///
  /////////// SIDE EFFECTS
  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  const queryClient = useQueryClient()
  const {
    mutate,
    error: mutateError,
    isLoading: mutateLoading,
  } = useMutate<ViewCities_TP>({
    mutationFn: mutateData,
    onSuccess: () => {
      setDataSource((prev: ViewCities_TP[]) =>
        prev.filter((p) => p.id !== deleteData?.id)
      )
      setOpen(false)
      notify("success")
    },
  })
  const handleSubmit = () => {
    mutate({
      endpointName: `/governorate/api/v1/cities/${deleteData?.id}`,
      method: "delete",
    })
  }
  ///
  return (
    <div className="p-4">
      {isError && (
        <div className=" m-auto">
          <Header
            className="text-center text-2xl font-bold"
            header={t(`some thing went wrong ${error.message}`)}
          />
        </div>
      )}
      {isLoading && <Loading mainTitle={t("cities")} />}
      {isSuccess && !!!dataSource?.length && (
        <EmptyDataView>
          <AddCities />
        </EmptyDataView>
      )}
      {!isLoading && (
        <div className="flex justify-end mb-2">
          <Back />
        </div>
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
          <AddCities
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

