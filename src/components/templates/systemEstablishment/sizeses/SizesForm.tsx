/////////// IMPORTS
///
//import classes from './SizesForm.module.css'
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik, FormikValues } from "formik"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { SingleValue } from "react-select"
import * as Yup from "yup"
import { useFetch, useMutate } from "../../../../hooks"
import { SelectOption_TP } from "../../../../types"
import { requiredTranslation } from "../../../../utils/helpers"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { HandleBackErrors } from "../../../../utils/utils-components/HandleBackErrors"
import { Button } from "../../../atoms"
import {
    BaseInputField,
    InnerFormLayout,
    OuterFormLayout,
    Select
} from "../../../molecules"
import CreateCategory from "../../reusableComponants/categories/create/CreateCategory"
/////////// Types
///
type sizesTypes_TP = {
  category_name: string
  id: string
  start: number
  end: number
  increase: number
  type: string
  units: [{ id: string; size_id: string; value: string }]
}
type categories_TP = {}
type TypesMutate_TP = {
  name: string
  id: string
}

/////////// HELPER VARIABLES & FUNCTIONS
///
///

const NewSizeTypeOptionComponent = ({
  value,
  onAdd,
}: {
  value: string
  onAdd: (value: string) => void
}) => {
  const initialValues = {
    name_ar: value,
    name_en: "",
  }
  const validationSchema = Yup.object({
    name_ar: Yup.string().trim().required(requiredTranslation),
    name_en: Yup.string().trim().required(requiredTranslation),
  })
  const queryClient = useQueryClient()
  const { mutate, isLoading, error } = useMutate<TypesMutate_TP>({
    mutationFn: mutateData,
    onSuccess: (data) => {
      queryClient.setQueryData(["sizesType"], (old: any) => {
        return [
          ...(old || []),
          {
            //@ts-ignore
            id: data.id,
            name: data?.name,
          },
        ]
      })
      notify("success")
      onAdd(value)
    },
  })
  const handleSubmit = (values: FormikValues) => {
    console.log(values)
    
    mutate({
      endpointName: "",
      values: {
        name_ar: values.name_ar,
        name_en: values.name_en,
      },
    })
  }
  return (
    <div className="flex items-center justify-between gap-2">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values)
        }}
        validationSchema={validationSchema}
      >
        <HandleBackErrors errors={error?.response?.data?.errors}>
          <Form className="w-full">
            <div className="flex gap-x-8 items-center">
              <BaseInputField
                id="name_ar"
                label={`${t("type in arabic")}`}
                name="name_ar"
                type="text"
                placeholder={`${t("type in arabic")}`}
              />

              <BaseInputField
                id="name_en"
                label={`${t("type in english")}`}
                name="name_en"
                type="text"
                placeholder={`${t("type in english")}`}
              />
            </div>
            <Button
              type="submit"
              className="ms-auto mt-8"
              disabled={isLoading}
              loading={isLoading}
            >
              {t("submit")}
            </Button>
          </Form>
        </HandleBackErrors>
      </Formik>
    </div>
  )
}

export const SizesForm = () => {
  /////////// VARIABLES
  ///
  const validatingSchema = Yup.object().shape({
    start: Yup.number()
      .required("برجاء ملئ هذا الحقل")
      .min(1)
      .typeError(" مسموح بالارقام  فقط  "),
    end: Yup.number()
      .required("برجاء ملئ هذا الحقل")
      .min(1)
      .typeError(" مسموح بالارقام  فقط  "),
    increase: Yup.number()
      .required("برجاء ملئ هذا الحقل")
      .min(0)
      .typeError(" مسموح بالارقام  فقط  "),
    category_id: Yup.string()
      .trim()
      .required("برجاء ملئ هذا الحقل")
      .typeError("لا يمكن ان يكون الحقل فارغ"),
    sizeType: Yup.string()
      .trim()
      .required("برجاء ملئ هذا الحقل")
      .typeError("لا يمكن ان يكون الحقل فارغ"),
  })

  const initialValues = {
    category_id: "",
    sizeType: "",
    start: "",
    end: "",
    increase: "",
  }
  ///
  /////////// CUSTOM HOOKS
  ///
  const categoriesOptionsApi = [
    { id: 1, value: "1", label: "سلسله" },
    { id: 4, value: "2", label: "خاتم" },
  ]
  ///
  /////////// STATES
  ///
  const [categoryID, setCategoryID] = useState({ id: "", category_name: "" })
  const [newValue, setNewValue] =
    useState<SingleValue<SelectOption_TP> | null>()
  ///
  /////////// SIDE EFFECTS
  ///
  console.log(categoryID)
  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///
  const { data: categories, isLoading: loadingClassification } = useFetch<
    SelectOption_TP[],
    categories_TP[]
  >({
    queryKey: ["categories"],
    endpoint: "classification/api/v1/categories?type=all",
    // select: (data) =>
    //   data.map((category) => ({
    //     ...category,
    //     id: category.id,
    //     value: category.category_name,
    //     label: category.category_name,
    //   })),
  })
  const { data: sizeTypes, isLoading: loadingSizeType } = useFetch<
    SelectOption_TP[],
    sizesTypes_TP[]
  >({
    queryKey: ["sizesType"],
    endpoint: `/size/api/v1/category/${categoryID?.id}`,
    select: (data) => {
      return data.map((type) => ({
        ...type,
        id: type.id,
        value: type.type,
        label: type.type,
      }))
    },
    enabled: !!categoryID?.id,
  })
  const {
    mutate: sizesMutate,
    isLoading: isLoadingSizes,
    error,
  } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data) => {
      console.log("sizesMutate", data)
      notify("success")
    },
    onError: (err) => {
      console.log(err)
      notify("error")
    },
  })
  useEffect(() => {
    if (sizeTypes) {
      setNewValue(null)
    }
  }, [JSON.stringify(sizeTypes)])

  console.log("categories", categories)
  console.log("sizeType", sizeTypes)
  const handleSubmit = (values: any) => {
    console.log("handelSubmit", values)
    sizesMutate({
      endpointName: "/size/api/v1/sizes",
      values: {
        type: values.sizeType,
        start: values.start,
        end: values.end,
        increase: values.increase,
        category_id: values.category_id,
      },
    })
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validatingSchema}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <HandleBackErrors errors={error?.response?.data?.errors}>
              <OuterFormLayout
                header={`${t("add size")}`}
                submitComponent={
                  <Button
                    loading={isLoadingSizes}
                    type="submit"
                    className="ms-auto mt-8"
                  >
                    {t("submit")}
                  </Button>
                }
              >
                <InnerFormLayout>
                  <Select
                    label="الاصناف"
                    name="category_id"
                    id="category_id"
                    isMulti={false}
                    required={false}
                    placeholder="Select"
                    loadingPlaceholder="Loading..."
                    loading={false}
                    creatable={true}
                    CreateComponent={CreateCategory}
                    options={categoriesOptionsApi}
                    fieldKey="id"
                    onChange={(option) => {
                      setFieldValue("category_id", option?.id)
                      //@ts-ignore
                      setCategoryID(option)
                    }}
                    // defaultValue={{
                    //   value: categoriesOptionsApi[0].label,
                    //   label: categoriesOptionsApi[0].label,
                    // }}
                  />
                  {/* <SelectCategory
                  label={`${t("categories")}`}
                  name="category_id"
                  field="id"
                  onChange={(option: any) => {
                    setCategoryID(option)
                  }}
                /> */}
                  <Select
                    label="نوع المقاس"
                    name="sizeType"
                    id="sizeType"
                    isMulti={false}
                    required
                    isDisabled={!!!categoryID?.id}
                    placeholder={
                      categoryID?.id &&
                      `
                    ${sizeTypes?.length !== 0 ? "اختر النوع" : "لا يوجد "} `
                    }
                    loadingPlaceholder={`${
                      !categoryID?.id ? "اختر الصنف أولا" : t("loading")
                    }`}
                    loading={loadingSizeType}
                    creatable={true}
                    CreateComponent={NewSizeTypeOptionComponent}
                    // onComplexCreate={(value) => {}}
                    options={sizeTypes}
                    value={newValue}
                    onChange={(option: SingleValue<SelectOption_TP>) => {
                      setNewValue(option)
                    }}
                    fieldKey="id"
                  />
                  <BaseInputField
                    id="start"
                    label=" بدايه معدل المقاس"
                    name="start"
                    type="text"
                    placeholder="من ..."
                    required
                  />
                  <BaseInputField
                    id="end"
                    label=" نهايه معدل المقاس"
                    name="end"
                    type="text"
                    placeholder="الي ..."
                    required
                  />
                  <BaseInputField
                    id="increase"
                    label="معدل  الزياده"
                    name="increase"
                    type="text"
                    placeholder=" معدل الزياده"
                    required
                  />
                </InnerFormLayout>
              </OuterFormLayout>
            </HandleBackErrors>
          </Form>
        )}
      </Formik>
    </>
  )
}
