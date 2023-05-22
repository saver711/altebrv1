/////////// IMPORTS
///
import { t } from "i18next"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import blankPerson from "../../assets/blank-person-image.png"
import { Button } from "../../components/atoms"
import {
  InnerFormLayout,
  Modal,
  OuterFormLayout,
} from "../../components/molecules"
import { TextLine } from "../../components/templates/employee/TextLine"
import { useFetch } from "../../hooks"
import { Employee_TP } from "../employees/employees-types"
import { Loading } from "../../components/organisms/Loading"
import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Query_TP } from "../coding/gold/AddStone"
import { SelectOption_TP } from "../../types"
import { formatDate } from "../../utils/date"
import { FilesPreviewOutFormik } from "../../components/molecules/files/FilesPreviewOutFormik"
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
  const [documentOpen, setDocumentOpen] = useState(false)

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
  console.log("🚀 ~ file: OnePartner.tsx:52 ~ OnePartner ~ partner:", partner)

  /////////// STATES
  ///
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
        {isSuccess && (
        <InnerFormLayout
          title={
            <div className="flex gap-4">
              <p>بيانات</p>
              <p className=" text-mainGreen">{partner?.name}</p>
            </div>
          }
        >
            <>
              <div className="flex gap-4 flex-col col-span-4 m-auto">
                <img
                  src={partner.national_image || blankPerson}
                  alt={`partner ${partner.name}`}
                  className="w-[7rem] h-[7rem] rounded-full object-cover"
                />
              </div>
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
                <TextLine
                  containerClasses=" !block"
                  boldText={t("email")}
                  lightString={partner?.email}
                />
              )}
              {partner.national_image ? (
                <div className="flex items-center gap-1">
                  <p className="mt-1">{t("media")} : </p>
                  <FilesPreviewOutFormik
                    preview={true}
                    images={[
                      {
                        path: partner.national_image,
                        type: "image",
                      },
                    ]}
                  />
                </div>
              ) : (
                <div className="flex justify-center gap-4 col-span-4 align-center items-center">
                  <h3 className="font-bold text-lg">{t("no media")}</h3>
                </div>
              )}
              {partner?.document.length !== 0 && (
                <div className="flex justify-between gap-4 col-span-4 align-center items-center mt-5">
                  <h3 className="font-extrabold text-2xl ">
                    {t("main documents")}
                  </h3>
                  {partner?.document.length > 2 && (
                    <Button
                      className="mb-3"
                      action={() => setDocumentOpen(true)}
                    >
                      {t("view all documents")}
                    </Button>
                  )}
                </div>
              )}
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
                        {doc.files?.length !== 0 ? (
                          <div className="flex items-center">
                            <p className="mb-3">{t("media")} : </p>
                            <FilesPreviewOutFormik images={doc?.files} />
                          </div>
                        ) : (
                          "لايوجد وسائظ"
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </Modal>
              {partner.document.length !== 0 ? (
                partner?.document?.slice(0, 2).map((doc, i) => (
                  <>
                    <div className="flex gap-4 flex-col col-span-4 border-t-2 mt-3 p-3 border-b-2 border-dashed  justify-center align-middle">
                      <div className=" flex items-center justify-center mb-8">
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
                              boldText={t("document end date")}
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
                        {doc.files?.length !== 0 ? (
                          <div className="flex items-center">
                            <p className="mb-3">{t("media")} : </p>
                            <FilesPreviewOutFormik images={doc?.files} />
                          </div>
                        ) : (
                          <div className="flex justify-center gap-4 col-span-4 align-center items-center">
                            <h3 className="font-bold text-lg">
                              {t("no media")}
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <div className="flex justify-center gap-4 col-span-4 align-center items-center">
                  <h3 className="font-extrabold text-2xl ">
                    {t("no documents")}
                  </h3>
                </div>
              )}
              {/* العنوان الوطني */}
              <>
                <div className="flex gap-4 flex-col col-span-4 justify-center align-middle"></div>
                <div className="bg-flatWhite rounded-lg p-4 grid justify-center grid-cols-3 col-span-4 gap-x-4 gap-y-8 relative">
                  <div className="flex justify-start gap-4 col-span-4 align-center items-center">
                    <h3 className="font-extrabold text-2xl ">
                      {t("national Address")}{" "}
                    </h3>
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
        </InnerFormLayout>
          )}
      </OuterFormLayout>
    </>
  )
}
