/////////// IMPORTS
///

import { useNavigate, useNavigation } from "react-router-dom"
import { Button } from "../../components/atoms"
import { t } from "i18next"

///
/////////// Types
///
type BackProps_TP = {
  path?: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Back = ({ path }: BackProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const navigate = useNavigate()
  console.log(`Back ~ navigate:`, navigate)
  // const navigation = useNavigation()
  // console.log(`Back ~ navigation:`, navigation)
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
    <Button action={() => (path ? navigate(path) : navigate(-1))} bordered>
      {t("back")}
    </Button>
  )
}