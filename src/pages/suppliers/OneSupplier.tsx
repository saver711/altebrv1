/////////// IMPORTS
///
import { t } from "i18next"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import blankPerson from "../../assets/blank-person-image.png"
import { Button } from "../../components/atoms"
import { InnerFormLayout, Modal, OuterFormLayout } from "../../components/molecules"
import { Loading } from "../../components/organisms/Loading"
import { TextLine } from "../../components/templates/employee/TextLine"
import { useFetch } from "../../hooks"
import { formatDate } from "../../utils/date"
import { useState } from "react"
///
/////////// Types
///
type OneSupplierProps_TP = {
  title?: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const OneSupplier = ({ title }: OneSupplierProps_TP) => {
  /////////// VARIABLES
  ///
  const { supplierID } = useParams()
  console.log(
    "🚀 ~ file: OneSupplier.tsx:20 ~ OneSupplier ~ supplierID:",
    supplierID
  )
  const navigate = useNavigate()
  ///
  /////////// CUSTOM HOOKS
  ///
  const { data: supplier, isSuccess  , isLoading} = useFetch<any>({
    endpoint: `supplier/api/v1/suppliers/1`,
    queryKey: ["suppliers", supplierID!],
  })
  console.log("🚀 ~ file: OneSupplier.tsx:39 ~ OneSupplier ~ supplier:", supplier)

  /////////// STATES
  ///
  const [documentOpen, setDocumentOpen] = useState(false);

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  if (isLoading) return <Loading mainTitle={t("...loading")} />
    ///
    return (
      <>
        <Helmet>
          {/* supplier name */}
          <title>{supplier?.name || "معلومات مورد"}</title>
        </Helmet>
        <OuterFormLayout
          header={`${t("view details")}`}
          leftComponent={
            <Button action={() => navigate(-1)} bordered>
              {t("Back")}
            </Button>
          }
        >
          <InnerFormLayout title={supplier?.name} leftComponent={<Button action={() => setDocumentOpen(true)}>
                  {t("view all documents")}
                </Button>}>
            {isSuccess && (
              <>
                {/* Right column */}
                <div className="flex gap-4 flex-col col-span-4 m-auto">
                  <img
                    src={supplier.logo || blankPerson}
                    alt={`supplier ${supplier.name}`}
                    className="w-[7rem] h-[7rem] rounded-full"
                  />
              
                </div>

                {/* The rest */}
                <div className="flex gap-4 flex-col">
                {supplier.name && (
                    <TextLine
                      boldText={t("Name")}
                      lightString={supplier.name}
                    />
                  )}
                  {supplier.nationality_name && (
                    <TextLine
                      boldText={t("nationality_name")}
                      lightString={supplier.nationality_name}
                    />
                  )}

                  {supplier.phone && (
                    <TextLine
                      boldText={t("phone number")}
                      lightString={supplier.phone}
                    />
                  )}
                </div>
                <div className="flex gap-4 flex-col">
                  {supplier.company_name && (
                    <TextLine
                      boldText={t("company_name")}
                      lightString={supplier.company_name}
                    />
                  )}
                  {supplier.country_name && (
                    <TextLine
                      boldText={t("country_name")}
                      lightString={supplier.country_name}
                    />
                  )}
                  {supplier.city_name && (
                    <TextLine
                      boldText={t("city_name")}
                      lightString={supplier.city_name}
                    />
                  )}
                  {supplier.district_name && (
                    <TextLine
                      boldText={t("district_name")}
                      lightString={supplier.district_name}
                    />
                  )}
                </div>
                <div className="flex gap-4 flex-col">
                  {supplier.national_expire_date && (
                    <TextLine
                      boldText={t("hiring date")}
                      lightString={formatDate(
                        new Date(supplier.national_expire_date)
                      )}
                    />
                  )}
                  {supplier.email && (
                    <TextLine
                      boldText={t("email")}
                      lightString={supplier.email}
                    />
                  )}
                  {supplier.tax && (
                    <TextLine boldText={t("tax")} lightString={supplier.tax} />
                  )}
                  {supplier.type && (
                    <TextLine
                      boldText={t("type")}
                      lightString={supplier.type}
                    />
                  )}
                </div>
                <div className="flex gap-4 flex-col">
                  {supplier.address && (
                    <TextLine
                      boldText={t("address")}
                      lightString={supplier.address}
                    />
                  )}
                  {supplier.national_number && (
                    <TextLine
                      boldText={t("national number")}
                      lightString={supplier.national_number}
                    />
                  )}
                  {supplier.email && (
                    <TextLine
                      boldText={t("email")}
                      lightString={supplier.email}
                    />
                  )}
                </div>
                <Modal isOpen={documentOpen} onClose={setDocumentOpen}>
                {supplier?.document?.map((doc, i) => (
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
              {supplier.document.length !== 0
                ? supplier?.document?.slice(0, 2).map((doc, i) => (
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
                        </div>
                      </div>
                    </>
                  ))
                : "لايوجد الوثائق"}
              </>
            )}

          </InnerFormLayout>
        </OuterFormLayout>
      </>
    )
}
