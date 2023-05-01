/////////// IMPORTS
///
//import classes from './Districts.module.css'
///
/////////// Types

import { t } from "i18next"
import { useMemo, useState } from "react"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { useFetch, useMutate } from "../../../../hooks"
import { ColumnTP } from "../../../molecules/table/types"
import { Loading } from "../../../organisms/Loading"
import { Header } from "../../../atoms/Header"
import { BaseInput, Button, Label } from "../../../atoms"
import { useQueryClient } from "@tanstack/react-query"
import { Table } from "../../reusableComponants/tantable/Table"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, ViewIcon } from "../../../atoms/icons"
import { SvgDelete } from "../../../atoms/icons/SvgDelete"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { Modal } from "../../../molecules"
import { AddDistrict } from "../AddDistrict"
import { EmptyDataView } from "../../reusableComponants/EmptyDataView"

///
export type ViewDistricts_TP = {
  city_id: string
  city_name: string
  country_name: string
  country_id: string
  id: string
  name: string
}

/////////// HELPER VARIABLES & FUNCTIONS
///

// const ninja2Columns = [
//   {
//     name: "index",
//     label: "code",
//   },
//   {
//     name: "name",
//     label: t("Districts"),
//   },
//   {
//     name: "actions",
//     label: "Actions",
//     actions: [
//       {
//         label: "Edit",
//         icon: (
//           <AiFillEdit
//             onClick={(row) => {
//               alert(`Trying to edit row ${row}`)
//             }}
//           />
//         ),
//       },
//       {
//         label: "Delete",
//         icon: (
//           <AiFillDelete
//             className="text-red-700"
//             onClick={(row) => {
//               alert(`Trying to delete row ${row}`)
//             }}
//           />
//         ),
//       },
//     ],
//   },
// ] as ColumnTP[]

///
export const ViewDistricts = () => {
  /////////// CUSTOM HOOKS
  ///
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState<ViewDistricts_TP>()
  const [deleteData, setDeleteData] = useState<ViewDistricts_TP>()
  const [dataSource, setDataSource] = useState<ViewDistricts_TP[]>([])

  const columns = useMemo<ColumnDef<ViewDistricts_TP>[]>(
    () => [
      {
        cell: (info) => info.getValue(),
        accessorKey: "id",
        header: () => <span>{t("Sequence ")} </span>,
      },
      {
        header: () => <span>{t("Districts")} </span>,
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
    ViewDistricts_TP[]
  >({
    endpoint: `/governorate/api/v1/districts`,
    queryKey: [`AllDistricts`],
    select: (districts) =>
      districts.map((district) => ({
        ...district,
        index: count++,
      })),
    onSuccess(data) {
      setDataSource(data)
    },
  })
  const {
    mutate,
    error: mutateError,
    isLoading: mutateLoading,
  } = useMutate<ViewDistricts_TP>({
    mutationFn: mutateData,
    onSuccess: () => {
      setDataSource((prev: ViewDistricts_TP[]) =>
        prev.filter((p) => p.id !== deleteData?.id)
      )
      setOpen(false)
      notify("success")
    },
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
  ///
  /////////// SIDE EFFECTS
  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

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
      {isLoading && <Loading mainTitle={t("districts")} />}
      {isSuccess && !!!dataSource?.length && (
        <EmptyDataView>
          <AddDistrict />
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
          <AddDistrict
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
