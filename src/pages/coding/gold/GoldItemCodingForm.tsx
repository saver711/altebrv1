/////////// IMPORTS
///

import { Formik, useFormikContext } from "formik"
import { t } from "i18next"
import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "../../../components/atoms"
import { DeleteIcon, WeightIcon } from "../../../components/atoms/icons"
import {
  BaseInputField,
  CheckBoxField,
  Modal,
  TextAreaField
} from "../../../components/molecules"
import { DropFile } from "../../../components/molecules/files/DropFile"
import { SelectCategorySize } from "../../../components/templates/categories-sizes/SelectCategorySize"
import { Country_city_distract_markets } from "../../../components/templates/reusableComponants/Country_city_distract_markets"
import SelectColor from "../../../components/templates/reusableComponants/SelectColor"
import { CategoryMainData_TP, SetState_TP } from "../../../types"
import { prepareItemsToShowInCaseOfTa2m } from "../../../utils/helpers"
import { notify } from "../../../utils/toast"
import {
  GoldCodingSanad_initialValues_TP,
  GoldSanadBand_TP,
  GoldSanad_TP,
  SizePopup_TP,
  addTa2mSizesSchema,
} from "../coding-types-and-helpers"
import { SizesTable } from "./SizesTable"
///
/////////// Types
///
type ItemCodingFormProps_TP = {
  setItemsToShowInCaseOfTa2m: SetState_TP<CategoryMainData_TP[]>
  itemsToShowInCaseOfTa2m: CategoryMainData_TP[] | undefined
  detailedWeight_total: number | undefined
  setDetailedWeight_total: SetState_TP<number | undefined>
  sizes: SizePopup_TP[]
  setSizes: SetState_TP<SizePopup_TP[]>
  activeBand: GoldSanadBand_TP
  setActiveBand: SetState_TP<GoldSanadBand_TP | undefined>
  selectedSanad?:GoldSanad_TP
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const GoldItemCodingForm = ({
  setItemsToShowInCaseOfTa2m,
  itemsToShowInCaseOfTa2m,
  detailedWeight_total,
  setDetailedWeight_total,
  sizes,
  setSizes,
  activeBand,
  selectedSanad,
  setActiveBand
}: ItemCodingFormProps_TP) => {
  /////////// VARIABLES
  ///
  const selectedBandLeftWeight =  selectedSanad.items.find((item)=>item?.number === activeBand?.number)?.leftWeight
  const hasSizes = !!sizes.length
  const isMultiCategory =
    activeBand.category.id > 1 && activeBand.category.type === "multi"
  const hasItemsWithSizes = activeBand.category.items?.some(
    (item) => item?.has_size
  )
  const [awzanItems, setAwzanItems] = useState(activeBand.category.items)

  // const awzanItems = activeBand.category.items
  const awzanItemsFormInitValues = awzanItems?.reduce(
    (acc, { id }) => ({
      ...acc,
      [id]: "",
    }),
    {}
  )
  ///
  /////////// CUSTOM HOOKS
  ///
  // const {
  //   data: allCategories,
  //   isLoading: loadingCategories,
  //   isSuccess: allCategoriesFetched,
  // } = useFetch<SelectOption_TP[], Category_TP[]>({
  //   queryKey: ["categories"],
  //   endpoint: "classification/api/v1/categories",
  //   enabled: !!activeBand && activeBand.category?.id == 1,
  //   select: (categs) =>
  //     categs.map((categ) => ({
  //       ...categ,
  //       value: categ.name,
  //       label: categ.name,
  //     })),
  // })

  const { values, setFieldValue } =
    useFormikContext<GoldCodingSanad_initialValues_TP>()
  ///
  /////////// STATES
  ///

  const [addSizesModal, setAddSizesModal] = useState(false)
  const [weightItemsModal, setWeightItemsModal] = useState(false)

  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    if (!!!itemsToShowInCaseOfTa2m?.length) {
      setAddSizesModal(false)
    }
  }, [!!itemsToShowInCaseOfTa2m?.length])

  useEffect(() => {
    if (activeBand && detailedWeight_total) {
      setDetailedWeight_total(undefined)
    }
  }, [activeBand])

  useEffect(() => {
    setAwzanItems(activeBand.category.items)
  }, [activeBand])
  
  // go to bond that have left weight if previous left weight is 0
  useEffect(() => {
    const index = selectedSanad?.items.findIndex(item=>item.leftWeight)
    if(!selectedBandLeftWeight)
    setActiveBand(selectedSanad?.items[index])
  }, [selectedBandLeftWeight])
  
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  const handleFixAllPieceData = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
  }

  const shouldRenderButton = () => {
    const hasItemsWithSizes = activeBand.category.items?.some(
      (item) => item?.has_size
    )
    const isSingleCategory = activeBand.category.type === "single"

    return (
      !!itemsToShowInCaseOfTa2m?.length &&
      (hasItemsWithSizes || isSingleCategory)
    )
  }

  const shouldRenderSizesTable =
    hasSizes && (!isMultiCategory || hasItemsWithSizes)
  ///
    
  useEffect(() => {
    const finishedBondTitles = selectedSanad?.items.filter(item=> item.leftWeight === 0).map(item=>item?.category?.name).join(' & ')
   if(!selectedBandLeftWeight)
    notify('info' ,`${finishedBondTitles} الوزن المتبقي يساوي صفر `)
  }, [activeBand])
 
  // if(!selectedBandLeftWeight) return <h2 className="text-mainRed text-xl text-center" >{t('left weight for this bond is equal to 0')}</h2>
 
  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-8 p-4 relative">
      {/* <div className="col-span-4">
        <Checkbox
          onChange={(e) => handleFixAllPieceData(e)}
          name="fixPieceData"
          id="fixPieceData"
          label="تثبيت معلومات القطعة"
        />
      </div> */}
      {/* غير محدد */}
      {/* {loadingCategories && activeBand.category?.id == 1 && <Spinner />} */}
      {activeBand.category?.id == 1 && (
        <SelectCategorySize
          sizes={sizes}
          setItemsToShowInCaseOfTa2m={setItemsToShowInCaseOfTa2m}
          setAwzanItems={setAwzanItems}
          categoryName="category_id"
          sizeTypeName="size_type"
          showNotDefinedType={false}
          theSizeName="size_unit_id"
        />
      )}
      {/* محدد صنف واحد له مقاس*/}
      {activeBand.category.id > 1 &&
        activeBand.category.type === "single" &&
        !!activeBand.category.has_size && (
          <SelectCategorySize
            initialCategory={activeBand.category}
            categoryName="category_id"
            sizeTypeName="size_type"
            showNotDefinedType={false}
            theSizeName="size_unit_id"
          />
        )}
      {/* محدد صنف واحد ملهوش مقاس*/}
      {activeBand.category.id > 1 &&
        activeBand.category.type === "single" &&
        !!!activeBand.category.has_size && (
          <div>
            <p>الصنف</p>
            <p className="shadows py-1 rounded-md bg-gray-300 h-9 mt-1 px-3 cursor-default">
              {activeBand.category.name}
            </p>
          </div>
        )}

      {/* محدد طقم */}
      {activeBand.category.id > 1 && activeBand.category.type === "multi" && (
        <div>
          <p>الصنف</p>
          <p className="shadows py-1 rounded-md bg-white h-9 mt-1 px-3 cursor-default">
            {activeBand.category.name}
          </p>
        </div>
      )}

      {/* بتن اضافة المقاسات لو الطقم فيه عناصر ليها مقاسات */}
      {shouldRenderButton() && (
        <Button
          action={() => setAddSizesModal(true)}
          bordered
          className="h-10 mt-7 whitespace-nowrap"
        >
          إضافة مقاسات الطقم
        </Button>
      )}

      {/* رقم الموديل */}
      <BaseInputField
        placeholder="رقم الموديل"
        label="رقم الموديل"
        id="model_number"
        type="text"
        name="model_number"
      />
      {/* العيار */}
      <div className="flex flex-col gap-1">
        <h2>العيار</h2>
        <div className="shadows py-1 rounded-md bg-gray-200">
          <p className="px-4  py-[.17rem]">{activeBand.goldKarat}</p>
        </div>
      </div>
      {/* الوزن */}
      <div className="flex flex-col">
        <div className="flex mb-1 justify-between items-center">
          {awzanItems && !!awzanItems?.length && (
            <div className="flex items-center">
              <WeightIcon
                action={() =>
                  detailedWeight_total !== 0 &&
                  !detailedWeight_total &&
                  setWeightItemsModal(true)
                }
              />

              {detailedWeight_total !== 0 && detailedWeight_total && (
                <DeleteIcon
                  // size={10}
                  // className=" -top-2 -start-2"
                  action={() => {
                    setDetailedWeight_total(undefined)
                    values.weightitems = []
                  }}
                />
              )}
            </div>
          )}
        </div>
        <div className="flex relative" >
        <BaseInputField
          {...{
            id: "wight",
            type: "number",
            name: "weight",
            label:`${t('weight')}`,
            placeholder: "الوزن",
            ...(detailedWeight_total !== 0 &&
              detailedWeight_total && {
              value: detailedWeight_total,
              onChange: (e) => setDetailedWeight_total(+e.target.value),
              disabled: true,
            }),
          }}
          // value={detailedWeight_total !== 0 && detailedWeight_total ? detailedWeight_total : undefined}
          // onChange={(e) => setDetailedWeight_total(+e.target.value)}
          // placeholder="الوزن"
          // label="الوزن"
          // id="weight"
          // type="number"
          // name="weight"
          disabled={selectedBandLeftWeight === 0}
          className={`${detailedWeight_total !== 0 && detailedWeight_total && "bg-gray-300"
            } ${selectedBandLeftWeight === 0 && 'bg-red-600'}`}
        />
          <span className="absolute left-5 text-sm text-mainGreen">{selectedBandLeftWeight}</span>

        </div>
      </div>

      {/* المصدر */}
      <Country_city_distract_markets
        countryName="country_id"
        countryFieldKey="id"
      />
      {/* لون الذهب */}
      <SelectColor
        field="id"
        modalTitle="إضافة لون ذهب"
        name="color_id"
        label="لون الذهب"
      // onChange={(option) => {
      //   setFieldValue("color_value", option.value)
      // }}
      />
      {/* الاجرة */}
      <div>
        <BaseInputField
          placeholder="الأجرة"
          label="الأجرة"
          id="wage"
          type="text"
          name="wage"
        />
      </div>

      {/* جدول المقاسات */}
      {shouldRenderSizesTable && (
        <div className=" col-span-4">
          <SizesTable sizes={sizes} setSizes={setSizes} />
        </div>
      )}
      {/* صورة القطعة */}
      <div className=" col-span-4 flex flex-col gap-2">
        <label htmlFor="media">صورة القطعة</label>
        <DropFile name="media" />
        {/* وصف القطعة */}
      </div>
      <div className="col-span-4 ">
        <TextAreaField
          placeholder="وصف القطعة"
          name="details"
          id="details"
          label="وصف القطعة"
        />
      </div>
      {/* يحتوي علي حجر ام لا */}
      <div className=" col-span-1 flex items-center justify-center absolute -bottom-16">
        <CheckBoxField
          name="has_stones"
          label={`${!!!values.has_stones ? "لا" : ""} يحتوي علي أحجار`}
        />
        {/* <RadioGroup name="has_stones">
          <RadioGroup.RadioButton
            value={true}
            label="يحتوي علي احجار"
            id="true"
          />
          <RadioGroup.RadioButton
            value={false}
            label="لا يحتوي علي احجار"
            id="false"
          />
        </RadioGroup> */}
      </div>
      {/* /////// */}
      {/* تفاصيل المقاسات */}
      <Modal
        isOpen={addSizesModal && !!itemsToShowInCaseOfTa2m?.length}
        onClose={setAddSizesModal}
        title="إضافة مقاسات الطقم"
      >
        {itemsToShowInCaseOfTa2m?.map((categ) => (
          <Formik
            key={categ.id}
            validationSchema={addTa2mSizesSchema}
            initialValues={{
              sizeIsRequired: true,
              category_id: categ.id,
              size_type: "",
              size_unit_id: "",
            }}
            onSubmit={(values) => {
              if (
                sizes?.some((size) => size.category_id === values.category_id)
              ) {
                notify("error", "هذا المقاس تمت إضافته بالفعل")
                return
              }
              const { sizeIsRequired, ...filteredValues } = values
              setSizes((curr) => [
                ...curr,
                { id: crypto.randomUUID(), ...filteredValues },
              ])

              if (activeBand.category.type === "single") {
                const items = prepareItemsToShowInCaseOfTa2m(categ, sizes)
                items && setItemsToShowInCaseOfTa2m(items)
              }
              notify("success")
            }}
          >
            {({ submitForm}) => (
              <>
                <div className="grid grid-cols-4 gap-x-5">
                  <SelectCategorySize
                    initialCategory={categ}
                    categoryName="category_id"
                    sizeTypeName="size_type"
                    showNotDefinedType={false}
                    theSizeName="size_unit_id"
                  />
                </div>
                <Button
                  type="button"
                  action={submitForm}
                  className="mt-8 mr-auto flex"
              
                >
                  حفظ
                </Button>
              </>
            )}
          </Formik>
        ))}
      </Modal>

      {/* تفاصيل الاوزان */}
      <Modal
        isOpen={
          !!awzanItems &&
          !!awzanItems.length &&
          weightItemsModal &&
          detailedWeight_total !== 0 &&
          !detailedWeight_total
        }
        onClose={setWeightItemsModal}
        title="الوزن التفصيلي للقطع"
      >
        <>
          <Formik
            initialValues={awzanItemsFormInitValues || {}}
            onSubmit={(vals) => {
              // لو تجميعة الاوزان اكتر من ال leftWeight اريتيرن
              let allWeight = 0
              const weightitems = Object.entries(vals).map(([key, val]) => {
                // @ts-ignore
                allWeight += +val
                return { category_id: key, weight: val }
              })
              if (allWeight > activeBand.leftWeight) {
                notify("error", "تجميعة الأوزان اكثر من الوزن المتبقي")
                return
              }
              if (allWeight <= 0) {
                notify("error", "أدخل اوزان")
                return
              }

              // ALL ✅
              /* 
              - اعمل ابديت للوزن الاجمالي
              - setFieldValue
              - اقفل المودل
              */
              setFieldValue("weightitems", weightitems)
              setFieldValue("weight", allWeight)
              setDetailedWeight_total(allWeight)
              setWeightItemsModal(false)
            }}
          >
            {({ submitForm, values }) => (
              <>
                <div className="grid grid-cols-4 gap-5 py-20">
                  {awzanItems?.map((item, i) => (
                    <BaseInputField
                      key={item.id}
                      label={item.name}
                      id={`${item.name}_${i}`}
                      name={item.id.toString()}
                      type="number"
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  action={submitForm}
                  className="mt-8 mr-auto flex"
                >
                  تأكيد
                </Button>
              </>
            )}
          </Formik>
        </>
      </Modal>
    </div>
  )
}
