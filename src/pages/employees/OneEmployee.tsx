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
import { useFetch } from "../../hooks"
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

  const navigate = useNavigate()
  ///
  /////////// CUSTOM HOOKS
  ///
  const { data: employee, isSuccess, isLoading: employeeLoading } = useFetch<Employee_TP | any>({
    endpoint: `employee/api/v1/employees/${employeeID}`,
    queryKey: ["employees", employeeID!],
  })

  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  if (employeeLoading) return <Loading mainTitle={`${t('loading')}`} subTitle={`${t('employee data is loading')}`} />
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
            <>
              {/* Right column */}
              <div className="flex gap-4 flex-col mb-8" >
                <img
                  src={employee.national_image || blankPerson}
                  alt={`employee ${employee.name}`}
                  className="w-[7rem] rounded-full"
                />
                {employee.name && (
                  <TextLine boldText={t("Name")} lightString={employee.name} />
                )}
                {employee.nationality && (
                  <TextLine boldText={t("nationality")} lightString={employee.nationality} />
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
                  <TextLine boldText={t("role")} lightString={employee.role} />
                )}
                <div className="flex gap-4 flex-col col-span-2">
                  <h2 className="font-bold text-xl" >{t('national address')}</h2>
                  {employee.city && (
                    <TextLine boldText={t("city")} lightString={employee.city} />
                  )}
                  {employee.country && (
                    <TextLine boldText={t("country")} lightString={employee.country} />
                  )}

                </div>
              </div>

              <div className="flex gap-4 flex-col mb-8" >
                {employee.branch && (
                  <TextLine boldText={t("branch")} lightString={employee.branch} />
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
                <div>
                  <TextLine boldText={t("media")} lightString="" />
                  <FilesPreviewOutFormik preview={true} images={[employee.national_image, employee.image]} />
                </div>
              )}

            </>
          )}
        </InnerFormLayout>
      </OuterFormLayout>
    </>
  )
}
