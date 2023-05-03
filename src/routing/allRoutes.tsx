import { t } from "i18next"
import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { AddEmployee } from "../components/templates/employee/AddEmployee"
import AccountingTree from "../components/templates/systemEstablishment/AccountingTree/view/AccountingTree"
import { TestSystem } from "../components/templates/systemEstablishment/TestSystem"
import { ViewCompanyDetails } from "../components/templates/systemEstablishment/partners/ViewCompanyDetails"
import AddSupplier from "../components/templates/systemEstablishment/supplier/AddSupplier"
import { SupplierDetails } from "../components/templates/systemEstablishment/supplier/SupplierDetails"
import { authCtx } from "../context/auth-and-perm/auth"
import { PermissionCtxProvider } from "../context/auth-and-perm/permissions"
import Hashim from "../pages/Hashim"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Settings } from "../pages/Settings"
import { TestAbdo } from "../pages/TestAbdo"
import { Tests } from "../pages/Tests"
import { AddAdministrativeStructure } from "../pages/administrativeStructure/AddAdministrativeStructure"
import { AdministrativeStructure } from "../pages/administrativeStructure/AdministrativeStructure"
import { Coding } from "../pages/coding/Coding"
import { GoldCoding } from "../pages/coding/gold/GoldCoding"
import { GoldCodingWrapper } from "../pages/coding/gold/GoldCodingWrapper"
import { Employees } from "../pages/employees/Employees"
import { OneEmployee } from "../pages/employees/OneEmployee"
import { Bond } from "../pages/gold-supply/Bond"
import { Bonds } from "../pages/gold-supply/Bonds"
import { GoldSupply } from "../pages/gold-supply/GoldSupply"
import { Operation } from "../pages/operation/Operation"
import { AllPartner } from "../pages/partner/AllPartner"
import { OnePartner } from "../pages/partner/OnePartner"
import { AllSuppliers } from "../pages/suppliers/AllSuppliers"
import { System } from "../pages/system/System"
import { ErrorPage } from "./ErrorPage"
import { Root } from "./Root"
import { GlobalAndStones } from "../pages/system/GlobalAndStones"
import { ViewCountries } from "../components/templates/systemEstablishment/view/ViewCountries"
import { ViewCities } from "../components/templates/systemEstablishment/view/ViewCities"
import { ViewDistricts } from "../components/templates/systemEstablishment/view/ViewDistricts"
import { ViewNationalities } from "../components/templates/systemEstablishment/view/ViewNationalities"
import { ViewColors } from "../components/templates/systemEstablishment/view/ViewColors"
import { ViewClassifications } from "../components/templates/systemEstablishment/view/ViewClassifications"
import { ViewKarats } from "../components/templates/systemEstablishment/view/Viewkarats"
import { ViewCategories } from "../components/templates/systemEstablishment/view/ViewCategories"
import { ViewMarkets } from "../components/templates/systemEstablishment/view/ViewMarkets"
import { ViewStoneType } from "../components/templates/reusableComponants/stones/view/ViewStoneType"
import { ViewStoneShape } from "../components/templates/reusableComponants/stones/view/ViewStoneShape"
import { ViewStoneQuality } from "../components/templates/reusableComponants/stones/view/ViewStoneQuality"
import { ViewStonePurity } from "../components/templates/reusableComponants/stones/view/ViewStonePurity"
import { ViewStoneNature } from "../components/templates/reusableComponants/stones/view/ViewStoneNature"
export const AllRoutesProvider = () => {
  const { permissions, userData } = useContext(authCtx)
  return (
    <PermissionCtxProvider userPermissions={permissions || [""]}>
      <Routes>
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
          <Route index element={<Home title={t("home")} />} />
          <Route
            path="/settings"
            element={<Settings title={t("settings")} />}
          />
          {/* CODING */}
          <Route path="/coding" element={<Coding title={t("coding")} />} />
          <Route
            path="/coding/gold"
            element={<GoldCoding title={t("gold coding")} />}
          />
          <Route
            path="/coding/gold/:sanadId"
            element={<GoldCodingWrapper title="ترقيم سند ذهب" />}
          />
          {/* ./CODING */}

          {/* SYSTEM */}
          <Route path="/system" element={<System title={t("system")} />} />
          <Route
            path="/system/company-profile"
            element={<ViewCompanyDetails />}
          />
          <Route
            path="/system/partners"
            element={<AllPartner title="الشركاء" />}
          />
          <Route path="/system/partners/:partnerID" element={<OnePartner />} />

          <Route path="/system/accounts" element={<AccountingTree />} />
          <Route
            path="/system/suppliers"
            element={<AllSuppliers title="كل الموردين" />}
          />
          <Route
            path="/system/operations"
            element={<Operation title="كل الموردين" />}
          />
          {/* ------- عام واحجار -------- */}
          <Route
            path="/system/global-and-stones"
            element={<GlobalAndStones title="تاسيس عام واحجار" />}
          />
          <Route
            path="/system/global-and-stones/countries"
            element={<ViewCountries />}
          />
          <Route
            path="/system/global-and-stones/cities"
            element={<ViewCities />}
          />
          <Route
            path="/system/global-and-stones/districts"
            element={<ViewDistricts />}
          />
          <Route
            path="/system/global-and-stones/nationalities"
            element={<ViewNationalities />}
          />
          <Route
            path="/system/global-and-stones/colors"
            element={<ViewColors />}
          />
          <Route
            path="/system/global-and-stones/classifications"
            element={<ViewClassifications />}
          />
          <Route
            path="/system/global-and-stones/classifications"
            element={<ViewClassifications />}
          />
          <Route
            path="/system/global-and-stones/karats"
            element={<ViewKarats />}
          />
          <Route
            path="/system/global-and-stones/categories"
            element={<ViewCategories />}
          />
          <Route
            path="/system/global-and-stones/markets"
            element={<ViewMarkets />}
          />

          {/* الاحجار */}
          <Route
            path="/system/global-and-stones/stones-types"
            element={<ViewStoneType />}
          />
          <Route
            path="/system/global-and-stones/stones-colors"
            element={<ViewColors />}
          />

          <Route
            path="/system/global-and-stones/stones-shapes"
            element={<ViewStoneShape />}
          />
          <Route
            path="/system/global-and-stones/stones-qualities"
            element={<ViewStoneQuality />}
          />
          <Route
            path="/system/global-and-stones/stones-purities"
            element={<ViewStonePurity />}
          />
          <Route
            path="/system/global-and-stones/stones-natures"
            element={<ViewStoneNature />}
          />
          {/* ./SYSTEM */}
          <Route
            path="/administrative-structure"
            element={
              <AdministrativeStructure title={t("administrative-structure")} />
            }
          />
          <Route
            path="/add-administrative-structure"
            element={
              <AddAdministrativeStructure
                title={t("add-administrative-structure")}
              />
            }
          />
          <Route path="/hashim" element={<Hashim />} />

          <Route
            path="/add-supplier"
            element={<AddSupplier title={t("add supplier")} />}
          />
          <Route
            path="/add-employee"
            element={<AddEmployee title={t("add-employee")} />}
          />
          <Route
            path="/employees"
            element={<Employees title={t("employees")} />}
          />
          <Route path="/employees/:employeeID" element={<OneEmployee />} />
          <Route
            path="/all-partner"
            element={<AllPartner title={t("all-partner")} />}
          />

          <Route path="/abdo" element={<TestAbdo title={t("Test")} />} />
          <Route
            path="/gold-first-form"
            element={<GoldSupply title={t("gold supply")} />}
          />
          <Route path="/bonds" element={<Bonds title={t("bonds")} />} />
          <Route path="/bonds/:bondID" element={<Bond title={t("bond")} />} />
          <Route
            path="/suppliers/:SupplierID"
            element={
              <SupplierDetails title={t("supplier details").toString()} />
            }
          />
        </Route>
        <Route
          errorElement={<ErrorPage />}
          path="/login"
          element={<Login title={t("login")} />}
        />
        <Route path="/tests" element={<Tests />} />
        <Route path="/testSystem" element={<TestSystem title={t("test")} />} />
        <Route path="/testSystem" element={<TestSystem title={t("test")} />} />
        <Route
          path="/operation"
          element={<Operation title={t("Operation")} />}
        />

        <Route
          path="/suppliers"
          element={<AllSuppliers title={t("all suppliers")} />}
        />

        <Route
          path="/gold-first-form"
          element={<GoldSupply title={t("gold supply")} />}
        />
        <Route path="/bonds" element={<Bonds title={t("bonds")} />} />
        <Route path="/bonds/:bondID" element={<Bond title={t("bond")} />} />
      </Routes>
    </PermissionCtxProvider>
  )
}
