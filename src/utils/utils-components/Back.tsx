/////////// IMPORTS
///

import { t } from "i18next"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/atoms"

///
/////////// Types
///
type BackProps_TP = {
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Back = ()=>{
/////////// VARIABLES
///

///
/////////// CUSTOM HOOKS
///
const navigate = useNavigate()
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
  <Button action={() => navigate(-1)} bordered>
    {t("back")}
  </Button>
)
}