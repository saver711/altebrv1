/////////// IMPORTS
///
///
/////////// Types
///

import { useFormikContext } from "formik"
import { t } from "i18next"
import { useEffect } from "react"
import { Button } from "../../atoms"
import {
  BaseInputField,
  InnerFormLayout,
  OuterFormLayout,
} from "../../molecules"

/////////// HELPER VARIABLES & FUNCTIONS
///
type ColorMainDataProps_TP = {
  editData?: any
  title?: string
  isLoading: boolean
  isSuccessPost?: boolean
}
///
export const ColorMainData = ({
  editData,
  title,
  isLoading,
  isSuccessPost,
}: ColorMainDataProps_TP) => {
  console.log("🚀 ~ file: ColorMainData.tsx:33 ~ isSuccessPost:", isSuccessPost)

  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const { resetForm } = useFormikContext<any>()

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///
  useEffect(() => {
    resetForm()
  }, [isSuccessPost])

  ///
  return (
    <>
      <OuterFormLayout
        header={title}
        submitComponent={
          <Button type="submit" loading={isLoading} className="ms-auto mt-8">
            {t("submit")}
          </Button>
        }
      >
        <>
          <InnerFormLayout title={`${t("main data")}`}>
            {/* nationality ar  start */}
            <BaseInputField
              id="name_ar"
              label={`${t("nationality in arabic")}`}
              name="name_ar"
              type="text"
              placeholder={`${t("nationality in arabic")}`}
              defaultValue={editData ? editData.name : ""}
              // value={value}
            />
            {/* nationality ar  end */}

            {/* nationality en  start */}
            <BaseInputField
              id="name_en"
              label={`${t("nationality in english")}`}
              name="name_en"
              type="text"
              placeholder={`${t("nationality in english")}`}
              // value={value}
            />
            {/* nationality en  end */}
          </InnerFormLayout>
        </>
      </OuterFormLayout>
    </>
  )
}
