/////////// IMPORTS
///

import { useQueryClient } from "@tanstack/react-query"
import { Formik } from "formik"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { AiFillDelete } from "react-icons/ai"
import { Button } from "../../../components/atoms"
import { Header } from "../../../components/atoms/Header"
import {
  Accordion,
  BaseInputField,
  TextAreaField,
} from "../../../components/molecules"
import NinjaTable from "../../../components/molecules/NinjaTable"
import RadioGroup from "../../../components/molecules/RadioGroup"
import { DropFile } from "../../../components/molecules/files/DropFile"
import { Column } from "../../../components/molecules/table/types"
import { Country_city_distract_markets } from "../../../components/templates/reusableComponants/Country_city_distract_markets"
import SelectColor from "../../../components/templates/reusableComponants/SelectColor"
import SelectStoneNature from "../../../components/templates/reusableComponants/stones/select/SelectStoneNature"
import SelectStonePurity from "../../../components/templates/reusableComponants/stones/select/SelectStonePurity"
import SelectStoneShape from "../../../components/templates/reusableComponants/stones/select/SelectStoneShape"
import SelectStoneType from "../../../components/templates/reusableComponants/stones/select/SelectStoneType"
import { SetState_TP } from "../../../types"
import { notify } from "../../../utils/toast"
import {
  GoldCodingStoneValues_TP,
  goldCodingStoneSchema,
  goldCodingStoneValues,
} from "../coding-types-and-helpers"

///
/////////// Types
///
export type Query_TP = {
  name: string
  id: string
}

export type StoneRow_TP = {
  stone: string
  color: string
  shape: string
  purity: string
  weight: number
  count: number
  nature: string
  certificate_number: string
  certificate_source: string
  certificate_url: string
}
// -----------------
type AddStoneProps_TP = {
  stones: GoldCodingStoneValues_TP[] | undefined
  setStones: SetState_TP<GoldCodingStoneValues_TP[]>
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddStone = ({ stones, setStones }: AddStoneProps_TP) => {
  /////////// VARIABLES
  ///
  // const types = useGetQueryData<Query_TP[]>(["stone_type"])
  // const colors = useGetQueryData<Query_TP[]>(["colors"])
  // const shapes = useGetQueryData<Query_TP[]>(["stone_shape"])
  // const purities = useGetQueryData<Query_TP[]>(["stone_purity"])
  // const natures = useGetQueryData<Query_TP[]>(["stone_nature"])
  const [queryData, setQueryData] = useState<StoneRow_TP[] | undefined>()

  const columns: Column[] = [
    {
      name: "stone",
      label: "stone",
    },
    {
      name: "color",
      label: "color",
    },
    {
      name: "shape",
      label: "shape",
    },
    {
      name: "purity",
      label: "purity",
    },
    {
      name: "weight",
      label: "weight",
    },
    {
      name: "count",
      label: "count",
    },
    {
      name: "nature",
      label: "nature",
    },
    {
      name: "certificate_number",
      label: "certificate number",
    },
    {
      name: "certificate_source",
      label: "source",
    },
    {
      name: "certificate_url",
      label: "certificate_url",
    },
    {
      name: "delete",
      label: "delete",
      Cell: (props) => {
        return (
          <AiFillDelete
            className="text-red-700 mx-auto cursor-pointer"
            onClick={() => {
              const newQueryData = [...queryData]
              newQueryData?.splice(props.rowIndex, 1)
              setQueryData(newQueryData)
              const newStones = [...stones]
              newStones?.splice(props.rowIndex, 1)
              setStones(newStones)
            }}
          />
        )
      },
    },
  ]
  ///
  /////////// CUSTOM HOOKS
  ///
  const queryClient = useQueryClient()
  useEffect(() => {
    if (queryClient) {
      const types = queryClient.getQueryData<Query_TP[]>(["stone_type"])
      const colors = queryClient.getQueryData<Query_TP[]>(["colors"])
      const shapes = queryClient.getQueryData<Query_TP[]>(["stone_shape"])
      const purities = queryClient.getQueryData<Query_TP[]>(["stone_purity"])
      const natures = queryClient.getQueryData<Query_TP[]>(["stone_nature"])
      const countries = queryClient.getQueryData<Query_TP[]>(["countries"])
      const allQueries = stones?.map((stone) => {
        const finaleStone = {
          stone: types?.find((type) => type.id == stone.stone_id)?.name!,
          color: colors
            ?.filter((item) => stone.color_id.includes(item.id))
            .map((item) => item.name)
            .join(" & ")!,
          shape: shapes
            ?.filter((item) => stone.shape_id.includes(item.id))
            .map((item) => item.name)
            .join(" & ")!,
          purity: purities?.find((type) => type.id == stone.purity_id)?.name!,
          weight: stone.weight,
          count: stone.count,
          nature: natures?.find((type) => type.id == stone.nature_id)?.name!,
          certificate_number: stone.certificate_number,
          certificate_source: countries?.find(
            (country) => country.id == stone.certificate_source
          )?.name!,
          certificate_url: stone.certificate_url,
        }
        return finaleStone
      })
      setQueryData(allQueries)
    }
  }, [stones])
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
    <Accordion className=" bg-lightGreen" title="تفاصيل الأحجار">
      <div className="  bg-lightGreen rounded-md p-4 mt-3">
        <div className="bg-white shadows mt-6 rounded-md p-4 overflow-x-hidden">
          <Formik
            initialValues={goldCodingStoneValues}
            validationSchema={goldCodingStoneSchema}
            onSubmit={(values) => {
              notify("success", `${t("stone added successfully")}`)
              setStones((curr) => [
                ...(curr || []),
                { id: crypto.randomUUID(), ...values },
              ])
            }}
          >
            {({ submitForm, errors, touched, setFieldValue }) => (
              <div className="grid grid-cols-4 gap-x-4 gap-y-8 p-4 ">
                <SelectStoneType
                  label="نوع الحجر"
                  name="stone_id"
                  field="id"
                  // onChange={(option) => {
                  //   setFieldValue("stoneType_value", option.value)
                  // }}
                />

                <SelectStonePurity
                  field="id"
                  label="نقاء الحجر"
                  name="purity_id"
                  // onChange={(option => {
                  //   setFieldValue('stonePurity_value', option.value)
                  // })}
                />
                <BaseInputField
                  id="weight"
                  name="weight"
                  type="number"
                  label="وزن الحجر بالقيراط"
                />
                <BaseInputField
                  id="count"
                  name="count"
                  type="number"
                  label="عدد الحجر بالقطعة"
                />
                <SelectStoneNature
                  field="id"
                  label="طبيعة الحجر"
                  name="nature_id"
                  // onChange={(option => {
                  //   setFieldValue('stoneNature_value', option.value)
                  // })}
                />
                <BaseInputField
                  id="certificate_number"
                  name="certificate_number"
                  type="text"
                  label="رقم شهادة الحجر"
                />
                <Country_city_distract_markets
                  countryName="certificate_source"
                  countryLabel="مصدر شهادة الحجر"
                />
                <BaseInputField
                  id="certificate_url"
                  name="certificate_url"
                  type="text"
                  label="رابط شهادة الحجر"
                />
                <div className="col-span-4 flex gap-x-5" >
                <SelectStoneShape
                  multi
                  field="id"
                  label="قطع شكل الحجر"
                  name="shape_id"
                  // onChange={(option => {
                  //   setFieldValue('stoneShape_value', option.value)
                  // })}
                />
                <SelectColor
                  field="id"
                  multi
                  label="لون الحجر"
                  name="color_id"
                  modalTitle="إضافة لون حجر"
                  // onChange={(option => {
                  //   setFieldValue('stoneColor_value', option.value)
                  // })}
                />
                </div>
                <div className=" col-span-4 flex flex-col gap-2 ">
                  <label htmlFor="certificate_files">إرفاق شهادة الحجر</label>
                  <DropFile name="certificate_files" />
                </div>
                <div className="flex gap-4 items-center">
                  <RadioGroup name="stone_type">
                    <RadioGroup.RadioButton
                      value="added"
                      label="حجر مضاف"
                      id="added"
                    />
                    <RadioGroup.RadioButton
                      value="not_added"
                      label="حجر غير مضاف"
                      id="not_added"
                    />
                  </RadioGroup>
                </div>
                {/* @ts-ignore */}
                {errors.at_least_one && <p>at least one checked</p>}
                <div className=" col-span-4">
                  <TextAreaField
                    placeholder="مواصفات الحجر"
                    id="stones_details"
                    name="details"
                    label="مواصفات الحجر"
                  />
                </div>
                <div className="col-span-4 flex justify-end items-end">
                  <Button action={submitForm} bordered>
                    {stones?.length > 0 ? "إضافة حجر آخر" : "إضافة حجر"}
                  </Button>
                </div>
                {!!stones && !!stones.length && queryData?.length > 0 && (
                  <div className="flex flex-col col-span-4">
                    <Header header="تفاصيل الأحجار المضافة" />
                    <div className=" my-6 shadows bg-lightGreen bg-opacity-50 rounded-lg p-[.10rem]">
                      {!!queryData && (
                        <div className="subTable">
                          <NinjaTable
                            data={queryData}
                            columns={columns}
                            creatable={false}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Formik>
        </div>
      </div>
    </Accordion>
  )
}
