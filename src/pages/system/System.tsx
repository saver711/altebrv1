/////////// IMPORTS
///
import { t } from "i18next"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { Modal } from "../../components/molecules"
import { AddEmployee } from "../../components/templates/employee/AddEmployee"
import { AccountingTree } from "../../components/templates/systemEstablishment/AccountingTree/AccountingTree"
import { AddPartners } from "../../components/templates/systemEstablishment/partners/AddPartners"
import AddSupplier from "../../components/templates/systemEstablishment/supplier/AddSupplier"
import { SystemCard } from "../../components/templates/systemEstablishment/SystemCard"
import { AddAdministrativeStructure } from "../administrativeStructure/AddAdministrativeStructure"
import { Card_TP, FormNames_TP } from "./types-and-helpers"
///
/////////// Types
///
type SystemProps_TP = {
  title: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const System = ({ title }: SystemProps_TP) => {
  /////////// VARIABLES
  ///
  const navigate = useNavigate()

  const [popupIsOpen, setPopupIsOpen] = useState({
    partners: false,
    add_account: false,
    add_supplier: false,
    add_administrative_structure: false,
    add_employee: false
  })
  const systemCards: Card_TP<FormNames_TP>[] = [
    {
      id: crypto.randomUUID(),
      title: t("companyData"),
      viewLabel: "عرض بيانات الشركة",
      viewHandler: () => navigate("company-profile"),
    },
    {
      id: crypto.randomUUID(),
      title: t("partners"),
      name: "partners",
      addLabel: "أضافة شريك",
      viewLabel: "عرض الشركاء",
      addComponent: <AddPartners title="إضافة شريك" />,
      viewHandler: () => navigate("partners"),
    },
    {
      id: crypto.randomUUID(),
      title: t("add_account"),
      name: "add_account",
      addLabel: "إنشاء حساب",
      viewLabel: "عرض الحسابات",
      addComponent: <AccountingTree />,
      viewHandler: () => navigate("accounts"),
    },
    {
      id: crypto.randomUUID(),
      title: t("supplier"),
      name: "add_supplier",
      addLabel: "إنشاء  مورد",
      viewLabel: "عرض  الموردين",
      addComponent: <AddSupplier title="اضافة مورد" />,
      viewHandler: () => navigate("suppliers"),
    },
    {
      id: crypto.randomUUID(),
      title: t("employees"),
      name: "add_employee",
      addLabel: "إنشاء موظف",
      viewLabel: "الموظفين",
      viewHandler: () => navigate("employees"),
      addComponent: <AddEmployee title="إضافة موظف" />,
    },
    {
      id: crypto.randomUUID(),
      title: t("administrative structure"),
      name: "add_administrative_structure",
      addLabel: "إنشاء هيكل اداري",
      viewLabel: "الهيكل الاداري",
      viewHandler: () => navigate("administrative-structure"),
      addComponent: <AddAdministrativeStructure title="إضافة هيكل اداري" />,
    },
    {
      id: crypto.randomUUID(),
      title: t("operations"),
      viewLabel: "عرض وتعديل العمليات",
      viewHandler: () => navigate("operations"),
    },
    {
      id: crypto.randomUUID(),
      title: t("system establishment"),
      viewLabel: "تأسيس عام واحجار",
      viewHandler: () => navigate("global-and-stones"),
    },
  ]
  //   // XXX
  // ]
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  const openPopup = (formName: FormNames_TP) =>
    setPopupIsOpen((prev) => ({ ...prev, [formName]: true }))

  const closePopupHandler = (formName: FormNames_TP) =>
    setPopupIsOpen((prev) => ({ ...prev, [formName]: false }))
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="grid grid-cols-4 gap-4">
        {systemCards.map(
          ({
            id,
            title,
            addComponent,
            addLabel,
            viewHandler,
            viewLabel,
            name,
          }) => (
            <SystemCard
              key={id}
              viewHandler={viewHandler}
              viewLabel={viewLabel}
              title={title}
              addLabel={addLabel}
              addHandler={() => openPopup(name as FormNames_TP)}
            />
          )
        )}
      </div>

      {systemCards.map(({ id, name, addComponent }) => {
        if (name && addComponent) {
          return (
            <Modal
              key={id}
              isOpen={popupIsOpen[name as keyof typeof popupIsOpen]}
              onClose={() =>
                closePopupHandler(name as keyof typeof popupIsOpen)
              }
            >
              {addComponent}
            </Modal>
          )
        }
      })}
    </>
  )
}
