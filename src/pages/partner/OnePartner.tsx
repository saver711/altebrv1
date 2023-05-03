/////////// IMPORTS
///
import { t } from "i18next"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import blankPerson from "../../assets/blank-person-image.png"
import { Button } from "../../components/atoms"
import { InnerFormLayout, Modal, OuterFormLayout } from "../../components/molecules"
import { TextLine } from "../../components/templates/employee/TextLine"
import { useFetch } from "../../hooks"
import { Employee_TP } from "../employees/employees-types"
import { Loading } from "../../components/organisms/Loading"
import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Query_TP } from "../coding/gold/AddStone"
import { SelectOption_TP } from "../../types"
import { formatDate } from "../../utils/date"
///
/////////// Types
///
type OnePartnerProps_TP = {
  title?: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const OnePartner = ({ title }: OnePartnerProps_TP) => {
  /////////// VARIABLES
  ///
  const { partnerID } = useParams()
  const [documentOpen, setDocumentOpen] = useState(false);

  const navigate = useNavigate()
  ///
  /////////// CUSTOM HOOKS
  ///
  
  const {
    data: partner,
    isSuccess,
    isLoading: partnerLoading,
  } = useFetch<any>({
    endpoint: `partner/api/v1/partners/${partnerID}`,
    queryKey: ["partners", partnerID!],
  })
    console.log("🚀 ~ file: OnePartner.tsx:43 ~ OnePartner ~ partner:", partner)
  

  /////////// STATES
  ///
  // const [allData, setAllData] = useState<any[] | undefined>()
  // console.log("🚀 ~ file: OnePartner.tsx:51 ~ OnePartner ~ allData:", allData)

  // const queryClient = useQueryClient()

//   const {
//     data: countriesOptions,
//     isLoading: countriesLoading,
//     refetch: refetchCountries,
//     failureReason: countriesErrorReason
// } = useFetch<SelectOption_TP[]>({
//     endpoint: "governorate/api/v1/countries",
//     queryKey: ["countries"],
//     select: (countries) => countries.map((country: any) => ({
//         id: country.id,
//         value: country.name,
//         label: country.name ,
//     })),
// })
  
  
//     const {
//       data: citiesOptions,
//       isLoading: citiesLoading,
//       refetch: refetchCities,
//       failureReason: citiesErrorReason,
//     } = useFetch<SelectOption_TP[]>({
//       endpoint: "governorate/api/v1/cities",
//       queryKey: ["cities"],
//       select: (cities) =>
//         cities.map((city: any) => ({
//           id: city.id,
//           value: city.name,
//           label: city.name,
//         })),
//     })
//       console.log("🚀 ~ file: OnePartner.tsx:87 ~ OnePartner ~ citiesOptions:", citiesOptions)
//     console.log("🚀 ~ file: OnePartner.tsx:70 ~ OnePartner ~ countriesOptions:", countriesOptions)


//   useEffect(() => {
//     const allData = {

//        country : countriesOptions?.find(
//         (country) => country.id == partner?.country?.id
//       )?.value,
//        city : citiesOptions?.find(
//         (city) => city.id == partner?.city.id
//       )?.value
//     }


//     setAllData(allData)
//   }, [countriesOptions, citiesOptions])
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <>
      <Helmet>
        {/* partner name */}
        <title>{partner?.name || "معلومات مورد"}</title>
      </Helmet>
      <OuterFormLayout
        header={`${t("view details")}`}
        leftComponent={
          <Button action={() => navigate(-1)} bordered>
            {t("Back")}
          </Button>
        }
      >
        {partnerLoading && <Loading mainTitle={t("view doc Details")} />}
        <InnerFormLayout title={partner?.name}>
          {isSuccess && (
            <>
              <div className="flex gap-4 flex-col">
                <img
                  src={partner.national_image || blankPerson}
                  alt={`partner ${partner.name}`}
                  className="w-[7rem] h-[7rem] rounded-full"
                />
                {partner.name && (
                  <TextLine boldText={t("Name")} lightString={partner.name} />
                )}
                {partner.nationality_name && (
                  <TextLine
                    boldText={t("nationality_name")}
                    lightString={partner?.nationality_name}
                  />
                )}

                {partner.phone && (
                  <TextLine
                    boldText={t("phone number")}
                    lightString={partner?.phone}
                  />
                )}
              </div>
              <div className="flex gap-4 flex-col">
                {partner?.country && (
                  <TextLine
                    boldText={t("country_name")}
                    lightString={partner?.country.name}
                  />
                )}
                {partner?.city && (
                  <TextLine
                    boldText={t("city_name")}
                    lightString={partner?.city.name}
                  />
                )}
              </div>
              <div className="flex gap-4 flex-col">
                {partner?.start_date && (
                  <TextLine
                    boldText={t("hiring date")}
                    lightString={partner?.start_date}
                  />
                )}
                {partner?.end_date && (
                  <TextLine
                    boldText={t("end date")}
                    lightString={partner?.end_date}
                  />
                )}
                {partner?.tax && (
                  <TextLine boldText={t("tax")} lightString={partner?.tax} />
                )}
                {partner?.type && (
                  <TextLine boldText={t("type")} lightString={partner?.type} />
                )}
              </div>
              <div className="flex gap-4 flex-col">
                {partner?.address && (
                  <TextLine
                    boldText={t("address")}
                    lightString={partner?.address}
                  />
                )}
                {partner?.national_number && (
                  <TextLine
                    boldText={t("national number")}
                    lightString={partner?.national_number}
                  />
                )}
                {partner?.email && (
                  <TextLine boldText={t("email")} lightString={partner?.email} />
                )}
              </div>
              <div className="flex justify-between gap-4 col-span-4 align-middle ">
                <h3 className=" font-bold">{t("main documents")}</h3>
                <Button action={() => setDocumentOpen(true)}>
                  {t("view all documents")}
                </Button>
              </div>
              <Modal isOpen={documentOpen} onClose={setDocumentOpen}>
                {partner?.document?.map((doc, i) => (
                  <>
                    <div className="flex gap-4 flex-col col-span-4 border-b-2 border-dashed mt-3  justify-center align-middle">
                      <div className=" flex items-center justify-center ">
                        <div className="py-2 px-5 rounded-lg  bg-mainGreen  bg-opacity-10 border border-dashed border-gray-400">
                          <p className=" text-lg font-bold text-mainGreen">
                            {t(`document`)} {i + 1}
                          </p>
                        </div>
                      </div>
                      <div className="bg-flatWhite rounded-lg p-4 mt-5 grid justify-center grid-cols-3 col-span-4 gap-x-4 gap-y-8 relative">
                        <div className="flex gap-4 flex-col">
                          {doc.data?.docType?.label && (
                            <TextLine
                              boldText={t("document name")}
                              lightString={doc.data?.docType?.label}
                            />
                          )}
                        </div>
                        <div className="flex gap-4 flex-col">
                          {doc.data?.docName && (
                            <TextLine
                              boldText={t("document name")}
                              lightString={doc.data?.docName}
                            />
                          )}
                        </div>
                        <div className="flex gap-4 flex-col  ">
                          {doc.data?.docNumber && (
                            <TextLine
                              boldText={t("document number")}
                              lightString={doc.data?.docNumber}
                            />
                          )}
                        </div>
                        <div className="flex gap-4 flex-col  ">
                          {doc.data?.endDate && (
                            <TextLine
                              boldText={t("document endDate")}
                              lightString={formatDate(
                                new Date(doc.data?.endDate)
                              )}
                            />
                          )}
                        </div>
                        <div className="flex gap-4 flex-col">
                          {doc.data?.reminder && (
                            <TextLine
                              boldText={t("reminder days count")}
                              lightString={doc.data?.reminder}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </Modal>
              {partner.document.length !== 0
                ? partner?.document?.slice(0, 2).map((doc, i) => (
                    <>
                      <div className="flex gap-4 flex-col col-span-4 border-b-2 border-dashed  justify-center align-middle">
                        <div className=" flex items-center justify-center mb-8">
                          <div className="py-2 px-5 rounded-lg  bg-mainGreen  bg-opacity-10 border border-dashed border-gray-400">
                            <p className=" text-lg font-bold text-mainGreen">
                              {t(`document`)} {i + 1}
                            </p>
                          </div>
                        </div>
                        <div className="bg-flatWhite rounded-lg p-4 mt-5 grid justify-center grid-cols-3 col-span-4 gap-x-4 gap-y-8 relative">
                          <div className="flex gap-4 flex-col">
                            {console.log("zz", doc.data.docName)}
                            {doc.data?.docType?.label && (
                              <TextLine
                                boldText={t("document name")}
                                lightString={doc.data?.docType?.label}
                              />
                            )}
                          </div>
                          <div className="flex gap-4 flex-col">
                            {doc.data?.docName && (
                              <TextLine
                                boldText={t("document name")}
                                lightString={doc.data?.docName}
                              />
                            )}
                          </div>
                          <div className="flex gap-4 flex-col  ">
                            {doc.data?.docNumber && (
                              <TextLine
                                boldText={t("document number")}
                                lightString={doc.data?.docNumber}
                              />
                            )}
                          </div>
                          <div className="flex gap-4 flex-col  ">
                            {doc.data?.endDate && (
                              <TextLine
                                boldText={t("document endDate")}
                                lightString={formatDate(
                                  new Date(doc.data?.endDate)
                                )}
                              />
                            )}
                          </div>
                          <div className="flex gap-4 flex-col">
                            {doc.data?.reminder && (
                              <TextLine
                                boldText={t("reminder days count")}
                                lightString={doc.data?.reminder}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                : "لايوجد الوثائق"}
              {/* العنوان الوطني */}
              <>
                <div className="flex gap-4 flex-col col-span-4 justify-center align-middle"></div>
                <div className="bg-flatWhite rounded-lg p-4 grid justify-center grid-cols-3 col-span-4 gap-x-4 gap-y-8 relative">
                  <div className="flex gap-4 flex-col col-span-4">
                    <h3 className="font-bold"> {t("national Address")} </h3>
                  </div>
                  <div className="bg-flatWhite rounded-lg p-4 grid justify-center grid-cols-3 col-span-4 gap-x-4 gap-y-8 relative">
                    <div className="flex gap-4 flex-col">
                      {partner.nationalAddress?.city.name && (
                        <TextLine
                          boldText={t("city")}
                          lightString={partner.nationalAddress?.city.name}
                        />
                      )}
                    </div>
                    <div className="flex gap-4 flex-col">
                      {partner.nationalAddress?.city.country_name && (
                        <TextLine
                          boldText={t("country")}
                          lightString={
                            partner.nationalAddress?.city.country_name
                          }
                        />
                      )}
                    </div>
                    <div className="flex gap-4 flex-col">
                      {partner.nationalAddress?.district.name && (
                        <TextLine
                          boldText={t("district")}
                          lightString={partner.nationalAddress?.district.name}
                        />
                      )}
                    </div>
                    <div className="flex gap-4 flex-col">
                      {partner.nationalAddress?.address && (
                        <TextLine
                          boldText={t("short address")}
                          lightString={partner.nationalAddress?.address}
                        />
                      )}
                    </div>
                    <div className="flex gap-4 flex-col">
                      {partner.nationalAddress?.street_number && (
                        <TextLine
                          boldText={t("street number")}
                          lightString={partner.nationalAddress?.street_number}
                        />
                      )}
                    </div>
                    <div className="flex gap-4 flex-col">
                      {partner.nationalAddress?.building_number && (
                        <TextLine
                          boldText={t("building number")}
                          lightString={partner.nationalAddress?.building_number}
                        />
                      )}
                    </div>
                    <div className="flex gap-4 flex-col">
                      {partner.nationalAddress?.sub_number && (
                        <TextLine
                          boldText={t("sub number")}
                          lightString={partner.nationalAddress?.sub_number}
                        />
                      )}
                    </div>
                    <div className="flex gap-4 flex-col">
                      {partner.nationalAddress?.zip_code && (
                        <TextLine
                          boldText={t("zip code")}
                          lightString={partner.nationalAddress?.zip_code}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            </>
          )}
        </InnerFormLayout>
      </OuterFormLayout>
    </>
  )
}
