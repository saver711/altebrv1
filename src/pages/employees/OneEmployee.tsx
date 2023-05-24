/////////// IMPORTS
///
import { t } from "i18next"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import blankPerson from "../../assets/blank-person-image.png"
import { Button } from "../../components/atoms"
import { Header } from "../../components/atoms/Header"
import {
  InnerFormLayout,
  Modal,
  OuterFormLayout
} from "../../components/molecules"
import { FilesPreviewOutFormik } from "../../components/molecules/files/FilesPreviewOutFormik"
import { Loading } from "../../components/organisms/Loading"
import { TextLine } from "../../components/templates/employee/TextLine"
import { allDocs_TP } from "../../components/templates/reusableComponants/documents/Documents"
import { useFetch } from "../../hooks"
import { formatDate } from "../../utils/date"
import { Employee_TP } from "./employees-types"

///
/////////// Types
///
type OneEmployeeProps_TP = {
  title?: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const OneEmployee = ({ title }: OneEmployeeProps_TP) => {
  /////////// VARIABLES
  ///
  const { employeeID } = useParams()
  const [documentOpen, setDocumentOpen] = useState(false)

  const navigate = useNavigate()
  ///
  /////////// CUSTOM HOOKS
  ///
  const {
    data: employee,
    isSuccess,
    isLoading: employeeLoading,
  } = useFetch<Employee_TP | any>({
    endpoint: `employee/api/v1/employees/${employeeID}`,
    queryKey: ["employees", employeeID!],
  })
  console.log(
    "🚀 ~ file: OneEmployee.tsx:38 ~ OneEmployee ~ employee:",
    employee
  )

  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  if (employeeLoading)
    return (
      <Loading
        mainTitle={`${t("Loading...")}`}
        subTitle={`${t("employee data is loading")}`}
      />
    )
  ///
  return (
    <>
      <Helmet>
        {/* Employee name */}
        <title>{employee?.name || "معلومات موظف"}</title>
      </Helmet>
      <OuterFormLayout
        header={`${t("view details")}`}
        leftComponent={
          <Button action={() => navigate(-1)} bordered>
            {t("Back")}
          </Button>
        }
      >
        <InnerFormLayout title={employee?.name}>
          {isSuccess && (
            <div className="col-span-4">
              <div className="grid gap-x-1 grid-cols-4">
                {/* Right column */}
                <div className="flex gap-4 flex-col col-span-4 m-auto ">
                  <img
                    src={employee.image || blankPerson}
                    alt={`employee ${employee.name}`}
                    className="w-[7rem] h-[7rem] rounded-full object-cover"
                  />
                </div>
                {/* The rest */}
                <div className="flex gap-4 flex-col mt-4 ">
                  {employee.name && (
                    <TextLine
                      boldText={t("Name")}
                      lightString={employee.name}
                    />
                  )}
                  {employee.nationality && (
                    <TextLine
                      boldText={t("nationality")}
                      lightString={employee.nationality.name}
                    />
                  )}
                  {employee.phone && (
                    <TextLine
                      boldText={t("phone number")}
                      lightString={employee.phone}
                    />
                  )}
                  {employee.mobile && (
                    <TextLine
                      boldText={t("mobile number")}
                      lightString={employee.mobile}
                    />
                  )}
                </div>
                <div className="flex gap-4 flex-col mt-4 ">
                  {employee.address && (
                    <TextLine
                      boldText={t("address")}
                      lightString={employee.address}
                    />
                  )}
                  {employee.hiringData && (
                    <TextLine
                      boldText={t("hiring date")}
                      lightString={employee.hiringData}
                    />
                  )}
                  {employee.date_of_birth && (
                    <TextLine
                      boldText={t("birth date")}
                      lightString={employee.date_of_birth}
                    />
                  )}
                  {employee.username && (
                    <TextLine
                      boldText={t("username")}
                      lightString={employee.username}
                    />
                  )}
                  {employee.role && (
                    <TextLine
                      boldText={t("role")}
                      lightString={employee.role.name}
                    />
                  )}
                </div>

                <div className="flex gap-4 flex-col mt-4">
                  {employee.branch && (
                    <TextLine
                      boldText={t("branch")}
                      lightString={employee.branch.name}
                    />
                  )}
                  {employee.national_number && (
                    <TextLine
                      boldText={t("national number")}
                      lightString={employee.national_number}
                    />
                  )}
                  {employee.national_expire_date && (
                    <TextLine
                      boldText={t("national expire date")}
                      lightString={employee.national_expire_date}
                    />
                  )}

                  {employee.email && (
                    <TextLine
                      boldText={t("email")}
                      lightString={employee.email}
                    />
                  )}
                  {employee.is_active !== "undefined" && (
                    <div className="flex relative">
                      <TextLine
                        boldText={t("is active")}
                        lightString={employee.is_active}
                      />
                      <span className="inline-block absolute right-28 ">
                        {" "}
                        {employee.is_active === true
                          ? `${t("Yes")}`
                          : `${t("No")}`}
                      </span>
                    </div>
                  )}
                </div>
                {/*  national image*/}
                {(employee.national_image || employee.image) && (
                  <div className="flex items-center gap-1">
                    <p className="mt-1">{t("media")} : </p>
                    <FilesPreviewOutFormik
                      preview={true}
                      images={[
                        {
                          path: employee.national_image,
                          type: "image",
                        },
                        {
                          path: employee.image,
                          type: "image",
                        },
                      ]}
                    />
                  </div>
                )}
              </div>
              {employee?.document?.length !== 0 ? (
                <>
                  <div className="flex justify-between gap-4 col-span-4 align-middle ">
                    <h3 className=" font-bold">{t("main documents")}</h3>
                    <Button action={() => setDocumentOpen(true)}>
                      {t("view all documents")}
                    </Button>
                  </div>
                  <Modal isOpen={documentOpen} onClose={setDocumentOpen}>
                    {employee?.document?.map((doc, i) => (
                      <>
                        <div className="flex gap-4 flex-col col-span-4 border-t-2 mt-3 p-3 border-b-2 border-dashed  justify-center align-middle">
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
                            <div className=" flex items-center">
                              <p className="mb-3">{t("media")} : </p>
                              {doc?.files?.length !== 0 && (
                                <FilesPreviewOutFormik images={doc?.files} />
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </Modal>
                </>
              ) : (
                <div className="flex gap-2   capitalize">
                  <p className=" text-lg font-bold text-mainGreen ">
                    {t(`documents`)} :
                  </p>
                  <Header
                    header={t("no documents to show")}
                    className="text-mainGreen mb-0"
                  />
                </div>
              )}

              <div className="">
                {employee?.document.length !== 0 &&
                  employee?.document
                    .map((doc: allDocs_TP, i: string) => (
                      <div className=" flex flex-col gap-4 mt-6 border-t-2  border-b-2 border-dashed p-4 items-center justify-center">
                        <div className=" flex items-center justify-center mb-8">
                          <div className="py-2 px-5 rounded-lg  bg-mainGreen  bg-opacity-10 border border-dashed border-gray-400">
                            <p className=" text-lg font-bold text-mainGreen">
                              {t(`document`)} {i + 1}
                            </p>
                          </div>
                        </div>
                        <div className=" flex w-full justify-between items-center flex-wrap gap-4 ">
                          <TextLine
                            boldText={t("document name")}
                            lightString={doc?.data?.docName}
                          />
                          <TextLine
                            boldText={t("document number")}
                            lightString={doc?.data?.docNumber}
                          />
                          <TextLine
                            boldText={t("document type")}
                            lightString={doc?.data?.docType.label}
                          />
                          <TextLine
                            containerClasses="w-fit "
                            boldText={t("document end date")}
                            lightString={formatDate(
                              new Date(doc?.data?.endDate)
                            )}
                          />
                          <TextLine
                            boldText={t("reminder days count")}
                            lightString={doc?.data?.reminder}
                          />
                          <div className=" flex items-center">
                            <p className="mb-3">{t("media")} : </p>
                            {doc?.files?.length !== 0 && (
                              <FilesPreviewOutFormik images={doc?.files} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                    .slice(0, 2)}
                {/* العنوان الوطني */}
                <>
                  <div className="flex gap-4 flex-col col-span-4 justify-center align-middle"></div>
                  <div className="bg-flatWhite rounded-lg p-4 grid justify-center grid-cols-3 col-span-4 gap-x-4 gap-y-8 relative">
                    <div className="flex gap-4 flex-col col-span-4">
                      <h3 className="font-bold"> {t("national Address")} </h3>
                    </div>
                    <div className="bg-flatWhite rounded-lg p-4 grid justify-center grid-cols-3 col-span-4 gap-x-4 gap-y-8 relative">
                      <div className="flex gap-4 flex-col">
                        {employee.nationalAddress?.city.name && (
                          <TextLine
                            boldText={t("city")}
                            lightString={employee.nationalAddress?.city.name}
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {employee.nationalAddress?.city.country_name && (
                          <TextLine
                            boldText={t("country")}
                            lightString={
                              employee.nationalAddress?.city.country_name
                            }
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {employee.nationalAddress?.district.name && (
                          <TextLine
                            boldText={t("district")}
                            lightString={
                              employee.nationalAddress?.district.name
                            }
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {employee.nationalAddress?.address && (
                          <TextLine
                            boldText={t("short address")}
                            lightString={employee.nationalAddress?.address}
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {employee.nationalAddress?.street_number && (
                          <TextLine
                            boldText={t("street number")}
                            lightString={
                              employee.nationalAddress?.street_number
                            }
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {employee.nationalAddress?.building_number && (
                          <TextLine
                            boldText={t("building number")}
                            lightString={
                              employee.nationalAddress?.building_number
                            }
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {employee.nationalAddress?.sub_number && (
                          <TextLine
                            boldText={t("sub number")}
                            lightString={employee.nationalAddress?.sub_number}
                          />
                        )}
                      </div>
                      <div className="flex gap-4 flex-col">
                        {employee.nationalAddress?.zip_code && (
                          <TextLine
                            boldText={t("zip code")}
                            lightString={employee.nationalAddress?.zip_code}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          )}
        </InnerFormLayout>
      </OuterFormLayout>
    </>
  )
}
