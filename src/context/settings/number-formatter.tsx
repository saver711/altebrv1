import { useMutation } from "@tanstack/react-query"
import { createContext, ReactNode } from "react"
import { useFetch } from "../../hooks/useFetch"
import { mutateData } from "../../utils/mutateData"
import { notify } from "../../utils/toast"
import { useLocalStorage } from "../../hooks"
import { MutateDataParameters_TP } from "../../types"

type numberFormatter_TP = {
  digits_count: number
  changeDigitsCount: (digit: number) => void
  formatNumber: (digit: number | string) => string
  digits_countLoading: boolean
}
export const numberFormatterCtx = createContext<numberFormatter_TP>({
  digits_count: 2,
  changeDigitsCount: (digit: number) => {},
  formatNumber: (digit: number | string) => "",
  digits_countLoading: false,
})

export const NumberFormatterProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  /////////// VARIABLES
  const [storedDigitsCount, setStoredDigitsCount] = useLocalStorage(
    "digits_count",
    2
  )

  ///
  /////////// STATES
  ///
  ///
  /////////// CUSTOM HOOKS
  ///
  type Setting_TP = {
    value: number
  }

  const {
    data: digits_countData,
    isError,
    isLoading,
    isSuccess: digits_countFetchSuccess,
    failureReason,
    isFetching,
    refetch,
  } = useFetch<Setting_TP>({
    enabled: false, // >>>> Remove this
    endpoint: "company/api/v1/company_settings/1",
    queryKey: ["digits_count"],
    select: (digits_countObj) => ({ value: +digits_countObj.value }),
    onSuccess: (digits_count) => {
      setStoredDigitsCount(digits_count.value)
    },
  })

  type ResponseData_TP = {
    id: number
    value: number
  }

  const {
    mutate,
    isLoading: digits_countLoading,
    isSuccess: digits_countPostSuccess,
    error: errorQuery,
  } = useMutation({
    mutationFn: (data: MutateDataParameters_TP) =>
      mutateData<ResponseData_TP>(data),
    onError: (err) => console.log(err),
    onSuccess: (data) => {
      console.log(`data:`, data)
      refetch()
      notify()
    },
  })

  const changeDigitsCount = (digit: number) => {
    mutate({
      endpointName: "company/api/v1/company_settings/1",
      values: {
        key: "digits_count",
        value: digit,
      },
      method: "put",
    })

    setStoredDigitsCount(digit)
  }

  // Number formatter
  const formatNumber = (num: number | string) => {
    const fixedNum = (+num).toFixed(storedDigitsCount)
    const formattedNum = new Intl.NumberFormat("en-EG", {
      style: "decimal",
      notation: "standard",
      minimumFractionDigits: storedDigitsCount,
    }).format(+fixedNum)
    return formattedNum
  }

  return (
    <numberFormatterCtx.Provider
      value={{
        digits_count: storedDigitsCount,
        changeDigitsCount,
        digits_countLoading,
        formatNumber,
      }}
    >
      {children}
    </numberFormatterCtx.Provider>
  )
}
