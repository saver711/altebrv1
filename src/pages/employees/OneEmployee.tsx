/////////// IMPORTS
///
import { t } from "i18next"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import blankPerson from "../../assets/blank-person-image.png"
import { Button } from "../../components/atoms"
import { InnerFormLayout, OuterFormLayout } from "../../components/molecules"
import { FilesPreviewOutFormik } from "../../components/molecules/files/FilesPreviewOutFormik"
import { Loading } from "../../components/organisms/Loading"
import { TextLine } from "../../components/templates/employee/TextLine"
import { allDocs_TP } from "../../components/templates/reusableComponants/documents/Documents"
import { useFetch } from "../../hooks"
import { Employee_TP } from "./employees-types"
import { formatDate } from "../../utils/date"

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

  const navigate = useNavigate()
  ///
  /////////// CUSTOM HOOKS
  ///
  const { data: employee, isSuccess, isLoading: employeeLoading } = useFetch<Employee_TP | any>({
    endpoint: `employee/api/v1/employees/${employeeID}`,
    queryKey: ["employees", employeeID!],
  })
  console.log("🚀 ~ file: OneEmployee.tsx:38 ~ OneEmployee ~ employee:", employee)

  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  if (employeeLoading) return <Loading mainTitle={`${t('loading...')}`} subTitle={`${t('employee data is loading')}`} />
  ///
  return (
    <>
      <Helmet>
        {/* Employee name */}
        <title>{employee?.name || "معلومات موظف"}</title>
      </Helmet>
      <OuterFormLayout
        header={`${t('view details')}`}
        leftComponent={
          <Button action={() => navigate(-1)} bordered>
            {t('Back')}
          </Button>
        }
      >
        <InnerFormLayout title={employee?.name} >
          {isSuccess && (
            <div className="col-span-4" >
              <div className="flex gap-x-1">
                {/* Right column */}
                <div className="flex gap-4 flex-col mb-8" >
                  <img
                    src={employee.image || blankPerson}
                    alt={`employee ${employee.name}`}
                    className="w-[7rem] rounded-full"
                  />
                  {employee.name && (
                    <TextLine boldText={t("Name")} lightString={employee.name} />
                  )}
                  {employee.nationality && (
                    <TextLine boldText={t("nationality")} lightString={employee.nationality.name} />
                  )}
                  {employee.phone && (
                    <TextLine boldText={t("phone number")} lightString={employee.phone} />
                  )}
                  {employee.mobile && (
                    <TextLine boldText={t("mobile number")} lightString={employee.mobile} />
                  )}
                </div>

                {/* The rest */}
                <div className="flex gap-4 flex-col mb-8 " >
                  {employee.address && (
                    <TextLine boldText={t("address")} lightString={employee.address} />
                  )}
                  {employee.hiringData && (
                    <TextLine boldText={t("hiring date")} lightString={employee.hiringData} />
                  )}
                  {employee.date_of_birth && (
                    <TextLine boldText={t("birth date")} lightString={employee.date_of_birth} />
                  )}
                  {employee.username && (
                    <TextLine boldText={t("username")} lightString={employee.username} />
                  )}
                  {employee.role && (
                    <TextLine boldText={t("role")} lightString={employee.role.name} />
                  )}
                  <div className="flex gap-4 flex-col col-span-2">
                    <h2 className="font-bold text-xl" >{t('national address')}</h2>
                    {employee.city && (
                      <TextLine boldText={t("city")} lightString={employee.city.name} />
                    )}
                    {employee.country && (
                      <TextLine boldText={t("country")} lightString={employee.country.name} />
                    )}

                  </div>
                </div>

                <div className="flex gap-4 flex-col mb-8" >
                  {employee.branch && (
                    <TextLine boldText={t("branch")} lightString={employee.branch.name} />
                  )}
                  {employee.national_number && (
                    <TextLine boldText={t("national number")} lightString={employee.national_number} />
                  )}
                  {employee.national_expire_date && (
                    <TextLine boldText={t("national expire date")} lightString={employee.national_expire_date} />
                  )}

                  {employee.email && (
                    <TextLine boldText={t("email")} lightString={employee.email} />
                  )}
                  {employee.is_active !== 'undefined' && (
                    <div className="flex relative">
                      <TextLine boldText={t("is active")} lightString={employee.is_active} />
                      <span className="inline-block absolute right-28 " > {(employee.is_active === true) ? `${t("Yes")}` : `${t("No")}`}</span>
                    </div>
                  )}
                </div>


                {(employee.national_image || employee.image) && (
                  <div className="relative" >
                    <TextLine boldText={t("media")} lightString="" />
                    <div className="absolute -top-6 right-16" >
                    <FilesPreviewOutFormik preview={true} images={[{
                      path: employee.national_image,
                      type: "image"
                    }, {
                      path: employee.image,
                      type: "image"
                    }]} />
                    </div>
                  </div>
                )}
              </div>
              <div className="" >
                {employee?.document.length !== 0 &&
                  employee?.document.map((doc:allDocs_TP, i:string) => (
                    <div className=" flex flex-col gap-4 border-b-2 border-dashed p-4 items-center justify-center">
                      <div className=" flex items-center justify-center mb-8">
                        <div className="py-2 px-5 rounded-lg  bg-mainGreen  bg-opacity-10 border border-dashed border-gray-400">
                          <p className=" text-lg font-bold text-mainGreen">
                            {t(`document`)} {i + 1}
                          </p>
                        </div>
                      </div>
                      <div className=" flex w-full justify-between items-center flex-wrap gap-4 ">
                        <TextLine
                          boldText={t("document Name")}
                          lightString={doc?.data?.docName}
                        />
                        <TextLine
                          boldText={t("document Number")}
                          lightString={doc?.data?.docNumber}
                        />
                        <TextLine
                          boldText={t("document Type")}
                          lightString={doc?.data?.docType.label}
                        />
                        <TextLine
                          containerClasses="w-fit "
                          boldText={t("document end Date")}
                          lightString={formatDate(new Date(doc?.data?.endDate))}
                        />
                        <TextLine
                          boldText={t("document reminder")}
                          lightString={doc?.data?.reminder}
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </InnerFormLayout>
      </OuterFormLayout>
    </>
  )
}
