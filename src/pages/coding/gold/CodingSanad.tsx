/////////// IMPORTS
///
import { Formik } from "formik"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Header } from "../../../components/atoms/Header"
import { useFetch, useLocalStorage } from "../../../hooks"
import { useGetQueryData } from "../../../hooks/useGetQueryData"
import { Category_TP, SelectOption_TP, SetState_TP } from "../../../types"
import { notify } from "../../../utils/toast"
import {
  GoldCodingSanad_initialValues_TP,
  GoldCodingStoneValues_TP,
  GoldSanad_TP,
  SizePopup_TP,
  codingSanad_initialValues,
  codingSanad_schema
} from "../coding-types-and-helpers"
import { GoldCodingSanadFormHandler } from "./GoldCodingSanadFormHandler"
///
/////////// Types
///
type CodingSanadProps_TP = {
  addedPieces: GoldCodingSanad_initialValues_TP[]
  setAddedPieces: SetState_TP<GoldCodingSanad_initialValues_TP[]>
  stage: number
  setStage: SetState_TP<number>
}
/////////// HELPER VARIABLES & FUNCTIONS
///
const maxPiecesNumber = 30
///
export const CodingSanad = ({
  setAddedPieces,
  addedPieces,
  stage,
  setStage,
}: CodingSanadProps_TP) => {
  /////////// VARIABLES
  ///
  const { sanadId } = useParams()
  const [selectedSanadLocal, setSelectedSanadLocal] =
    useLocalStorage<GoldSanad_TP>(`selectedSanadLocal_${sanadId}`)
  const [addedPiecesLocal, setAddedPiecesLocal] = useLocalStorage<
    GoldCodingSanad_initialValues_TP[]
  >(`addedPiecesLocal_${sanadId}`)

  ///
  /////////// CUSTOM HOOKS
  ///
  const categories = useGetQueryData<Category_TP[]>(["categories"])

  const { data: categoryOptions } = useFetch<SelectOption_TP[]>({
    endpoint: "classification/api/v1/categories",
    queryKey: ["categories"],
    enabled: !!!categories,
    select: (categories) => {
      return categories.map((category: any) => ({
        id: category.id,
        label: category.name,
        name: category.name,
        value: category.id,
      }))
    },
  })
  ///
  /////////// STATES
  ///
  const [selectedSanad, setSelectedSanad] = useState<GoldSanad_TP | undefined>(
    selectedSanadLocal
  )
  const [sizes, setSizes] = useState<SizePopup_TP[]>([])

  const [stones, setStones] = useState<GoldCodingStoneValues_TP[]>([])

  const [detailedWeight_total, setDetailedWeight_total] = useState<
    number | undefined
  >()

  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    setAddedPiecesLocal(addedPieces)
  }, [addedPieces])
  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  const isAbleToCodeMore = () => {
    let goAhead = true

    if (addedPieces.length === maxPiecesNumber - 2) {
      notify(
        "info",
        `قمت بإدخال عدد ${addedPieces.length + 1} قطع وباقي قطعة واحدة`
      )
    }

    if (addedPieces.length === maxPiecesNumber) {
      notify("error", "قمت بإدخال الحد الأقصي للقطع")
      goAhead = false
    }
    return goAhead
  }
  const updateSanadWithNewWeight = (formBandId: string, formWeight: number) => {
    if (selectedSanad) {
      const newSanadItems = selectedSanad.items
        .map((band) => {
          if (band.id === formBandId) {
            return {
              ...band,
              leftWeight: band.leftWeight - formWeight,
            }
          } else {
            return band
          }
        })
        // .filter((band) => band.leftWeight >= 1)

      setSelectedSanad((curr) => ({
        ...(curr || selectedSanad),
        items: newSanadItems,
      }))
    }
  }

  function finalSubmit(values: GoldCodingSanad_initialValues_TP) {
    if (!isAbleToCodeMore()) return
    updateSanadWithNewWeight(values.band_id!, values.weight)
    // setAddedPieces((curr) => [...curr, { ...values, stones }])
    setAddedPieces((curr) => [...curr, {...values, front_key: crypto.randomUUID()}])
  }
  ///
  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <Header header="ترقيم الذهب" className="text-2xl" />
        <div className="flex w-full flex-col gap-6">
          <Formik
            validationSchema={codingSanad_schema}
            initialValues={codingSanad_initialValues}
            onSubmit={(values) => {
              notify('success' , `${t('piece has been added')}`)
              // VARS
              const selectedCateg = categories?.find(
                (categ) => categ.id === values.category_id
              )
              const hasSize = selectedCateg?.has_sizee
              const isTa2m = selectedCateg?.type === "multi"
              const thereAreSizes = !!sizes.length
              const thereAreWeightItems = !!values.weightitems?.length
              //--------------------------
              let {
                size_type,
                size_unit_id,
                sizeIsRequired,
                left_weight,
                stones : Omitted,
                weightitems,
                ...baseValues
              } = values

              if(values.has_stones && !!stones?.length){
                baseValues = {...baseValues, stones}
              }

              // ---> فير محدد او صنف عادي - صنف له مقاس - تم اضافة المقاس
              if (hasSize && !!values.size_type && !!values.size_unit_id) {
                const vals = {
                  ...baseValues,
                  size_type: values.size_type,
                  size_unit_id: values.size_unit_id,
                }
                finalSubmit(vals)
                return
              }

              // ---> غير محدد - طقم - يوجد مقاسات مفصة
              if (isTa2m) {
                const vals = {
                  ...baseValues,
                  ...(thereAreSizes && { sizes }),
                  ...(thereAreWeightItems && {
                    weightitems: values.weightitems,
                  }),
                }
                finalSubmit(vals)
                return
              }
              finalSubmit(baseValues)

              // امسح الاستونز لو لايحتوي علي احجار
              //---------------------------
              // لو لا يحتوي علي احجار
              // if (values.has_stones == "false"){
              // }
              // if it is multi(طقم) and has size
              //    - make sure sizes array has items ✅

              // .................
              // const selectedCateg = categories?.find(
              //   (categ) => categ.id === values.category_id
              // )
              // const isTa2m = selectedCateg?.type === "multi"

              // if (selectedCateg && selectedCateg.items) {
              //   const lengthOfItemsThatHasSize = selectedCateg.items.filter(
              //     (item) => item.has_size
              //   ).length
              //   if (
              //     isTa2m &&
              //     !!selectedCateg.has_size &&
              //     sizes.length < lengthOfItemsThatHasSize
              //   ) {
              //     notify(
              //       "error",
              //       `انت ترقم طقم وبه ${lengthOfItemsThatHasSize} اصناف ذو مقاسات وقد قمت بإضافة ${sizes.length} أصناف فقط`
              //     )
              //     return
              //   }
              // }
              // .................

              // delete values.left_weight ✅
              // delete values.sizeIsRequired ✅
              // delete values.city_id ✅
              // delete values.district_id ✅

              // .................
              // const {
              //   left_weight: Omitted1,
              //   sizeIsRequired: Omitted2,
              //   city_id: Omitted3,
              //   district_id: Omitted4,
              //   ...filteredValues
              // } = values

              // .................

              // if it has no size => ✅
              //    - delete values.size_type ✅
              //    - delete values.size_unit_id ✅

              // .................

              // if (!!!values.sizeIsRequired) {
              //   const { size_unit_id, size_type, ...finalValues } =
              //     filteredValues

              //   // لو طقم ضيف ال sizes
              //   if (isTa2m) {
              //     if (detailedWeight_total !== 0 && !!!detailedWeight_total) {
              //       const {
              //         size_unit_id,
              //         size_type,
              //         weightitems,
              //         ...finalValues
              //       } = filteredValues

              //       // SEND
              //       if (!isAbleToCodeMore()) return
              //       updateSanadWithNewWeight(values.band_id!, values.weight)
              //       setAddedPieces((curr) => [...curr, finalValues])
              //       return
              //     }
              //     const finalValuesForTa2m = { sizes, stones, ...finalValues }
              //     // SEND
              //     if (!isAbleToCodeMore()) return
              //     updateSanadWithNewWeight(values.band_id!, values.weight)
              //     setAddedPieces((curr) => [...curr, finalValuesForTa2m])
              //     return
              //   }

              //   // SEND
              //   if (!isAbleToCodeMore()) return
              //   updateSanadWithNewWeight(values.band_id!, values.weight)
              //   setAddedPieces((curr) => [...curr, finalValues])
              //   return
              // }

              // const {
              //   left_weight,
              //   sizeIsRequired,
              //   city_id,
              //   district_id,
              //   ...finalValues
              // } = values
              // // SEND
              // if (!isAbleToCodeMore()) return
              // updateSanadWithNewWeight(values.band_id!, values.weight)
              // setAddedPieces((curr) => [...curr, { ...finalValues, stones }])

              // .................
            }}
          >
            {({ values, setFieldValue, submitForm, errors }) => (
              <>
                <GoldCodingSanadFormHandler
                  selectedSanad={selectedSanad}
                  setSelectedSanad={setSelectedSanad}
                  detailedWeight_total={detailedWeight_total}
                  setDetailedWeight_total={setDetailedWeight_total}
                  sizes={sizes}
                  setSizes={setSizes}
                  stones={stones}
                  setStones={setStones}
                  addedPieces={addedPieces}
                  setAddedPieces={setAddedPieces}
                  stage={stage}
                  setStage={setStage}
                />
              </>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
