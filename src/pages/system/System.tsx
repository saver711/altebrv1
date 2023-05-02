/////////// IMPORTS
///
import { Helmet } from "react-helmet-async"
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
// const systemCards: Card_TP[] = [
//   {
//     id: crypto.randomUUID(),
//     title: t("companyData"),
//     addLabel: "إدخال بيانات الشركة",
//     viewLabel: "عرض بيانات الشركة",
//     viewHandler: () => navigate("company-profile"),
//   },
//   {
//     id: crypto.randomUUID(),
//     title: t("partners"),
//     // count: countries.length,
//     addLabel: "أضافة شريك",
//     viewLabel: "عرض الشركاء",
//     viewHandler: () => navigate("view-partner"),
//   },
//   {
//     id: crypto.randomUUID(),
//     title: t("add_account"),
//     name: "add_account",
//     // count: countries.length,
//     addLabel: "إنشاء حساب",
//     viewLabel: "عرض الحسابات",
//     // viewHandler: () => navigate("accounting_tree"),
//     viewHandler: () => navigate("accounts"),
//   },
//   /// ZZZ
//   {
//     id: crypto.randomUUID(),
//     title: t("payment_methods"),
//     name: "payment_methods",
//     // count: cards.payment_methods.length,
//     addLabel: "إضافة طريقة دفع",
//     viewLabel: "عرض طرق الدفع",
//     viewHandler: () => navigate("payment_methods"),
//   },
//   {
//     id: crypto.randomUUID(),
//     title: t("add_size"),
//     name: "add_size",
//     addLabel: "إنشاء مقاس",
//     viewLabel: "عرض المقاسات",
//     viewHandler: () => navigate("sizes"),
//   },
//   {
//     id: crypto.randomUUID(),
//     title: t("addBank_account"),
//     name: "bank_account",
//     addLabel: " إنشاء حساب بنكي ",
//     viewLabel: " عرض الحسابات البنكية ",
//   },
//   {
//     id: crypto.randomUUID(),
//     title: t("supplier"),
//     name: "add_supplier",
//     addLabel: " إنشاء  مورد ",
//     viewLabel: " عرض  الموردين ",
//     viewHandler: () => navigate("suppliers"),
//   },
//   {
//     id: crypto.randomUUID(),
//     title: t("operations"),
//     viewLabel: "عرض وتعديل العمليات",
//     name: "operations",
//     viewHandler: () => navigate("operations"),
//   },
//   {
//     id: crypto.randomUUID(),
//     title: t("cards"),
//     name: "cards",
//     viewLabel: "عرض وإضافة البطاقات",
//     viewHandler: () => navigate("cards"),
//   },
//   {
//     id: crypto.randomUUID(),
//     title: t("system establishment"),
//     name: "system establishment",
//     addLabel: "تأسيس عام وأحجار",
//     addHandler: () => navigate("global-and-stones"),
//   },

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

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

    </>
  )
}
