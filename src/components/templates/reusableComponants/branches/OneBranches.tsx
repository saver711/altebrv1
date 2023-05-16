/////////// IMPORTS
///
//import classes from './OneBranches.module.css'
import { t } from "i18next"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import { useFetch, useIsRTL } from "../../../../hooks"
import { Button } from "../../../atoms"
import { Header } from "../../../atoms/Header"
import { InnerFormLayout, OuterFormLayout } from "../../../molecules"
import { Loading } from "../../../organisms/Loading"
import blankPerson from "../../../../assets/blank-person-image.png"
import { Branch_Props_TP } from "./ViewBranches"
import { TextLine } from "../../employee/TextLine"

///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const OneBranches = ({ title }) => {
  /////////// VARIABLES
  ///
  const { branchesID } = useParams()
  const navigate = useNavigate()
  ///
  /////////// CUSTOM HOOKS
  ///
  const isRTL = useIsRTL()

  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///
  const { data, isSuccess, isLoading, isError, error } =
    useFetch<Branch_Props_TP>({
      endpoint: `/branch/api/v1/branches/${branchesID}`,
      queryKey: ["branches", branchesID!],
    })
  console.log(data)

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isError && (
        <div className=" m-auto">
          <Header
            className="text-center text-2xl font-bold"
            header={t(`some thing went wrong ${error.response.data.message}`)}
          />
        </div>
      )}
      {isLoading && (
        <Loading
          mainTitle={`${t("loading")}`}
          subTitle={`${t("branch are loading")}`}
        />
      )}
      {isSuccess && !isLoading && (
        <OuterFormLayout
          header={`${t("view details")}`}
          leftComponent={
            <Button action={() => navigate(-1)} bordered>
              {t("Back")}
            </Button>
          }
        >
          <InnerFormLayout title={data?.name_ar}>
            <TextLine
              boldText={t("Name")}
              lightString={isRTL ? data.name_ar : data.name_en}
            />
            <TextLine boldText={t("address")} lightString={data.address} />
            <TextLine boldText={t("phone")} lightString={data.phone} />
            <TextLine
              boldText={t("city")}
              lightString={isRTL ? data.city.name_ar : data.city.name_en}
            />
            <TextLine
              boldText={t("market number")}
              lightString={data.market_number}
            />
            <TextLine boldText={t("branch number")} lightString={data.number} />
            <div className=" col-span-4 border border-dashed"></div>
            <Header
              className=" col-span-4 text-center capitalize"
              header={t("national Address")}
            />
            <TextLine
              boldText={t("address")}
              lightString={data.nationalAddress.address}
            />
            <TextLine
              boldText={t("country")}
              lightString={data.nationalAddress.country.name_ar}
            />
            <TextLine
              boldText={t("city")}
              lightString={data.nationalAddress.city.name_ar}
            />
            <TextLine
              boldText={t("district")}
              lightString={data.nationalAddress.district.name_ar}
            />
            <TextLine
              boldText={t("street number")}
              lightString={data.nationalAddress.street_number}
            />
            <TextLine
              boldText={t("building number")}
              lightString={data.nationalAddress.building_number}
            />
            <TextLine
              boldText={t("sub number")}
              lightString={data.nationalAddress.sub_number}
            />
            <TextLine
              boldText={t("zip code")}
              lightString={data.nationalAddress.zip_code}
            />
          </InnerFormLayout>
        </OuterFormLayout>
      )}
    </>
  )
}
