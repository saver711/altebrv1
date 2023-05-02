/////////// IMPORTS
///
import { useEffect, useMemo, useState } from "react"
import { BaseInputField, Modal } from "../../../../molecules"
import { AddButton } from "../../../../molecules/AddButton"
import { t } from "i18next"
import { useFetch, useIsRTL, useMutate } from "../../../../../hooks"
import { ColumnDef } from '@tanstack/react-table'
import { mutateData } from "../../../../../utils/mutateData"
import { notify } from "../../../../../utils/toast"
import { Button } from "../../../../atoms"
import { Header } from "../../../../atoms/Header"
import { EditIcon } from "../../../../atoms/icons"
import { SvgDelete } from "../../../../atoms/icons/SvgDelete"
import { Loading } from "../../../../organisms/Loading"
import { Table } from "../../tantable/Table"
import CreateStoneNature from "../create/CreateStoneNature"
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import { BiSearchAlt } from "react-icons/bi"

///
/////////// TYPES
///
export type StonesNatures = {
  id: number
  name: string
  name_ar: string
  name_en: string
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

export const ViewStoneNature = () => {
  ///
  /////////// STATES
  ///
  const [dataSource, setDataSource] = useState<StonesNatures[]>([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const [model, setModel] = useState<boolean>(false)
  const [editData, setEditData] = useState<StonesNatures>()
  const [deleteData, setDeleteData] = useState<StonesNatures>()
  ///
  /////////// HELPER VARIABLES & FUNCTIONS
  ///
  const cols = useMemo<ColumnDef<StonesNatures>[]>(
    () => [
      {
        header: 'ID',
        cell: (info) => info.renderValue(),
        accessorKey: 'id',
      },
      {
        header: 'Name',
        cell: (info) => info.renderValue(),
        accessorKey: 'name',
      },
      {
        header: 'Edit',
        cell: (info) =>
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
          </div>,
        accessorKey: 'edit',
      },
    ],
    []
  )
  ///
  /////////// CUSTOM HOOKS
  ///
  const isRTL = useIsRTL()
  const { isLoading, isSuccess, refetch, isRefetching, error } = useFetch<StonesNatures[]>({
    endpoint: search === '' 
    ? 'stones/api/v1/natures' 
    : `stones/api/v1/natures?${isRTL ? 'nameAr' : 'nameEn'}[lk]=${search}`,
    queryKey: ['view_stones_natures'],
    onSuccess(data) { setDataSource(data) }
  })

  const {
    mutate,
    isLoading: isDeleting,
  } = useMutate({
    mutationFn: mutateData,
    onSuccess: () => {
      setDataSource((prev: StonesNatures[]) => prev.filter(p => p.id !== deleteData?.id))
      setOpen(false)
      notify("success")
    }
  })

  const handleSubmit = () => {
    console.log(deleteData?.id)
    mutate({
      endpointName: `stones/api/v1/natures/${deleteData?.id}`,
      method: "delete",
    })
  }

  useEffect(() => {
    refetch()
  }, [search])

  return (
    <>
      <div className="flex justify-between mb-8">
        <h3 className="font-bold">
          {`${t('system establishment')} / ${t('stones natures')}`}
        </h3>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {setSearch(values.search)}}
          validationSchema={validationSchema}
        >
          <Form className="flex align-middle gap-2">
            <BaseInputField
              id="nature_search"
              name="search"
              type="text"
              placeholder={`${t("search")}`}
            />
            <Button type="submit" loading={isRefetching}>
              <BiSearchAlt className={isRefetching ? 'fill-mainGreen' : 'fill-white'} />
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
            addLabel={`${t('add')}`}
          />
        </div>
      </div>
      {error && (
        <div className=" m-auto">
          <Header
            className="text-center text-2xl font-bold"
            header={t(`some thing went wrong ${error.message}`)}
          />
        </div>
      )}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        {model ? (
          <CreateStoneNature value={editData?.name} item={editData} setDataSource={setDataSource} setShow={setOpen} />
        ) : (
          <div className="flex flex-col gap-8 justify-center items-center">
            <Header header={` حذف : ${deleteData?.name}`} />
            <div className="flex gap-4 justify-center items-cent">
              <Button action={handleSubmit} loading={isDeleting} variant="danger">
                {`${t('confirm')}`}
              </Button>
              <Button action={() => setOpen(false)}>{`${t('close')}`}</Button>
            </div>
          </div>
        )}
      </Modal>
      <div className="flex flex-col gap-6 items-center">
        {isLoading && <Loading mainTitle={t("stones colors")} />}
        {isSuccess && !!!dataSource?.length && (
          <div className="mb-5 pr-5">
            <Header
              header={t(`لا يوجد`)}
              className="text-center text-2xl font-bold"
            />
          </div>
        )}
        {isSuccess && !!dataSource && !!dataSource.length && (
          <Table data={dataSource} showNavigation columns={cols} />
        )}
      </div>
    </>
  )
}
