/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik, FormikValues } from "formik"
import { t } from "i18next"
import { Helmet } from "react-helmet-async"
import { Button } from "../../components/atoms"
import { OuterFormLayout } from "../../components/molecules"
import { Loading } from "../../components/organisms/Loading"
import { PermissionForm } from "../../components/templates/administrativeStructure/PermissionForm"
import { useFetch, useMutate } from "../../hooks"
import { mutateData } from "../../utils/mutateData"
import { notify } from "../../utils/toast"
import { HandleBackErrors } from "../../utils/utils-components/HandleBackErrors"
import {
    addAdministrativeSchema,
    PermissionGroup_TP,
    Permission_TP
} from "./types-and-schemas"
///
/////////// Types
///
type AddAdministrativeStructureProps_TP = {
  title: string
  value?: string
  onAdd?: (value: string) => void
  editData?:PermissionGroup_TP
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const AddAdministrativeStructure = ({
  title,value,onAdd , editData
}: AddAdministrativeStructureProps_TP) => {
  console.log("🚀 ~ file: AddAdministrativeStructure.tsx:36 ~ editData:", editData)
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  let asyncInitValues: { [key: string]: string } = {
    name: editData?.name || "",
  }

  const {
    data: permissions,
    isError: permissionsError,
    isLoading: permissionsLoading,
    isSuccess: permissionsSuccess,
    failureReason,
    error,
  } = useFetch<PermissionGroup_TP[]>({
    queryKey: ["roles"],
    endpoint: "administrative/api/v1/permissions/withgrouping",
  })
  
  
  permissions?.map((permissionsGroup) =>
    permissionsGroup.permissions?.map(
      (perm) => (asyncInitValues[perm.id as keyof Permission_TP] = "")
      )
      )
      const queryClient = useQueryClient()
  const {
    mutate,
    isLoading: isMutating,
    error: rulePostError,
  } = useMutate({
    mutationFn: mutateData,
    onSuccess: (data) => {
      notify('success')
      if(value && onAdd) {
        onAdd(value)
        queryClient.setQueryData(['allRoles'], (old: any) => {
          return [...old, data]
        })
      } 
  },
  })

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  const addAdminStructureHandler = (values: FormikValues) => {
    const idsValues = Object.entries(values).map(([key,_])=>{
      if(values[key] === true) {return key}
    }).filter(item=> !!item) 
   
    mutate({
      endpointName: "/administrative/api/v1/roles",
      values: {name: values.name , permissions: idsValues },
    })
  }
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {permissionsLoading && <Loading mainTitle="تحميل" subTitle="الصلاحيات" />}
      {permissionsError && <p>{error.message}</p>}

      {permissionsSuccess && (
        <Formik
          onSubmit={addAdminStructureHandler}
          enableReinitialize={true}
          initialValues={asyncInitValues}
          validationSchema={addAdministrativeSchema()}
        >
          {({ values, touched }) => (
            <HandleBackErrors errors={rulePosterror?.response?.data?.errors}>
              <Form>
                <OuterFormLayout
                  submitComponent={
                    <Button
                      type="submit"
                      variant="primary"
                      className="mr-auto mt-8"
                      loading={isMutating}
                    >
                      {t("confirm")}
                    </Button>
                  }
                  header={t("add-administrative-structure")}
                >
                  <PermissionForm permissions={permissions} />
                </OuterFormLayout>
              </Form>
            </HandleBackErrors>
          )}
        </Formik>
      )}
    </>
  )
}