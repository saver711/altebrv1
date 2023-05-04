/////////// IMPORTS
///
import { t } from "i18next"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import blankPerson from "../../assets/blank-person-image.png"
import { Button } from "../../components/atoms"
import { InnerFormLayout, OuterFormLayout } from "../../components/molecules"
import { Loading } from "../../components/organisms/Loading"
import { TextLine } from "../../components/templates/employee/TextLine"
import { useFetch } from "../../hooks"
import { formatDate } from "../../utils/date"
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

  /////////// STATES
  ///

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
          <InnerFormLayout title={supplier?.name}>
            {isSuccess && (
              <>
                {/* Right column */}
                <div className="flex gap-4 flex-col">
                  <img
                    src={supplier.logo || blankPerson}
                    alt={`supplier ${supplier.name}`}
                    className="w-[7rem] rounded-full"
                  />
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

                {/* The rest */}
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
              </>
            )}
          </InnerFormLayout>
        </OuterFormLayout>
      </>
    )
}
