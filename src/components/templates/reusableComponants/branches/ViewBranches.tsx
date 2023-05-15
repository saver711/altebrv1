/////////// IMPORTS
///
//import classes from './ViewBranches.module.css'
import { t } from "i18next"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../../../hooks"
import { Button } from "../../../atoms"
import { Header } from "../../../atoms/Header"
import { Loading } from "../../../organisms/Loading"

import blankPerson from "../../../../assets/blank-person-image.png"
import { DeleteIcon, EditIcon, ViewIcon } from "../../../atoms/icons"
import { useState } from "react"

import { Modal } from "../../../molecules"
import { CreateBranch } from "./CreateBranch"

///
/////////// Types
///
type ViewBranches_Props_TP = {
  title: string
}
export type Branch_Props_TP = {
  id: string
  address: string
  city_name: string
  fax: string
  logo: string
  market_number: string
  name: string
  number: string
  phone: string
  nationalAddress: {
    id: string
    address: string
    building_number: string
    city: { id: string; name_ar: string; name_en: string }
    country: { id: string; name_ar: string; name_en: string }
    district: { id: string; name_ar: string; name_en: string }
    street_number: string
    sub_number: string
    zip_code: string
  }
  document: {}[]
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const ViewBranches = ({ title }: ViewBranches_Props_TP) => {
  /////////// VARIABLES
  ///
  const navigate = useNavigate()

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///
  const [editData, setEditData] = useState<Branch_Props_TP>()
  const [open, setOpen] = useState<boolean>(false)

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  const { data, isSuccess, isLoading, isError, error } = useFetch<
    Branch_Props_TP[]
  >({
    endpoint: "/branch/api/v1/branches",
    queryKey: ["branch"],
  })
  console.log(data)

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-2xl">{t("branches ")}</h2>
        <Button
          action={() => navigate(-1)}
          className="flex items-center gap-2"
          bordered
        >
          {t("back")}
        </Button>
      </div>
      {isError && (
        <div className=" m-auto">
          <Header
            className="text-center text-2xl font-bold"
            header={t(`some thing went wrong ${error.response.data.message}`)}
          />
        </div>
      )}
      {isLoading && (
        <Loading
          mainTitle={`${t("loading")}`}
          subTitle={`${t("branches are loading")}`}
        />
      )}
      {isSuccess && data.length === 0 && (
        <h2 className="font-bold text-2xl text-center mt-16">
          {" "}
          {t("There ara no branches")}
        </h2>
      )}
      {!isLoading && isSuccess && data?.length > 0 && (
        <div className="grid grid-cols-3">
          {data.map((branch) => (
            <div className="col-span-1 shadow-md shadow-slate-400 px-9 py-5 rounded-lg m-5">
              <div className=" w-32  bg-gray-100 mx-auto mb-10 p-2 rounded-md">
                <img
                  src={branch.logo || blankPerson}
                  alt={`employee: `}
                  className="  object-cover rounded-md w-full"
                />
              </div>
              <h2 className="text-center mb-5 font-bold text-2xl">
                {branch.name}
              </h2>
              <div className="flex items-center justify-center">
                {/* عرض */}
                <Button
                  action={() => navigate(`${branch.id}`)}
                  className="flex items-center mx-1"
                >
                  <ViewIcon />
                </Button>
                {/* تعديل */}
                <Button
                  bordered
                  className="flex items-center mx-1"
                  action={() => {
                    setEditData(branch)
                    setOpen(true)
                  }}
                >
                  <EditIcon />
                </Button>
                {/* حذف */}
                <Button
                  variant="danger"
                  className="flex items-center mx-1"
                  action={() => {}}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <CreateBranch editData={editData} />
      </Modal>
    </>
  )
}
