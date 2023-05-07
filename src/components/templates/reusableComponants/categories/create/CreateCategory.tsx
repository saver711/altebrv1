///
/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import { Dispatch, SetStateAction, useState } from "react"
import * as Yup from "yup"
import { useFetch, useIsRTL, useMutate } from "../../../../../hooks"
import { SelectOption_TP } from "../../../../../types"
import { mutateData } from "../../../../../utils/mutateData"
import { notify } from "../../../../../utils/toast"
import { HandleBackErrors } from "../../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../../atoms"
import { Add } from "../../../../atoms/icons/Add"
import { SvgDelete } from "../../../../atoms/icons/SvgDelete"
import {
    BaseInputField,
    CheckBoxField,
    OuterFormLayout,
    Select
} from "../../../../molecules"
import RadioGroup from "../../../../molecules/RadioGroup"

import { requiredTranslation } from "../../../../../utils/helpers"

///
/////////// Types
///
type CreateCategoryProps_TP = {
  value?: string
  onAdd?: (value: string) => void
  editData?: { [key: string]: any }
  setDataSource?: Dispatch<SetStateAction<InitialValues_TP[]>>
  setShow?: Dispatch<SetStateAction<boolean>>
}

type SingleCategory_TP = {
  name_en: string
  name_ar: string
  type: "multi" | "single"
  selling_type: "part" | "all"
  has_selsal: boolean
  has_size: boolean
  sizes: SizeProps_TP[]
} & SizeProps_TP

type InitialValues_TP = {
  items: SingleCategory_TP[]
} & SingleCategory_TP

type SizeProps_TP = {
  start: number
  end: number
  increase: number
  size_type: string
}

type SizeProps_TP2 = {
  start: number
  end: number
  increase: number
  type: string
}

const CreateCategory = ({
  value,
  onAdd,
  editData,
  setDataSource,
  setShow,
}: CreateCategoryProps_TP) => {
  ///
  /////////// STATES
  ///
  const [sizes, setSizes] = useState<SizeProps_TP2[]>(editData ? editData?.sizes ? editData?.sizes : [] : [])

  ///
  /////////// HELPER VARIABLES & FUNCTIONS
  ///
  const isRTL = useIsRTL()

  const handleEditedItems = (items: any) => {
    return items.map((item: any) => {
      return {
        id: item.id,
        label: item.name,
        name: item.name,
        value: item.id
      }
    })
  }

  const initialValues: InitialValues_TP = {
    name_ar: editData ? editData.name_ar : isRTL ? value! : "",
    name_en: editData ? editData.name_en : !isRTL ? value! : "",
    type: editData ? editData?.type : "single",
    selling_type: editData ? editData?.selling_type : "part",
    items: editData && editData.items ? handleEditedItems(editData.items) : [],
    has_selsal: editData ? editData?.has_selsal : false,
    has_size: editData ? editData?.has_size : false,
    start: 0,
    end: 0,
    increase: 0,
    size_type: "غير محدد",
    sizes: editData ? editData?.sizes ? editData?.sizes : [] : [],
  }

  const validatingSchema = Yup.object({
    name_en: Yup.string().trim().required(requiredTranslation),
    name_ar: Yup.string().trim().required(requiredTranslation),
    type: Yup.string().trim().required(requiredTranslation),
    selling_type: Yup.string().trim().required(requiredTranslation),
    has_selsal: Yup.boolean().required(requiredTranslation),
    has_size: Yup.boolean(),
    items: Yup.array().when("type", {
      is: "multi",
      then: (schema) => schema.min(1, requiredTranslation),
    }),
    start: Yup.number().when("has_size", {
      is: true && sizes?.length <= 0,
      then: (schema) =>
        schema.min(1, requiredTranslation).required(requiredTranslation),
    }),
    end: Yup.number().when("has_size", {
      is: true && sizes?.length <= 0,
      then: (schema) =>
        schema.min(1, requiredTranslation).required(requiredTranslation),
    }),
    increase: Yup.number().when("has_size", {
      is: true && sizes?.length <= 0,
      then: (schema) =>
        schema.min(1, requiredTranslation).required(requiredTranslation),
    }),
    size_type: Yup.string().when("has_size", {
      is: true && sizes?.length <= 0,
      then: (schema) => schema.required(requiredTranslation),
    }),
  })

  ///
  /////////// CUSTOM HOOKS
  ///
  const {
    data: categoryOptions,
    refetch: categoryRefetch,
    isLoading: categoryLoading,
  } = useFetch<SelectOption_TP[]>({
    endpoint: "classification/api/v1/categories?type=single",
    queryKey: ["categories"],
    select: (categories) => {
      return categories.map((category: any) => ({
        id: category.id,
        label: category.name,
        name: category.name,
        value: category.id,
      }))
    },
  })

  const queryClient = useQueryClient()
  const { mutate, isLoading, error } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data: any) => {
      notify("success")
      if (value && onAdd) {
        onAdd(value)
        queryClient.setQueryData(["categories"], (old: any) => {
          return [...old, data]
        })
      }
      if (setDataSource && setShow && !editData && !error) {
        // setDataSource((prev: any) => [...prev, data])
        queryClient.refetchQueries(['AllCategory'])
        setShow(false)
      }
      if (setDataSource && setShow && editData && !error) {
        setShow(false)
        queryClient.refetchQueries(['AllCategory'])
        // setDataSource((prev: any) =>
        //   prev.map((p: any) => (p.id === data?.id ? data : p))
        // )
      }
    },
  })

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  const addSize = (props: SizeProps_TP) => {
    const size = {
      start: props.start,
      end: props.end,
      increase: props.increase,
      type: props.size_type,
    }
    setSizes([...sizes, size])
    // const size_gap = props.end - props.start
    // if (size_gap > 0 && (size_gap % props.increase === 0)) {
    //   const size = {
    //     start: props.start,
    //     end: props.end,
    //     increase: props.increase,
    //     type: props.size_type,
    //   }
    //   setSizes([...sizes, size])
    // } else {
    //   notify('error', `${t('sizes must be accurate')}`)
    // }
  }

  const deleteSize = (index: number) => {
    const newSizes = sizes.filter((size, i) => index !== i)
    setSizes(newSizes)
  }

  const send = (values: InitialValues_TP) => {
    const multi = values.type === "multi"
    const singleValues = {
      name_en: values.name_en,
      name_ar: values.name_ar,
      type: "single",
      selling_type: values.selling_type,
      has_selsal: values.has_selsal,
      has_size: values.has_size,
    }
    const multiValues = {
      name_en: values.name_en,
      name_ar: values.name_ar,
      type: "multi",
      selling_type: values.selling_type,
      has_selsal: values.has_selsal,
      has_size: false,
      items: values.items,
    }
    mutate({
      endpointName: editData
        ? `/classification/api/v1/categories/${editData.id}`
        : `/classification/api/v1/categories`,
      values: multi
        ? multiValues
        : values.has_size
        ? { ...singleValues, sizes }
        : singleValues,
      method: editData ? "put" : "post",
    })

    multi
       ? console.log(multiValues)
       : console.log(values.has_size ? {...singleValues, sizes} : singleValues)
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => send(values)}
      validationSchema={validatingSchema}
    >
      {(props) => (
        <Form>
          <HandleBackErrors errors={error?.response?.data?.errors}>
            <OuterFormLayout>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-5">{t("categories")}</h2>
                <div className="flex justify-between">
                  <div className="flex gap-3 mb-5">
                    <span className="font-bold">{t("category type")}:</span>
                    <RadioGroup
                      name="type"
                      onChange={(val) => {
                        if (val === "multi") {
                          categoryRefetch()
                          props.values.has_size = false
                        }
                      }}
                    >
                      <div className="flex gap-3">
                        <RadioGroup.RadioButton
                          value="single"
                          label={`${t("single category")}`}
                          id="single_category"
                        />
                        <RadioGroup.RadioButton
                          value="multi"
                          label={`${t("multiple categories")}`}
                          id="multiple_categories"
                        />
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex gap-3 mb-5">
                    <span className="font-bold">{t("Selling policy")}:</span>
                    <RadioGroup name="selling_type">
                      <div className="flex gap-3">
                        <RadioGroup.RadioButton
                          value="part"
                          label={`${t("sell by piece")}`}
                          id="sell_by_piece"
                        />
                        <RadioGroup.RadioButton
                          value="all"
                          label={`${t("sell in bulks")}`}
                          id="sell_in_bulks"
                        />
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="grid grid-cols-4 mb-5 gap-3 text-start">
                  <BaseInputField
                    id="category_name_ar"
                    label={`${t("category name in arabic")}`}
                    name="name_ar"
                    type="text"
                    placeholder={`${t("category name in arabic")}`}
                    defaultValue={editData ? editData.name : ""}
                  />
                  <BaseInputField
                    id="category_name_en"
                    label={`${t("category name in english")}`}
                    name="name_en"
                    type="text"
                    placeholder={`${t("category name in english")}`}
                  />
                  {props.values.type == "multi" && (
                    <Select
                      label={`${t("choose categories")}`}
                      name="items"
                      id="items"
                      isMulti={true}
                      required={false}
                      defaultValue={handleEditedItems(props.values.items)}
                      placeholder={`${t("choose categories")}`}
                      loadingPlaceholder="Loading..."
                      options={categoryOptions}
                      loading={categoryLoading}
                    />
                  )}
                </div>
                <div className="flex justify-between mb-8">
                  <div className="flex gap-3">
                    <span className="flex items-center font-bold ">
                      {t("category policy")}:
                    </span>
                    <CheckBoxField
                      label={`${t("accepts the addition of a chain")}`}
                      name="has_selsal"
                      id="has_selsal"
                    />
                  </div>
                  {props.values.type == "single" && (
                    <div className="flex gap-3">
                      <span className="flex items-center font-bold ">
                        {t("size policy")}:
                      </span>
                      <CheckBoxField
                        label={`${t("got size")}`}
                        type="checkbox"
                        id="has_size"
                        name="has_size"
                      />
                    </div>
                  )}
                </div>
                {props.values.has_size == true && props.values.type === "single" && (
                  <div className="grid grid-cols-5 mb-4 gap-10 text-start">
                    <BaseInputField
                      id="start"
                      label={`${t("size rate")}`}
                      name="start"
                      type="number"
                      placeholder={`${t("start")}`}
                    />
                    <BaseInputField
                      id="end"
                      label={`${t("size rate")}`}
                      name="end"
                      type="number"
                      placeholder={`${t("end")}`}
                    />
                    <BaseInputField
                      id="increase"
                      label={`${t("increase rate")}`}
                      name="increase"
                      type="number"
                      placeholder={`${t("increase rate")}`}
                    />
                    <BaseInputField
                      id="size_type"
                      label={`${t("size type")}`}
                      name="size_type"
                      type="text"
                      placeholder={`${t("size type")}`}
                    />
                    <Button
                      type="button"
                      className="self-end relative active:top-[1px] py-2 px-8 font-bold rounded-md w-full border border-lightBlack flex items-center justify-center gap-2"
                      disabled={
                        props.values.start <= 0 ||
                        props.values.end <= 0 ||
                        props.values.increase <= 0 ||
                        props.values.size_type == ""
                      }
                      action={() => addSize(props.values)}
                    >
                      <Add />
                      {t("add")}
                    </Button>
                  </div>
                )}
                {sizes.length > 0 && props.values.has_size && (
                  <div className="grid grid-cols-6 gap-5 mb-5 text-center">
                    {sizes.map((size: SizeProps_TP2, index) => (
                      <div key={index} className="bg-white p-3 text-mainGreen shadow-md grid grid-cols-12 rounded-xl hover:bg-mainGreen hover:text-white">
                        <div className="col-span-9 flex flex-col">
                          <div className="flex justify-around mb-2 align-middle gap-x-4">
                            <div className="truncate">
                              <span className="">{`${t("start")}`}: </span>
                              <span className="mx-1 text-mainOrange">
                                {size.start}
                              </span>
                            </div>
                            <div className="truncate">
                              <span className="">{`${t("end")}`}: </span>
                              <span className="mx-1 text-mainOrange">
                                {size.end}
                              </span>
                            </div>
                          </div>
                          <div className="truncate">
                            <span className="">
                              {`${t("increase rate")}`}:{" "}
                            </span>
                            <span className="mx-1 text-mainOrange">
                              {size.increase}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="w-0.5 mx-auto bg-gray-300 h-full"></div>
                        </div>
                        <div className="col-span-2 flex justify-center items-center">
                          <SvgDelete
                            stroke="#ef4444"
                            action={() => deleteSize(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  type="button"
                  action={() => {
                    if (
                      props.values.has_size &&
                      sizes.length <= 0 &&
                      props.isValid
                    )
                      notify("error", `${t("sizes is required")}`)
                    else props.submitForm()
                  }}
                  className="self-end"
                  loading={isLoading}
                >
                  {t("add")}
                </Button>
              </div>
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      )}
    </Formik>
  )
}

export default CreateCategory
