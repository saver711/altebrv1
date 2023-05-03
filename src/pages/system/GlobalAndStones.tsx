/////////// IMPORTS
///
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/atoms"
import { Modal } from "../../components/molecules"
import { AddCountry } from "../../components/templates/systemEstablishment/AddCountry"
import {
  Card_TP,
  FormNames_TP,
  GlobalFormNames_TP,
  StonesFormNames_TP,
} from "./types-and-helpers"
import { AddCities } from "../../components/templates/systemEstablishment/AddCities"
import { AddDistrict } from "../../components/templates/systemEstablishment/AddDistrict"
import { CreateNationalities } from "../../components/templates/CreateNationalities"
import { t } from "i18next"
import CreateColor from "../../components/templates/reusableComponants/CreateColor"
import { CreateClassification } from "../../components/templates/reusableComponants/classifications/create/CreateClassification"
import CreateKarat from "../../components/templates/reusableComponants/karats/create/CreateKarat"
import CreateCategory from "../../components/templates/reusableComponants/categories/create/CreateCategory"
import { AddMarket } from "../../components/templates/systemEstablishment/markets/AddMarket"
import { AddStone } from "../coding/gold/AddStone"
import CreateStoneType from "../../components/templates/reusableComponants/stones/create/CreateStoneType"
import { AddIcon, ViewIcon } from "../../components/atoms/icons"
import CreateStoneShape from "../../components/templates/reusableComponants/stones/create/CreateStoneShape"
import CreateStoneQuality from "../../components/templates/reusableComponants/stones/create/CreateStoneQuality"
import CreateStonePurity from "../../components/templates/reusableComponants/stones/create/CreateStonePurity"
import CreateStoneNature from "../../components/templates/reusableComponants/stones/create/CreateStoneNature"
import { Back } from "../../utils/utils-components/Back"
import { SystemCard } from "../../components/templates/systemEstablishment/SystemCard"
import { StonesCard } from "../../components/templates/systemEstablishment/StonesCard"
///
/////////// Types
///
type GlobalAndStonesProps_TP = {
  title: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const GlobalAndStones = ({ title }: GlobalAndStonesProps_TP) => {
  /////////// VARIABLES
  ///
  const navigate = useNavigate()
  const globalCards: Card_TP<GlobalFormNames_TP>[] = [
    {
      id: crypto.randomUUID(),
      title: t("countries"),
      name: "countries",
      addLabel: "إضافة دولة",
      addComponent: <AddCountry />,
      viewLabel: "عرض الدول",
      viewHandler: () => navigate("countries"),
    },
    {
      id: crypto.randomUUID(),
      title: t("cities"),
      name: "cities",
      addLabel: "إضافة مدينة",
      addComponent: <AddCities />,
      viewLabel: "عرض المدن",
      viewHandler: () => navigate("cities"),
    },
    {
      id: crypto.randomUUID(),
      title: t("districts"),
      name: "districts",
      addLabel: "إضافة حي",
      addComponent: <AddDistrict />,
      viewLabel: "عرض الأحياء",
      viewHandler: () => navigate("districts"),
    },
    {
      id: crypto.randomUUID(),
      title: t("nationalities"),
      name: "nationalities",
      addLabel: "إضافة جنسية",
      addComponent: <CreateNationalities />,
      viewLabel: "عرض الجنسيات",
      viewHandler: () => navigate("nationalities"),
    },
    {
      id: crypto.randomUUID(),
      title: t("gold colors"),
      name: "colors",
      addLabel: "إضافة لون",
      addComponent: <CreateColor />,
      viewLabel: "عرض الألوان",
      viewHandler: () => navigate("colors"),
    },
    {
      id: crypto.randomUUID(),
      title: t("classifications"),
      name: "classifications",
      addLabel: "إضافة فئة",
      addComponent: <CreateClassification />,
      viewLabel: "عرض الفئات",
      viewHandler: () => navigate("classifications"),
    },
    {
      id: crypto.randomUUID(),
      title: t("karats"),
      name: "karats",
      addLabel: "إضافة عيار",
      addComponent: <CreateKarat />,
      viewLabel: "عرض العيارات",
      viewHandler: () => navigate("karats"),
    },
    {
      id: crypto.randomUUID(),
      title: t("categories"),
      name: "categories",
      addLabel: "إضافة صنف",
      addComponent: <CreateCategory />,
      viewLabel: "عرض الاصناف",
      viewHandler: () => navigate("categories"),
    },
    {
      id: crypto.randomUUID(),
      title: t("markets"),
      name: "markets",
      addLabel: "إضافة سوق",
      addComponent: <AddMarket />,
      viewLabel: "عرض الأسواق",
      viewHandler: () => navigate("markets"),
    },
  ]

  const stonesCards: Card_TP<StonesFormNames_TP>[] = [
    {
      id: crypto.randomUUID(),
      title: t("stonesTypes"),
      name: "stones",
      addComponent: <CreateStoneType />,
      viewHandler: () => navigate("stones-types"),
    },
    {
      id: crypto.randomUUID(),
      title: t("stonesColors"),
      addComponent: <CreateColor />,
      name: "colors",
      viewHandler: () => navigate("stones-colors"),
    },
    {
      id: crypto.randomUUID(),
      title: t("stonesShapes"),
      addComponent: <CreateStoneShape />,
      name: "shapes",
      viewHandler: () => navigate("stones-shapes"),
    },
    {
      id: crypto.randomUUID(),
      title: t("stonesQualities"),
      addComponent: <CreateStoneQuality />,
      name: "qualities",
      viewHandler: () => navigate("stones-qualities"),
    },
    {
      id: crypto.randomUUID(),
      title: t("stonesPurities"),
      addComponent: <CreateStonePurity />,
      name: "purities",
      viewHandler: () => navigate("stones-purities"),
    },
    {
      id: crypto.randomUUID(),
      title: t("stonesNatures"),
      addComponent: <CreateStoneNature />,
      name: "natures",
      viewHandler: () => navigate("stones-natures"),
    },
  ]
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const [globalsPopups, setGlobalsPopups] = useState<{
    [key in GlobalFormNames_TP]: boolean
  }>({
    countries: false,
    cities: false,
    districts: false,
    markets: false,
    colors: false,
    classifications: false,
    categories: false,
    nationalities: false,
    karats: false,
  })

  const [stonesPopups, setStonesPopups] = useState<{
    [key in StonesFormNames_TP]: boolean
  }>({
    stones: false,
    shapes: false,
    qualities: false,
    purities: false,
    natures: false,
    colors: false,
  })
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  const openGlobalPopup = (formName: GlobalFormNames_TP | StonesFormNames_TP) =>
    setGlobalsPopups((prev) => ({ ...prev, [formName]: true }))

  const closeGlobalPopup = (
    formName: GlobalFormNames_TP | StonesFormNames_TP
  ) => setGlobalsPopups((prev) => ({ ...prev, [formName]: false }))

  const openStonesPopup = (formName: GlobalFormNames_TP | StonesFormNames_TP) =>
    setStonesPopups((prev) => ({ ...prev, [formName]: true }))

  const closeStonesPopup = (
    formName: GlobalFormNames_TP | StonesFormNames_TP
  ) => setStonesPopups((prev) => ({ ...prev, [formName]: false }))
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">تأسيس عام وأحجار</h1>
        <Back path="/system" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {globalCards.map(
          ({
            id,
            title,
            addComponent,
            addLabel,
            viewHandler,
            viewLabel,
            name,
          }) => (
            <SystemCard
              forStyle
              key={id}
              viewHandler={viewHandler}
              viewLabel={viewLabel}
              title={title}
              addLabel={addLabel}
              addHandler={() => openGlobalPopup(name as GlobalFormNames_TP)}
            />
          )
        )}
      </div>

      <br />

      {/* الاحجار */}
      <div className="mt-12 grid grid-cols-4 gap-6">
        <div className="col-span-1 flex w-full flex-col items-center gap-4">
          <div className="flex w-full items-center justify-center gap-2  rounded-lg  bg-mainGreen p-3 text-white">
            <h2>إدارة الأحجار</h2>
          </div>
          {stonesCards.map(
            ({
              id,
              title,
              addComponent,
              addLabel,
              viewHandler,
              viewLabel,
              name,
            }) => (
              <div
                key={id}
                className="flex w-full items-center justify-between rounded-lg border border-mainGreen p-2 text-mainGreen"
              >
                <StonesCard
                  addHandler={() => openStonesPopup(name as GlobalFormNames_TP)}
                  title={title}
                  viewHandler={viewHandler}
                />
              </div>
            )
          )}
        </div>
      </div>

      {globalCards.map(({ id, name, addComponent }) => {
        if (name && addComponent) {
          return (
            <Modal
              key={id}
              isOpen={globalsPopups[name as keyof typeof globalsPopups]}
              onClose={() =>
                closeGlobalPopup(name as keyof typeof globalsPopups)
              }
            >
              {addComponent}
            </Modal>
          )
        }
      })}
      {stonesCards.map(({ id, name, addComponent }) => {
        if (name && addComponent) {
          return (
            <Modal
              key={id}
              isOpen={stonesPopups[name as keyof typeof stonesPopups]}
              onClose={() =>
                closeStonesPopup(name as keyof typeof stonesPopups)
              }
            >
              {addComponent}
            </Modal>
          )
        }
      })}
    </>
  )
}
