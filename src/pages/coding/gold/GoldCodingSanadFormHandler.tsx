/////////// IMPORTS
///
import { useFormikContext } from "formik"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../../../components/atoms"
import { BoxesDataBase } from "../../../components/atoms/card/BoxesDataBase"
import { Header } from "../../../components/atoms/Header"
import { Accordion } from "../../../components/molecules"
import NinjaTable from "../../../components/molecules/NinjaTable"
import RadioGroup from "../../../components/molecules/RadioGroup"
import { Column } from "../../../components/molecules/table/types"
import { Loading } from "../../../components/organisms/Loading"
import { useFetch, useLocalStorage } from "../../../hooks"
import { CategoryMainData_TP, SetState_TP } from "../../../types"
import {
  karatStocks,
  prepareItemsToShowInCaseOfTa2m
} from "../../../utils/helpers"
import {
  GoldCodingSanad_initialValues_TP,
  GoldCodingStoneValues_TP,
  GoldSanadBand_TP,
  GoldSanad_TP,
  SizePopup_TP
} from "../coding-types-and-helpers"
import { AddStone } from "./AddStone"
import { GoldItemCodingForm } from "./GoldItemCodingForm"
///
/////////// Types
///
type GoldCodingSanadFormHandlerProps_TP = {
  selectedSanad: GoldSanad_TP | undefined
  setSelectedSanad: SetState_TP<GoldSanad_TP | undefined>
  detailedWeight_total: number | undefined
  setDetailedWeight_total: SetState_TP<number | undefined>
  addedPieces: GoldCodingSanad_initialValues_TP[]
  setAddedPieces: SetState_TP<GoldCodingSanad_initialValues_TP[]>
  stones: GoldCodingStoneValues_TP[] | undefined
  setStones: SetState_TP<GoldCodingStoneValues_TP[]>
  sizes: SizePopup_TP[]
  setSizes: SetState_TP<SizePopup_TP[]>
  stage: number
  setStage: SetState_TP<number>
  activeBand: GoldSanadBand_TP | undefined
  setActiveBand: SetState_TP<GoldSanadBand_TP | undefined>
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const GoldCodingSanadFormHandler = ({
  selectedSanad,
  setSelectedSanad,
  detailedWeight_total,
  setDetailedWeight_total,
  setAddedPieces,
  addedPieces,
  stones,
  setStones,
  sizes,
  setSizes,
  stage,
  setStage,
  activeBand,
  setActiveBand,
}: GoldCodingSanadFormHandlerProps_TP) => {
  /////////// VARIABLES
  ///
  const { sanadId } = useParams()

  const [selectedSanadLocal, setSelectedSanadLocal] =
    useLocalStorage<GoldSanad_TP>(`selectedSanadLocal_${sanadId}`)

  const columns: Column[] = [
    {
      name: "category",
      label: t("category"),
      Cell: ({ value }) => <span>{value?.name}</span>,
    },
    {
      name: "goldWeight",
      label: t("goldWeight"),
    },
    {
      name: "goldKarat",
      label: t("goldKarat"),
    },
    {
      name: "wage",
      label: t("wage"),
    },
    {
      name: "leftWeight",
      label: t("leftWeight"),
    },
  ]

  // TOTALS
  const total24 = addedPieces
    .filter((piece) => piece.karat_value === "24")
    .reduce((acc, { weight }) => acc + +weight, 0)
  const total22 = addedPieces
    .filter((piece) => piece.karat_value === "22")
    .reduce((acc, { weight }) => acc + +weight, 0)
  const total21 = addedPieces
    .filter((piece) => piece.karat_value === "21")
    .reduce((acc, { weight }) => acc + +weight, 0)
  const total18 = addedPieces
    .filter((piece) => piece.karat_value === "18")
    .reduce((acc, { weight }) => acc + +weight, 0)
  const totalWages = addedPieces?.reduce((acc, { wage, weight }) => acc + +wage * +weight, 0)

  const totals = [
    {
      name: "إجمالي محول 24",
      key: crypto.randomUUID(),
      unit: t("gram"),
      value:
        total24 +
        total22 * +karatStocks.find((item) => item.karat === "22")?.value! +
        total21 * +karatStocks.find((item) => item.karat === "21")?.value! +
        total18 * +karatStocks.find((item) => item.karat === "18")?.value!,
    },
    {
      name: "إجمالي وزن 24",
      key: crypto.randomUUID(),
      unit: t("gram"),
      value: total24,
    },
    {
      name: "إجمالي وزن 22",
      key: crypto.randomUUID(),
      unit: t("gram"),
      value: total22,
    },
    {
      name: "إجمالي وزن 21",
      key: crypto.randomUUID(),
      unit: t("gram"),
      value: total21,
    },
    {
      name: "إجمالي وزن 18",
      key: crypto.randomUUID(),
      unit: t("gram"),
      value: total18,
    },
    {
      name: "إجمالي الأجور",
      key: crypto.randomUUID(),
      unit: t("SRA"),
      value: totalWages,
    },
  ]

  ///
  /////////// CUSTOM HOOKS
  ///
  const { values, setFieldValue, setFieldError, submitForm, isSubmitting } =
    useFormikContext<GoldCodingSanad_initialValues_TP>()

  /* FETCH SANAD */
  const {
    data: sanadData,
    isSuccess: sanadDataSuccess,
    failureReason,
    isLoading,
  } = useFetch<GoldSanad_TP>({
    endpoint: `tarqimGold/api/v1/open-bonds/${sanadId}`,
    queryKey: ["goldCodingSanads", sanadId!],
    enabled: !!sanadId && !!!selectedSanadLocal,
    onSuccess: (sanad) => {
      setSelectedSanadLocal(sanad)
      setSelectedSanad(sanad)
      // setActiveBand(sanad.items[0])
      //////------------------------------------
      // setFieldValue("bond_id", sanad.id)
      // setFieldValue("band_id", sanad.items[0].id)
      // setFieldValue("category_id", sanad.items[0].category.id)
      // setFieldValue("left_weight", sanad.items[0].leftWeight)
      setFieldValue("bond_date", sanad.bond_date)
      setFieldValue("karat_value", sanad.items[0].goldKarat)
    },
  })
  ///
  /////////// STATES
  ///
  const [itemsToShowInCaseOfTa2m, setItemsToShowInCaseOfTa2m] = useState<
    CategoryMainData_TP[]
  >([])
  ///
  /////////// SIDE EFFECTS
  ///
  // useEffect(() => {
  //   if (selectedSanadLocal) {
  //     const updatedSanadItems = selectedSanadLocal?.items.filter(
  //       (band) => +band.leftWeight >= 1
  //     )
  //     const updatedSanad = { ...selectedSanadLocal, items: updatedSanadItems }
  //     setSelectedSanad(updatedSanad)
  //   }
  // }, [])

  useEffect(() => {
    if (!!selectedSanad) {
      setFieldValue("bond_id", selectedSanad.id)
      // const updatedSanadItems = selectedSanad?.items.filter(
      //   (band) => +band.leftWeight >= 1
      // )
      // const updatedSanad = { ...selectedSanad, items: updatedSanadItems }
      setSelectedSanadLocal(selectedSanad)
    }
  }, [selectedSanad])

  useEffect(() => {
    if (!!selectedSanad) {
      setFieldValue("bond_date", selectedSanad.bond_date)
    }
  }, [selectedSanad])

  // useEffect(() => {
  //   if (!!selectedSanad) {
  // setActiveBand(selectedSanad.items[0])
  //-------
  // setFieldValue("bond_id", selectedSanad.id)
  // setFieldValue("band_id", selectedSanad.items[0]?.id)
  // setFieldValue("category_id", selectedSanad.items[0]?.category.id)
  // setFieldValue("left_weight", selectedSanad.items[0]?.leftWeight)
  // setFieldValue("karat_id", selectedSanad.items[0]?.goldKarat)
  // setFieldValue("bond_date", selectedSanad.bond_date)
  //   }
  // }, [])
  ///-------------------
  useEffect(() => {
    if (!!activeBand) {
      setFieldValue("left_weight", activeBand.leftWeight)
      setFieldValue("band_id", activeBand.id)
      setFieldValue("karat_value", activeBand.goldKarat)

      setItemsToShowInCaseOfTa2m([])

      setSizes([])
    }

    if (!!activeBand && activeBand.category.id > 1) {
      const items = prepareItemsToShowInCaseOfTa2m(activeBand.category, sizes)
      items && setItemsToShowInCaseOfTa2m(items)
      // prepareItemsToShowInCaseOfTa2m
      setFieldValue("category_id", activeBand.category.id)
    } else if (!!activeBand && activeBand.category.id == 1) {
      setFieldValue("category_id", "")
    }

    // if has size
    if (
      !!activeBand &&
      !!activeBand.category.has_size &&
      activeBand.category.type !== "multi"
    ) {
      setFieldValue("sizeIsRequired", true)
    } else {
      setFieldValue("sizeIsRequired", false)
    }
  }, [activeBand, isSubmitting])
  console.log(`activeBand:`, activeBand)

  useEffect(() => {
    if (!!activeBand) {
      // setItemsToShowInCaseOfTa2m([])
      setSizes([])
    }
  }, [values.category_id])

  useEffect(() => {
    if (activeBand?.category?.type === "multi") {
      const items = prepareItemsToShowInCaseOfTa2m(activeBand?.category, sizes)
      if (items) setItemsToShowInCaseOfTa2m(items)
    }
  }, [sizes])
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <>
      {!!!isLoading && failureReason && (
        <p>{failureReason.response.data.message}</p>
      )}
      {isLoading && <Loading mainTitle="تحميل السند" />}
      {!!selectedSanad && !!selectedSanad.items.length && (
        // <HandleBackErrors errors={error?.response?.data?.errors}>
        <>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 shadows py-6 px-4 bg-lightGreen rounded-lg bg-opacity-50">
              <h3>الترقيم بالوزن</h3>
              <RadioGroup name="mezan_type">
                <RadioGroup.RadioButton
                  value="manual"
                  label="الوزن اليدوي"
                  id="manual"
                />
                <RadioGroup.RadioButton
                  value="mezan"
                  label="من الميزان"
                  id="mezan"
                />
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-lightGreen rounded-lg bg-opacity-50 p-4 shadows ">
            <div className="flex flex-col gap-3 ">
              <div className=" flex items-center w-full justify-between">
                <Header
                  header="إجماليات سند توريد الذهب "
                  className="text-lg"
                />
                <h4>
                  سند رقم /
                  <span className=" text-mainGreen mr-2">
                    {selectedSanad.id}
                  </span>
                </h4>
              </div>
              <ul className="grid grid-cols-5 gap-4">
                {selectedSanad.boxes.map(({ account, id, unit, value }) => (
                  <BoxesDataBase key={id}>
                    <p>{t(account)}</p>
                    <p>
                      {value} {t(unit)}
                    </p>
                  </BoxesDataBase>
                ))}
              </ul>
            </div>
            <div className=" flex flex-col gap-1">
              <Header header="بيانات سند توريد الذهب" className=" text-lg " />

              <div className="GlobalTable">
                <NinjaTable<GoldSanadBand_TP>
                  data={selectedSanad.items}
                  columns={columns}
                  selection="single"
                  selected={activeBand}
                  // @ts-ignore
                  setSelected={setActiveBand}
                  creatable={false}
                />
              </div>
            </div>
          </div>
          {/* {sanadData.boxes.map()} */}
          <div className="flex flex-col gap-3 ">
            <Header header="إجماليات الترقيم" className=" text-lg " />
            <ul className="grid grid-cols-6 gap-6">
              {totals.map(({ name, key, unit, value }) => (
                <BoxesDataBase variant="secondary" key={key}>
                  <div className="flex flex-col gap-2">
                    <p>{name}</p>
                    <p>
                      {value} {t(unit)}
                    </p>
                  </div>
                </BoxesDataBase>
              ))}
            </ul>
          </div>

          {/* بنود الترقيم */}
          <Accordion
            className=" bg-lightGreen"
            isInitiallyOpen={true}
            title="بنود الترقيم"
          >
            <div className="bg-lightGreen rounded-md p-4 mt-3">
              <div className=" bg-white shadows mt-6 rounded-md p-4">
                {!!activeBand && (
                  <GoldItemCodingForm
                    setItemsToShowInCaseOfTa2m={setItemsToShowInCaseOfTa2m}
                    itemsToShowInCaseOfTa2m={itemsToShowInCaseOfTa2m}
                    detailedWeight_total={detailedWeight_total}
                    setDetailedWeight_total={setDetailedWeight_total}
                    sizes={sizes}
                    setSizes={setSizes}
                    activeBand={activeBand}
                    setActiveBand={setActiveBand}
                  />
                )}
              </div>
            </div>
          </Accordion>

          {/* الحجر */}
          {!!values.has_stones && (
            <AddStone stones={stones} setStones={setStones} />
          )}
          <div className="flex items-end justify-end gap-x-5">
            {/* submit البند */}
            {!!addedPieces.length && (
              <div className="relative">
                <span className="bg-mainGreen rounded-full  h-6 w-6 text-white text-center mb-2 absolute -top-4 z-50">
                  {addedPieces.length}
                </span>
                <Button bordered={true} action={() => setStage(2)}>
                  {t("preview")}
                </Button>
              </div>
            )}
            <Button action={submitForm}>{t("save")}</Button>
          </div>
        </>
        // </HandleBackErrors>
      )}

      {!!selectedSanad && !!!selectedSanad.items.length && (
        <h2>لا يوجد بنود في السند</h2>
      )}
    </>
  )
}
