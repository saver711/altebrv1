/////////// IMPORTS
///
///
/////////// Types
///

import { t } from "i18next"

import { useFormikContext } from "formik"
import { useEffect } from "react"
import {
  BaseInputField,
  InnerFormLayout,
  OuterFormLayout,
} from "../../../../molecules"
import { Button } from "../../../../atoms"
import { Country_city_distract_markets } from "../../Country_city_distract_markets"

/////////// HELPER VARIABLES & FUNCTIONS
///
type StonePurityMainDataProps_TP = {
  editData: any
  title?: string
  isLoading: boolean
  isSuccessPost?: boolean
  resetData: () => void
}
///
export const StonePurityMainData = ({
  editData,
  title,
  isLoading,
  isSuccessPost,
  resetData,
}: StonePurityMainDataProps_TP) => {
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
    if (isSuccessPost) {
      resetForm()
      resetData()
    }
  }, [isSuccessPost])

  ///
  return (
    <>
      <OuterFormLayout
        header={title}
        submitComponent={
          <Button loading={isLoading} type="submit" className="ms-auto mt-8">
            {t("submit")}
          </Button>
        }
      >
        <InnerFormLayout title={`${t("main data")}`}>
          <BaseInputField
            id="stones_purities"
            label={`${t("stones purities")}`}
            name="name"
            type="text"
            placeholder={`${t("stones purities")}`}
          />
        </InnerFormLayout>
      </OuterFormLayout>
    </>
  )
}
