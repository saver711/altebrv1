import { t } from "i18next"
import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { AddEmployee } from "../components/templates/employee/AddEmployee"
import AddSupplier from "../components/templates/systemEstablishment/supplier/AddSupplier"
import { SupplierDetails } from "../components/templates/systemEstablishment/supplier/SupplierDetails"
import { TestSystem } from "../components/templates/systemEstablishment/TestSystem"
import { authCtx } from "../context/auth-and-perm/auth"
import { PermissionCtxProvider } from "../context/auth-and-perm/permissions"
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
import Hashim from "../pages/Hashim"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Operation } from "../pages/operation/Operation"
import { AllPartner } from "../pages/partner/AllPartner"
import { OnePartner } from "../pages/partner/OnePartner"
import { Settings } from "../pages/Settings"
import { AllSuppliers } from "../pages/suppliers/AllSuppliers"
import { System } from "../pages/system/System"
import { TestAbdo } from "../pages/TestAbdo"
import { Tests } from "../pages/Tests"
import { ErrorPage } from "./ErrorPage"
import { Root } from "./Root"
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
          <Route path="/system" element={<System title={t("system")} />} />
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
          <Route path="/all-partner/:partnerID" element={<OnePartner />} />

          <Route path="/abdo" element={<TestAbdo title={t("Test")} />} />
          <Route
            path="/gold-first-form"
            element={<GoldSupply title={t("gold supply")} />}
          />
          <Route
            path="/bonds"
            element={<Bonds title={t("bonds")} />}
          />
          <Route
            path="/bonds/:bondID"
            element={<Bond title={t("bond")} />}
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
          path="/suppliers/:SupplierID"
          element={<SupplierDetails title={t("supplier details").toString()} />}
        />
      </Routes>
    </PermissionCtxProvider>
  )
}
