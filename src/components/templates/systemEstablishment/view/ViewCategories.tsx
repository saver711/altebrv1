/////////// IMPORTS
///
//import classes from './Categories.module.css'
///
/////////// Types

import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { useFetch, useIsRTL, useMutate } from "../../../../hooks"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, ViewIcon } from "../../../atoms/icons"
import { SvgDelete } from "../../../atoms/icons/SvgDelete"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { Table } from "../../reusableComponants/tantable/Table"
import { BaseInputField, Modal } from "../../../molecules"
import { Loading } from "../../../organisms/Loading"
import { Header } from "../../../atoms/Header"
import { Button } from "../../../atoms"
import CreateCategory from "../../reusableComponants/categories/create/CreateCategory"
import { AddButton } from "../../../molecules/AddButton"
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import { BiSearchAlt } from "react-icons/bi"

///
type ViewCategories_TP = {
  id: string
  name: string
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

///
export const ViewCategories = () => {
  /////////// CUSTOM HOOKS
  ///
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState<ViewCategories_TP>()
  const [deleteData, setDeleteData] = useState<ViewCategories_TP>()
  const [dataSource, setDataSource] = useState<ViewCategories_TP[]>([])
  const columns = useMemo<ColumnDef<ViewCategories_TP>[]>(
    () => [
      {
        cell: (info) => info.getValue(),
        accessorKey: "id",
        header: () => <span>{t("Sequence ")} </span>,

      },
      {
        header: () => <span>{t("categories")} </span>,
        accessorKey: "name",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("category type")} </span>,
        accessorKey: "type",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("Selling policy")} </span>,
        accessorKey: "selling_type",
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
            </div>
          )
        },
      },
    ],
    []
  )

  const isRTL = useIsRTL()
  let count = 1
  const {
    data: categories,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    isRefetching
  } = useFetch<ViewCategories_TP[]>({
    endpoint: search === '' 
    ? 'classification/api/v1/categories' 
    : `classification/api/v1/categories?${isRTL ? 'nameAr' : 'nameEn'}[lk]=${search}`,
    queryKey: [`AllCategory`],
    onSuccess(data) {
      setDataSource(data)
    },
    select: (categories) =>
      categories.map((category) => ({
        ...category,
        index: count++,
      })),
  })
  const {
    mutate,
    error: mutateError,
    isLoading: mutateLoading,
  } = useMutate<ViewCategories_TP>({
    mutationFn: mutateData,
    onSuccess: () => {
      setDataSource((prev: ViewCategories_TP[]) =>
        prev.filter((p) => p.id !== deleteData?.id)
      )
      setOpen(false)
      notify("success")
    },
  })
  const handleSubmit = () => {
    mutate({
      endpointName: `/classification/api/v1/categories/${deleteData?.id}`,
      method: "delete",
    })
  }

  useEffect(() => {
    refetch()
  }, [search])

  ///
  return (
    <div className="p-4">
      <div className="flex justify-between mb-8">
        <h3 className="font-bold">
          {`${t('system establishment')} / ${t('categories')}`}
        </h3>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {setSearch(values.search)}}
          validationSchema={validationSchema}
        >
          <Form className="flex align-middle gap-2">
            <BaseInputField
              id="category_search"
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
      {isError && (
        <div className=" m-auto">
          <Header
            className="text-center text-2xl font-bold"
            header={t(`some thing went wrong ${error.message}`)}
          />
        </div>
      )}
      {isLoading && <Loading mainTitle={t("categories")} />}
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
          <CreateCategory
            editData={editData}
            setDataSource={setDataSource}
            setShow={setOpen}
          />
        ) : (
          <div className="flex flex-col gap-8 justify-center items-center">
            <Header header={` حذف : ${deleteData?.name}`} />
            <div className="flex gap-4 justify-center items-cent">
              <Button action={handleSubmit} loading={mutateLoading} variant="danger">
                {`${t('confirm')}`}
              </Button>
              <Button>{`${t('close')}`}</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
