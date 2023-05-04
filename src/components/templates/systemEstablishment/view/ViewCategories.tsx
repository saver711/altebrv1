/////////// IMPORTS
///
//import classes from './Categories.module.css'
///
/////////// Types

import { ColumnDef } from "@tanstack/react-table"
import { Form, Formik } from "formik"
import { t } from "i18next"
import { useEffect, useMemo, useState } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import * as Yup from 'yup'
import { useFetch, useIsRTL, useMutate } from "../../../../hooks"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { Back } from "../../../../utils/utils-components/Back"
import { Button } from "../../../atoms"
import { Header } from "../../../atoms/Header"
import { EditIcon } from "../../../atoms/icons"
import { SvgDelete } from "../../../atoms/icons/SvgDelete"
import { BaseInputField, Modal } from "../../../molecules"
import { AddButton } from "../../../molecules/AddButton"
import { Loading } from "../../../organisms/Loading"
import CreateCategory from "../../reusableComponants/categories/create/CreateCategory"
import { Table } from "../../reusableComponants/tantable/Table"

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
  const [page, setPage] = useState<number>(1)
  const columns = useMemo<ColumnDef<ViewCategories_TP>[]>(
    () => [
      {
        cell: (info) => info.getValue(),
        accessorKey: "index",
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
    ? `classification/api/v1/categories?page=${page}` 
    : `classification/api/v1/categories?page=${page}&${isRTL ? 'nameAr' : 'nameEn'}[lk]=${search}`,
    queryKey: [`AllCategory`],
    pagination: true,
    onSuccess(data) {
      setDataSource(data.data)
    },
    select: (data) => {
      return {
        ...data,
        data: data.data.map((category, i) => ({
          ...category,
          index: i + 1,
        })),
      }
    }
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
    <div className="p-4">
      <div className="flex justify-between mb-8">
        <h3 className="font-bold">
          {`${t("system establishment")} / ${t("categories")}`}
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
              id="category_search"
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
          {!isLoading && (
            <div className="flex justify-end ms-2">
              <Back />
            </div>
          )}
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
      {(isLoading || isRefetching) && <Loading mainTitle={t("categories")} />}
      {isSuccess &&
        !!dataSource &&
        !isLoading &&
        !isRefetching &&
        !!dataSource.length && (
          <Table data={dataSource} columns={columns}>
            <div className="mt-3 flex items-center justify-end gap-5 p-2">
              <div className="flex items-center gap-2 font-bold">
                عدد الصفحات
                <span className=" text-mainGreen">
                  {categories.current_page}
                </span>
                من
                <span className=" text-mainGreen">{categories.pages}</span>
              </div>
              <div className="flex items-center gap-2 ">
                <Button
                  className=" rounded bg-mainGreen p-[.18rem] "
                  action={() => setPage((prev) => prev - 1)}
                  disabled={page == 1}
                >
                  <MdKeyboardArrowRight className="h-4 w-4 fill-white" />
                </Button>
                <Button
                  className=" rounded bg-mainGreen p-[.18rem] "
                  action={() => setPage((prev) => prev + 1)}
                  disabled={page == categories.pages}
                >
                  <MdKeyboardArrowLeft className="h-4 w-4 fill-white" />
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
          <CreateCategory
            editData={editData}
            setDataSource={setDataSource}
            setShow={setOpen}
          />
        ) : (
          <div className="flex flex-col gap-8 justify-center items-center">
            <Header header={` حذف : ${deleteData?.name}`} />
            <div className="flex gap-4 justify-center items-cent">
              <Button
                action={handleSubmit}
                loading={mutateLoading}
                variant="danger"
              >
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
