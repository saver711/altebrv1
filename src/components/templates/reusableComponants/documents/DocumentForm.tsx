/////////// IMPORTS
///
import { Form, Formik, FormikValues } from "formik"
import { t } from "i18next"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import * as Yup from "yup"
import { SelectOption_TP } from "../../../../types"
import { requiredTranslation } from "../../../../utils/helpers"
import { Button } from "../../../atoms"
import { BaseInputField, DateInputField, Select } from "../../../molecules"
import { DropFile } from "../../../molecules/files/DropFile"
import { allDocs_TP } from "./Documents"
import { formatDate } from "../../../../utils/date"

///
/////////// Types
///
type DocumentFormProps_TP = {
  setDocsFormValues: Dispatch<SetStateAction<allDocs_TP[]>>
  setAddDocPopup: Dispatch<SetStateAction<boolean>>
  editableData: allDocs_TP | undefined
  setEditableData: Dispatch<SetStateAction<allDocs_TP | undefined>>
  addDocPopup: boolean
}

///
/////////// HELPER VARIABLES & FUNCTIONS
///

export const DocumentForm = ({
  setDocsFormValues,
  setAddDocPopup,
  editableData,
  setEditableData,
  addDocPopup,
}: DocumentFormProps_TP) => {
  console.log("🚀 ~ file: DocumentForm.tsx:36 ~ editableData:", editableData)
  ///
  /////////// VARIABLES
  ///
  const initialValues: allDocs_TP = {
    docName: editableData?.docName || "",
    docNumber: editableData?.docNumber || "",
    files: editableData?.files || [],
    docType: editableData?.docType || {
      id: "1",
      label: "سجل تجاري",
      value: "1",
    },
    endDate: !!editableData?.endDate ?  new Date(editableData?.endDate) : new Date(),
    reminder: editableData?.reminder || "60",
    id: editableData?.id || crypto.randomUUID(),
  }
  const validationSchema = Yup.object({
    docName: Yup.string().trim().required(requiredTranslation),
    docNumber: Yup.string().trim().required(requiredTranslation),
    reminder: Yup.number()
      .min(1, requiredTranslation)
      .required(requiredTranslation),
    endDate: Yup.string().required(requiredTranslation),
  })

  ///
  /////////// CUSTOM HOOKS
  ///

  // // get identity
  // const {
  //   data: identity,
  //   isLoading: identityLoading,
  // } = useFetch<SelectOption_TP[]>({
  //   endpoint: "identity",
  //   queryKey: ["identity"],
  //   select: (identities) =>
  //     identities.map((identity: any) => ({
  //       id: identity.id,
  //       value: identity.identityName,
  //       label: identity.identityName,
  //     })),
  // })
  const docTypeOptions = [
    { id: 1, value: "1", label: "سجل تجاري" },
    { id: 2, value: "2", label: "شهادة الزكاة والدخل" },
    { id: 3, value: "3", label: "شهادة ضريبية" },
    { id: 4, value: "4", label: "شهادة البلدية" },
    { id: 5, value: "5", label: "هوية" },
    { id: 6, value: "6", label: "تراخيص" },
    { id: 7, value: "7", label: "اخرى" },
  ] as SelectOption_TP[]

  ///
  /////////// STATES
  ///
  const [docType, setDocType] = useState()
  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    if (addDocPopup === false) {
      setEditableData({} as allDocs_TP)
    }
  }, [addDocPopup])

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  function handleAddDocData(values: FormikValues) {
    let newDocType: any
    if ((!editableData && !docType) || (editableData && !docType))
      newDocType = values.docType
    else newDocType = docType

    setDocsFormValues((prev: any) => {
      const newDocs = prev.filter((doc: allDocs_TP) => doc.id !== values.id)
      return [
        ...newDocs,
        {
          id: values.id,
          data: {
            docName: values.docName,
            docType: newDocType,
            docNumber: values.docNumber,
            endDate: formatDate(values.endDate),
            reminder: values.reminder,
          },
          files: values.files,
        },
      ]
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleAddDocData(values)
        console.log("🚀 ~ file: DocumentForm.tsx:180 ~ values:", values)

        setEditableData({} as allDocs_TP)
        setAddDocPopup(false)
      }}
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form>
          <h2 className="text-center mb-8">{t("Adding document")}</h2>

          <div className="grid grid-cols-4 gap-3 text-start items-center">
            <Select
              id="docType"
              label={`${t("document type")}`}
              name="docType"
              placeholder={`${t("document type")}`}
              loadingPlaceholder={`${t("loading")}`}
              options={docTypeOptions}
              //@ts-ignore
              onChange={(option) => setDocType(option)} //@ts-ignore
              defaultValue={initialValues.docType}
            />
            <BaseInputField
              id="docName"
              label={`${t("document name")}`}
              name="docName"
              type="text"
              placeholder={`${t("document name")}`}
            />
            <BaseInputField
              id="docNumber"
              label={`${t("document number")}`}
              name="docNumber"
              type="text"
              placeholder={`${t("document number")}`}
            />
            <DateInputField
              label={`${t("end date")}`}
              name="endDate"
              minDate={new Date()}
              labelProps={{ className: "mb-2" }}
            />
            <BaseInputField
              id="reminder"
              label={`${t("reminder days count")}`}
              name="reminder"
              type="number"
              placeholder={`${t("reminder days count")}`}
            />
          </div>
          <div className="mt-8">
            <DropFile name="files" />
          </div>
          <Button type="submit">{t("submit")}</Button>
        </Form>
      )}
    </Formik>
  )
}
