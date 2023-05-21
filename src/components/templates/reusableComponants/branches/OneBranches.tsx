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
import { Branch_Props_TP } from "./ViewBranches"
import { TextLine } from "../../employee/TextLine"
import { FilesPreviewOutFormik } from "../../../molecules/files/FilesPreviewOutFormik"

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
          subTitle={`${t("loading")}`}
          mainTitle={`${t("branches data are loading")}`}
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
              boldText={t("name")}
              lightString={isRTL ? data.name_ar : data.name_en}
            />
            <TextLine boldText={t("address")} lightString={data.address} />
            <TextLine boldText={t("phone")} lightString={data.phone} />
            <TextLine boldText={t("branch number")} lightString={data.number} />
            <TextLine
              boldText={t("country")}
              lightString={isRTL ? data.country.name_ar : data.country.name_en}
            />
            <TextLine
              boldText={t("city")}
              lightString={isRTL ? data.city.name_ar : data.city.name_en}
            />
            <TextLine
              boldText={t("district")}
              lightString={
                isRTL ? data.district.name_ar : data.district.name_en
              }
            />
            <TextLine
              boldText={t("market")}
              lightString={isRTL ? data.market.name_ar : data.market.name_en}
            />
            <TextLine
              boldText={t("market number")}
              lightString={data.market_number}
            />
            <div className=" col-span-4 border border-dashed"></div>
            <Header
              className=" col-span-4 text-center capitalize"
              header={t("documents")}
            />
            {data?.document.length > 0 ? (
              data?.document?.map((doc) => (
                <>
                  <TextLine
                    boldText={t("document name")}
                    lightString={doc.data.docName}
                  />
                  <TextLine
                    boldText={t("document number")}
                    lightString={doc.data.docNumber}
                  />
                  <TextLine
                    containerClasses="col-span-2"
                    boldText={t("end date")}
                    lightString={doc.data.endDate}
                  />
                  <TextLine
                    boldText={t("reminder days count")}
                    lightString={doc.data.reminder}
                  />
                  <TextLine
                    boldText={t("document type")}
                    lightString={doc.data.docType.label}
                  />
                  {doc.files?.length !== 0 ? (
                    <div className="flex items-center">
                      <p>{t("media")} : </p>
                      <FilesPreviewOutFormik images={doc?.files} />
                    </div>
                  ) : (
                    <div className="flex justify-center gap-4 col-span-4 align-center items-center">
                      <h3 className="font-bold text-lg">{t("no media")}</h3>
                    </div>
                  )}
                </>
              ))
            ) : (
              <Header
                className=" col-span-4 text-center capitalize"
                header={t("no documents")}
              />
            )}
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
