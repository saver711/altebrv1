/////////// IMPORTS
///
import { Helmet } from "react-helmet-async"
import { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { t } from "i18next"
import { EditIcon, ViewIcon } from "../../components/atoms/icons"
import { SvgDelete } from "../../components/atoms/icons/SvgDelete"
import { useFetch, useMutate } from "../../hooks"
import { EmptyDataView } from "../../components/templates/reusableComponants/EmptyDataView"
import { AddPartners } from "../../components/templates/systemEstablishment/partners/AddPartners"
import { Loading } from "../../components/organisms/Loading"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/atoms/buttons/Button"
import { Header } from "../../components/atoms/Header"
import { Modal } from "../../components/molecules"
import { Table } from "../../components/templates/reusableComponants/tantable/Table"
import { mutateData } from "../../utils/mutateData"
import { notify } from "../../utils/toast"

///
/////////// Types
///
type AllPartnerProps_TP = {
  title: string
}
type partner = {
  id: string
  name: string
  email: string
  phone: string
  end_date: Date
  start_date: Date
  IdNumber: string
  city_id: string
  country_id: string
  nationality_id: string
  national_image: any
  // document type
  docType: string
  docName: string
  docNumber: string
  endDate: Date
  reminder: string
  files: any
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AllPartner = ({ title }: AllPartnerProps_TP) => {
  /////////// VARIABLES
  ///
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(false)
  const [editData, setEditData] = useState<partner>()
  const [deleteData, setDeleteData] = useState<partner>()
  const [dataSource, setDataSource] = useState<partner[]>([])

  const navigate = useNavigate()
    const columns = useMemo<ColumnDef<partner>[]>(
      () => [
        {
          cell: (info) => info.getValue(),
          accessorKey: "index",
          header: () => <span>{t("Sequence")} </span>,
        },
        {
          header: () => <span>{t("partners")} </span>,
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
                <ViewIcon action={() => navigate(`${info.row.original.id}`)} />
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
    data: partners,
    isError,
    isSuccess,
    isFetching,
    error,
    isLoading: partnersLoading,
  } = useFetch<partner[]>({
    endpoint: "/partner/api/v1/partners",
    queryKey: ["partner"],
    select: (partners) =>
      partners.map((partner) => ({
        ...partner,
        index: count++,
      })),
    onSuccess(data) {
      setDataSource(data)
    },
    onError: (err) => console.log(err),
  })



  /////////// CUSTOM HOOKS
  ///
  const {
    mutate,
    error: mutateError,
    isLoading: mutateLoading,
  } = useMutate<partner[]>({
    mutationFn: mutateData,
    onSuccess: () => {
      setDataSource((prev: partner[]) =>
        prev.filter((p) => p.id !== deleteData?.id)
      )
      setModel(true)
      notify("success")
    },
  })
  const handleSubmit = () => {
    mutate({
      endpointName: `/partner/api/v1/partners/${deleteData?.id}`,
      method: "delete",
    })
  }

  ///
  /////////// STATES
  ///

//     const render = () => {
//         const index = dataSource.findIndex(row => row.id === editData!.id)
//         const updateData = [ ...dataSource ]
//         updateData[index] = { ...editData }
//         setDataSource(updateData)
//   }
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///

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
      {isFetching && <Loading mainTitle={t("View partner")} />}
      {isSuccess && !isFetching && !!!dataSource?.length && (
        <EmptyDataView>
          {" "}
          <AddPartners title={`${t("add partner")}`} />{" "}
        </EmptyDataView>
      )}
      {isSuccess && !!dataSource && !!dataSource.length && (
        <>
          <div className="flex justify-between my-3">
            <h2 className="font-bold text-2xl">{t("show partner")}</h2>

            <Button action={() => navigate(-1)} bordered>
              {t("Back")}
            </Button>
          </div>

          {isSuccess && !!dataSource && !!dataSource.length && (
            <>
              <Table data={dataSource} showNavigation columns={columns} />
              {/* <button onClick={()=>render()}>rerender</button> */}
            </>
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
          <AddPartners
            title={`${t("Edit Partner")}`}
            dataSource={dataSource}
            editData={editData}
            setModel={setModel}
          />
        ) : (
          <div className="flex flex-col gap-8 justify-center items-center">
            <Header header={` حذف : ${deleteData?.name}`} />
            <div className="flex gap-4 justify-center items-cent">
              <Button
                action={handleSubmit}
                variant="danger"
                loading={mutateLoading}
              >
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