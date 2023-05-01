import { useMutation } from "@tanstack/react-query"
import { HttpStatusCode } from "axios"
import { useContext } from "react"
import { authCtx } from "../context/auth-and-perm/auth"
import { CError_TP, MutateDataParameters_TP } from "../types"
import { notify } from "../utils/toast"

// T => response data type
type Args_TP<T> = {
  // values?: any,
  // values?: any,
  mutationKey?: [string] | [string, string] | [string, number]
  // values?: any,
  mutationFn: (comingData: MutateDataParameters_TP) => Promise<T | undefined>
  onSuccess?: (data: T | undefined) => void | undefined
  onError?: (error: CError_TP) => void
}

export const useMutate = <T>({ ...args }: Args_TP<T>) => {
  const { logOutHandler, frontLogOutHandler } = useContext(authCtx)

  const { mutationKey, mutationFn, onSuccess, onError } = args
  // useQuery infers queryFn return type
  const mutation = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: onSuccess ? onSuccess : () => notify("success"),
    onError: (err: CError_TP) => {
      if (err.response?.status === HttpStatusCode.Unauthorized) {
        frontLogOutHandler()
        return
      }
      if (!!onError) { onError(err) } else {
        if (!!!err.response?.data.errors && !!err.response?.data.message) {
          notify("error", err.response.data.message)
        } else {
          notify("error")
        }
      }
    },
    // onError: onError
    //   ? onError
    //   : (err: CError_TP) => {
    //     if (!!!err.response.data.errors && !!err.response.data.message) {
    //       notify("error", err.response.data.message)
    //       return
    //     } else if (!!!err.response.data.errors && !!!err.response.data.message) {
    //       notify("error")
    //       return
    //     }
    //   },
  })

  return mutation
}