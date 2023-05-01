import { t } from "i18next"
import { useFetch } from "../../../../../hooks"
import { Header } from "../../../../atoms/Header"
import { Tree } from "../../../../atoms/tree"
import { Loading } from "../../../../organisms/Loading"
import { AccountingTreeNode } from "./AccountingTreeNode"

export type TreeNode_TP = {
  label: string,
  children?: TreeNode_TP[]
}

const AccountingTreeData = () => {
  const test: TreeNode_TP[] = [
    {
      label: 'الأصول',
      children: [
        {
          label: 'الأصول الثابتة',
          children: [
            {
              label: 'المباني',
              children: [
                { label: 'المبني الرئيسي للشركة' },
                { label: 'مبني الفرع' },
              ],
            },
            {
              label: 'الأثاث',
              children: [
                { label: 'أثاث الفرع الرئيسي' },
                { label: 'أثاث الفرع 2' },
              ],
            },
          ],
        },
        {
          label: 'الأصول المتداولة',
          children: [
            {
              label: 'النقدية',
              children: [
                { label: 'الصناديق' },
                { label: 'البنوك' },
              ],
            },
            {
              label: 'العملاء',
              children: [
                { label: 'العملاء' },
                { label: 'عملاء في الخارج' },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'الخصوم',
      children: [
        {
          label: 'الخصوم الثابتة',
          children: [
            { label: 'رأس المال' },
            { label: 'الاحتياطيات' },
            { label: 'المخصصات' },
            { label: 'الأرباح و الخسائر' },
          ],
        },
        {
          label: 'الخصوم المتداولة',
          children: [
            {
              label: 'الموردون',
              children: [
                { label: 'مورد محلي' },
                { label: 'مورد خارجي' },
              ],
            },
            { label: 'التزامات أخري' },
          ],
        },
      ],
    },
    {
      label: 'المصروفات',
      children: [
        {
          label: 'تكاليف النشاط',
          children: [
            { label: 'تكلفة مبيعات المخزون' },
            { label: 'تكلفة مردودات المبيعات' },
            { label: 'الخصم المسموح به' },
          ],
        },
        {
          label: 'المصروفات الادارية',
          children: [
            { label: 'مصروفات ادارية' },
            { label: 'مصروفات اعلامية' },
          ],
        },
      ],
    },
    {
      label: 'الايرادات',
      children: [
        {
          label: 'ايرادات النشاط',
          children: [
            { label: 'ايرادات المبيعات' },
            { label: 'ايراد الذهب' },
            { label: 'ايراد الألماس' },
          ],
        },
        {
          label: 'ايرادات أخري',
          children: [
            { label: 'ايرادات التلميع' },
            { label: 'ايرادات البرامج التقنية' },
          ],
        },
      ],
    },
  ];
  
  const { 
    data,
    isLoading, 
    isSuccess, 
    error 
  } = useFetch<TreeNode_TP[]>({
    endpoint: 'accounting/api/v1/treeAccounts',
    queryKey: ['view_accounting_tree'],
    onSuccess(data) { 
      console.log(data) 
    }
  })

  return (
    <div className="flex flex-col gap-6 items-center">
      {error && (
        <div className=" m-auto">
          <Header
            className="text-center text-2xl font-bold"
            header={t(`some thing went wrong ${error.response.data.message}`)}
          />
        </div>
      )}
      {isLoading && <Loading mainTitle={t("accounting tree")} />}
      {isSuccess && !!data && !!data.length && (
        <Tree label={'الشجرة المحاسبية'}>
          <AccountingTreeNode tree={data} />
        </Tree>
      )}
    </div>
  )
}

export default AccountingTreeData