/////////// IMPORTS
import { t } from "i18next";
import { useState } from "react";
import blankPerson from "../../../../assets/blank-person-image.png";
import { useFetch } from "../../../../hooks";
import { Button } from "../../../atoms";
import { Header } from "../../../atoms/Header";
import { EditIcon } from "../../../atoms/icons";
import { InnerFormLayout, Modal, OuterFormLayout } from "../../../molecules";
import { Loading } from "../../../organisms/Loading";
import { TextLine } from "../../employee/TextLine";
import { EditCompany } from "../company/EditCompany";
import { formatDate } from "../../../../utils/date";
///
///
/////////// Types
///
export type CompanyDetails_TP = {
  address: string;
  city: string;
  country: string;
  district: string;
  email: string;
  establishmentDate: string;
  fax: string;
  name: string;
  phone: string;
  tax_number: string;
  logo: string;
  //document
  document: {
    data: {
      docType?: {
        label?: string;
      };
      docName?: string;
      docNumber?: string;
      endDate?: string;
      reminder?: string;
      file?: string;
    };
  }[];
  //national address
  nationalAddress: {
    city: {
      name: string;
      country_name: String;
    };
    district: {
      name: string;
      city_name: String;
    };
    address: string;
    street_number: string;
    building_number: string;
    sub_number: string;
    zip_code: string;
  };
  // docs data initial values
};

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const ViewCompanyDetails = () => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  const {
    data: companyDetails,
    isError,
    isSuccess,
    error,
    isLoading: companyDetailsLoading,
  } = useFetch<CompanyDetails_TP | any>({
    endpoint: "/companySettings/api/v1/companies",
    queryKey: ["viewCompany"],
  });

  const companyDetailsData: CompanyDetails_TP[] = companyDetails
    ? companyDetails
    : [];
  console.log("companyDetailsData", companyDetailsData);

  ///
  /////////// STATES
  ///
  const [editCompanyOpen, setEditCompanyOpen] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);

  // let images: any = companyDetailsData[0]?.files.map((el) => el)
  // console.log(
  //   "🚀 ~ file: ViewCompanyDetails.tsx:45 ~ ViewCompanyDetails ~ images:",
  //   images[0].image
  // )

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  return (
    <>
      <OuterFormLayout header={`${t("view details company")}`}>
        {isError && (
          <div className=" m-auto">
            <Header
              className="text-center text-2xl font-bold"
              header={t(`some thing went wrong ${error?.message}`)}
            />
          </div>
        )}
        {companyDetailsLoading && (
          <Loading mainTitle={t("view company Details")} />
        )}

        {isSuccess &&
          companyDetails.length > 0 &&
          companyDetailsData?.map((company: CompanyDetails_TP) => (
            <InnerFormLayout
              title={`بيانات ${company?.name}`}
              leftComponent={
                <EditIcon action={() => setEditCompanyOpen(true)} />
              }
            >
              <>
                <div className="flex gap-4 flex-col">
                  <img
                    src={company?.logo || blankPerson}
                    alt={`company ${company?.logo}`}
                    className="w-[7rem] h-[7rem] rounded-full"
                  />

                  {company?.name && (
                    <TextLine
                      boldText={t("company")}
                      lightString={company?.name}
                    />
                  )}
                  {company?.country && (
                    <TextLine
                      boldText={t("country")}
                      lightString={company?.country.name}
                    />
                  )}
                  {company?.city && (
                    <TextLine
                      boldText={t("city")}
                      lightString={company?.city.name}
                    />
                  )}
                </div>
                <div className="flex gap-4 flex-col">
                  {company?.district && (
                    <TextLine
                      boldText={t("district name")}
                      lightString={company?.district.name}
                    />
                  )}

                  {company?.phone && (
                    <TextLine
                      boldText={t("phone")}
                      lightString={company?.phone}
                    />
                  )}

                  {company?.address && (
                    <TextLine
                      boldText={t("address")}
                      lightString={company?.address}
                    />
                  )}
                </div>
                <div className="flex gap-4 flex-col">
                  {company?.email && (
                    <TextLine
                      boldText={t("email")}
                      lightString={company?.email}
                    />
                  )}
                  {company?.tax_number && (
                    <TextLine
                      boldText={t("tax number")}
                      lightString={company?.tax_number}
                    />
                  )}

                  {company.fax && (
                    <TextLine boldText={t("fax")} lightString={company?.fax} />
                  )}
                </div>
                <div className="flex gap-4 flex-col">
                  <div className="col-span-1 flex items-center">
                    {company.establishmentDate && (
                      <TextLine
                        boldText={t("establishment Date")}
                        lightString={company?.establishmentDate}
                      />
                    )}
                  </div>
                  <Modal isOpen={editCompanyOpen} onClose={setEditCompanyOpen}>
                    <EditCompany
                      valuesData={company}
                      setEditCompanyOpen={setEditCompanyOpen}
                    />
                  </Modal>
                </div>

                {/* الوثائق */}

                <div className="flex justify-between gap-4 col-span-4 align-middle ">
                  <h3 className=" font-bold">{t("main documents")}</h3>
                  {company.document.length > 2 && (
                    <Button action={() => setDocumentOpen(true)}>
                      {t("view all documents")}
                    </Button>
                  )}
                </div>

                <Modal isOpen={documentOpen} onClose={setDocumentOpen}>
                  {company.document?.map((doc, i) => (
                    <>
                      <div className="flex gap-4 flex-col col-span-4 justify-center align-middle">
                        <h4 className="bg-[#E9EDEC] p-2 px-11 rounded-xl m-auto text-mainGreen font-bold">
                          {" "}
                          {t(`document`)}
                          {` ${i + 1} `}
                        </h4>
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
                              lightString={doc.data?.endDate}
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
                    </>
                  ))}
                </Modal>
                {company.document.length !== 0
                  ? company.document?.slice(0, 2).map((doc, i) => (
                      <>
                        <div className="flex gap-4 flex-col col-span-4 justify-center align-middle">
                          <h4 className="bg-[#E9EDEC] p-2 px-11 rounded-xl m-auto text-mainGreen font-bold">
                            {" "}
                            {t(`document`)}
                            {` ${i + 1} `}
                          </h4>
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
                                lightString={formatDate( new Date(doc.data?.endDate))}
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
                      </>
                    ))
                  : "لايوجد وثائق"}

                {/* العنوان الوطني */}

                <>
                  <div className="flex gap-4 flex-col col-span-4 justify-center align-middle"></div>
                  <div className="bg-flatWhite rounded-lg p-4 grid justify-center grid-cols-3 col-span-4 gap-x-4 gap-y-8 relative">
                    <div className="flex gap-4 flex-col col-span-4">
                      <h3 className="font-bold"> {t("national Address")} </h3>
                    </div>
                    <div className="bg-flatWhite rounded-lg p-4 grid justify-center grid-cols-3 col-span-4 gap-x-4 gap-y-8 relative">
                      <div className="flex gap-4 flex-col">
                        {company.nationalAddress?.city.name && (
                          <TextLine
                            boldText={t("city")}
                            lightString={company.nationalAddress?.city.name}
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {company.nationalAddress?.city.country_name && (
                          <TextLine
                            boldText={t("country")}
                            lightString={
                              company.nationalAddress?.city.country_name
                            }
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {company.nationalAddress?.district.name && (
                          <TextLine
                            boldText={t("district")}
                            lightString={company.nationalAddress?.district.name}
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {company.nationalAddress?.address && (
                          <TextLine
                            boldText={t("short address")}
                            lightString={company.nationalAddress?.address}
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {company.nationalAddress?.street_number && (
                          <TextLine
                            boldText={t("street number")}
                            lightString={company.nationalAddress?.street_number}
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {company.nationalAddress?.building_number && (
                          <TextLine
                            boldText={t("building number")}
                            lightString={
                              company.nationalAddress?.building_number
                            }
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {company.nationalAddress?.sub_number && (
                          <TextLine
                            boldText={t("sub number")}
                            lightString={company.nationalAddress?.sub_number}
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {company.nationalAddress?.zip_code && (
                          <TextLine
                            boldText={t("zip code")}
                            lightString={company.nationalAddress?.zip_code}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>

                {/* ////////////////////// */}
              </>
            </InnerFormLayout>
          ))}
      </OuterFormLayout>
    </>
  )
};
