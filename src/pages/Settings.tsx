/////////// IMPORTS
///
//import styles from './Settings.module.css'
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { Button } from "../components/atoms/buttons/Button"
import { Spinner } from "../components/atoms/UI/Spinner"
import { numberFormatterCtx } from "../context/settings/number-formatter"
import { useIsRTL } from "../hooks/useIsRTL"
import { notify } from "../utils/toast"
import { BaseInput } from "../components/atoms/inputs/Base"
import { Label } from "../components/atoms/Label"
import { authCtx } from "../context/auth-and-perm/auth"
///
/////////// Types
///
type SettingsProps_TP = {
  title: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Settings = ({ title }: SettingsProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const isRTL = useIsRTL()
  const { logOutHandler, isLoggingOut } = useContext(authCtx)
  const { digits_count, changeDigitsCount, digits_countLoading } =
    useContext(numberFormatterCtx)
  ///
  /////////// STATES
  ///
  const [digitsCount, setDigitsCount] = useState(digits_count)
  ///
  /////////// SIDE EFFECTS
  ///
  const { i18n } = useTranslation()
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = isRTL ? "ar" : "en"
  }, [isRTL])

  useEffect(() => {
    if (!!digits_count) {
      setDigitsCount(digits_count)
    }
  }, [digits_count])

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///
  const toggleLang = () => {
    i18n.changeLanguage(isRTL ? "en" : "ar")
  }

  const confirmDigitsCount = () => {
    if (digitsCount === digits_count) {
      notify("error", "ادخل قيمة مختلفة")
      return
    }
    changeDigitsCount(digitsCount)
  }
  const changeDigitsCountHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setDigitsCount(+e.target.value)
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <button type="button" onClick={toggleLang}>
        change Language
      </button>
      {/* <div className="flex items-center gap-2 w-[50rem]">
        <Label htmlFor="digitsCount" size="lg">
          عدد الأرقام العشرية
        </Label>

        <BaseInput
          id="digitsCount"
          type="number"
          value={digitsCount && digitsCount.toString()}
          onChange={changeDigitsCountHandler}
        />
        <Button
          loading={digits_countLoading}
          action={confirmDigitsCount}
          className="h-auto w-auto"
        >
          تغيير الأرقام
        </Button>

        <Button loading={isLoggingOut} action={logOutHandler}>
          تسجيل خروج
        </Button>
      </div> */}
    </>
  )
}
