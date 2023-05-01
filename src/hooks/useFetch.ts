import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig, HttpStatusCode } from "axios";
import { request } from "../utils/axios-util";
import { CError_TP } from "../types";
import { notify } from "../utils/toast";
import { useContext } from "react";
import { authCtx } from "../context/auth-and-perm/auth";

type AxiosRequestConfig_withoutURL_TP = Omit<AxiosRequestConfig, 'url'>

type Args_TP<T, ComingTP> = {
  queryKey: [string] | [string, string] | [string, number]
  endpoint: string
  select?: (data: ComingTP) => T
  enabled?: boolean
  onSuccess?: (data: T) => void | undefined
  onError?: (error: CError_TP) => void
  axiosOptions?: AxiosRequestConfig_withoutURL_TP
  refetchInterval?: number
  staleTime?: number
  cacheTime?: number
}


export const useFetch = <T, ComingTP = T>({ ...args }: Args_TP<T, ComingTP>) => {

  const { logOutHandler, frontLogOutHandler } = useContext(authCtx)
  const {
    queryKey,
    endpoint,
    select,
    enabled = true,
    onSuccess,
    onError,
    axiosOptions,
    refetchInterval,
    staleTime,
    cacheTime,
  } = args

  // useQuery infers queryFn return type
  const query = useQuery(queryKey, {
    queryFn: () => request<ComingTP>({ url: endpoint, ...axiosOptions }),
    enabled,
    onSuccess,
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
    // onError: onError ? (err: CError_TP) => onError(err) : (err: CError_TP) => {
    //   if (!!!err.response?.data.errors && !!err.response?.data.message) {
    //     notify("error", err.response.data.message)
    //   } else if (!!!err.response?.data.errors && !!!err.response?.data.message) {
    //     notify("error")
    //   }
    // },
    // onError,
    select,
    refetchInterval,
    staleTime,
    cacheTime,
  })
  // حل مشكلة الديسيبل والاز لودينج
  return { ...query, isLoading: query.isLoading && query.fetchStatus !== "idle" }
}