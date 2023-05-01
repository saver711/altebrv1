import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from "axios"
import Cookies from "js-cookie"
import i18n from "../i18n"
import { CError_TP } from "../types"
import { useContext } from "react"
import { authCtx } from "../context/auth-and-perm/auth"
import { notify } from "./toast"

const baseURL =
  import.meta.env.VITE_BASE_URL || "https://alexon.altebr.jewelry/"

const lang = i18n.language.startsWith("ar") ? "ar" : "en"

const client = axios.create({
  baseURL,
})

export const request = async <T>(options: AxiosRequestConfig): Promise<T> => {
  const token = Cookies.get("token");

  const onSuccess = (response: AxiosResponse) => response.data.data;

  try {
    const response = await client({
      ...options,
      headers: {
        "Content-Type": `application/json`,
        "Accept-Language": lang,
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return onSuccess(response);
  } catch (error) {
    // 👁️ i will handle unauthorized in useFetch and useMutate because i can't use useContext here
    // const axiosError = error as CError_TP;
    // console.log(`request ~ the error:`, axiosError)
    // // handle error responses
    // if (axiosError.response) {
    //   const responseError = axiosError.response
    //   if (responseError.status === HttpStatusCode.Unauthorized) {
    //     console.log(`request ~ Unauthorized:`, "Unauthorized")
    //     // unauthorized => logout
    //     // notify('error', "You need to login again")
    //   }
    //   if (responseError.status === HttpStatusCode.Forbidden){
    //   // forbidden => can't access this content, this case can be handled manually for each request
    //   }
    //   // handle request errors
    // } else if (axiosError.request) {
    //   console.log(`request ~ error in the request`, axiosError.request)
    // } else {
    //   // handle other errors
    // }
    throw error;
  }
};