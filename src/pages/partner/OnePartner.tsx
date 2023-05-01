/////////// IMPORTS
///
import { t } from "i18next"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import blankPerson from "../../assets/blank-person-image.png"
import { Button } from "../../components/atoms"
import { InnerFormLayout, OuterFormLayout } from "../../components/molecules"
import { TextLine } from "../../components/templates/employee/TextLine"
import { useFetch } from "../../hooks"
import { Employee_TP } from "../employees/employees-types"
import { Loading } from "../../components/organisms/Loading"
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
        {partnerLoading && <Loading mainTitle={t("view company Details")} />}
        <InnerFormLayout title={partner?.name}>
          {isSuccess && (
            <>
              {/* Right column */}
              <div className="flex gap-4 flex-col">
                <img
                  src={partner.logo || blankPerson}
                  alt={`partner ${partner.name}`}
                  className="w-[7rem] rounded-full"
                />
                {partner.name && (
                  <TextLine boldText={t("Name")} lightString={partner.name} />
                )}
                {partner.nationality_name && (
                  <TextLine
                    boldText={t("nationality_name")}
                    lightString={partner.nationality_name}
                  />
                )}

                {partner.phone && (
                  <TextLine
                    boldText={t("phone number")}
                    lightString={partner.phone}
                  />
                )}
              </div>

              {/* The rest */}
              <div className="flex gap-4 flex-col">
                {partner.country_name && (
                  <TextLine
                    boldText={t("country_name")}
                    lightString={partner.country_name}
                  />
                )}
                {partner.city_name && (
                  <TextLine
                    boldText={t("city_name")}
                    lightString={partner.city_name}
                  />
                )}
              </div>
              <div className="flex gap-4 flex-col">
                {partner.start_date && (
                  <TextLine
                    boldText={t("hiring date")}
                    lightString={partner.start_date}
                  />
                )}
                {partner.end_date && (
                  <TextLine
                    boldText={t("end date")}
                    lightString={partner.end_date}
                  />
                )}
                {partner.tax && (
                  <TextLine boldText={t("tax")} lightString={partner.tax} />
                )}
                {partner.type && (
                  <TextLine boldText={t("type")} lightString={partner.type} />
                )}
              </div>
              <div className="flex gap-4 flex-col">
                {partner.address && (
                  <TextLine
                    boldText={t("address")}
                    lightString={partner.address}
                  />
                )}
                {partner.national_number && (
                  <TextLine
                    boldText={t("national number")}
                    lightString={partner.national_number}
                  />
                )}
                {partner.email && (
                  <TextLine boldText={t("email")} lightString={partner.email} />
                )}
              </div>
            </>
          )}
        </InnerFormLayout>
      </OuterFormLayout>
    </>
  )
}
