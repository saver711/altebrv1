/////////// IMPORTS
///
//import classes from './GoldSupplyFirstForm.module.css'
///
/////////// Types

import { Form, Formik } from "formik"
import { t } from "i18next"
import { formatDate, getDayBefore } from "../../utils/date"
import { Button } from "../atoms"
import { BaseInputField, DateInputField, InnerFormLayout, OuterFormLayout, Select, TextAreaField } from "../molecules"
import RadioGroup from "../molecules/RadioGroup"
import { RefetchErrorHandler } from "../molecules/RefetchErrorHandler"
import { DropFile } from "../molecules/files/DropFile"
import { GoldFirstFormInitValues_TP, goldValidatingSchema } from "./formInitialValues_types"
import { useFetch } from "../../hooks"
import { Employee_TP } from "../../pages/employees/employees-types"
import { SelectOption_TP } from "../../types"
import { Supplier_TP } from "../templates/systemEstablishment/supplier/supplier-types"

///
type FirstFormProps_TP = {
    formValues: GoldFirstFormInitValues_TP | undefined
    setFormValues: React.Dispatch<React.SetStateAction<GoldFirstFormInitValues_TP | undefined>>
    setStage: React.Dispatch<React.SetStateAction<number>>
    nextBondNumber: string | undefined
}
/////////// HELPER VARIABLES & FUNCTIONS
///
///
export const GoldSupplyFirstForm = ({
    formValues,
    setFormValues,
    setStage,
    nextBondNumber,
}: FirstFormProps_TP) => {
    ///
    /////////// CUSTOM HOOKS
    ///
    // fetch gold price api to set it as default price
    // fetch buyer api 
    const { data: employees, isLoading: employeesLoading, failureReason: employeeError, refetch: refetchEmployee } = useFetch<SelectOption_TP[], Employee_TP[]>
        ({
            endpoint: "employee/api/v1/employees",
            queryKey: ["employees"],
            select: (employess) => employess.map((employee) => {
                return {
                    id: employee.id,
                    value: employee.name,
                    label: employee.name,
                    name: employee.name
                }
            })
        })
    const { data: suppliers, isLoading: suppliersLoading, failureReason: suppliersErrorReason, refetch: refetchSupplier } = useFetch<SelectOption_TP[], Supplier_TP[]>
        ({
            endpoint: "/supplier/api/v1/suppliers",
            queryKey: ["suppliers"],
            select: (suppliers) => suppliers.map((supplier) => {
                return {
                    //@ts-ignore
                    id: supplier.id,
                    value: supplier.name,
                    label: supplier.name,
                    name: supplier.name
                }
            })
        })
    // fetch supplier api

    ///
    /////////// STATES
    ///
    ///
    /////////// VARIABLES
    ///

    const GoldFirstFormInitValues: GoldFirstFormInitValues_TP = {
        twred_type: formValues?.twred_type || 'local',
        bond_date: formValues?.bond_date || getDayBefore(new Date()),
        employee_id:formValues?.employee_id || '',
        supplier_id: formValues?.supplier_id || '',
        employee_value:formValues?.employee_value || '',
        supplier_value:formValues?.supplier_value || '',
        bond_number: formValues?.bond_number || "",
        api_gold_price: formValues?.api_gold_price || "20", // comes from api gold price 
        entity_gold_price: formValues?.entity_gold_price || "" || "20", // should be api gold price value from api if no entered data
        notes: formValues?.notes || "osama",
        out_goods_value: formValues?.out_goods_value || "",
        media: formValues?.media || [],
        goods_media: formValues?.goods_media || [],
    }

    /////////// SIDE EFFECTS
    ///

    /////////// FUNCTIONS | EVENTS | IF CASES
    ///

    ///
    return <>
        <Formik
            onSubmit={(values) => {
                setStage(prev => prev + 1)
                setFormValues(values)
                console.log({ ...values, bond_date: formatDate(values.bond_date) })
            }
            }
            initialValues={GoldFirstFormInitValues}
            //validationSchema={goldValidatingSchema}
        >
            {({ values , setFieldValue }) => (
                <Form>
                    {/* <HandleBackErrors errors={}> */}

                    <OuterFormLayout header={`${t('create gold document')}`} submitComponent={
                        <Button type="submit" className="ms-auto mt-8">
                            {t('submit')}
                        </Button>
                    }>
                        <InnerFormLayout title="main data" leftComponent={
                            <p className="font-bold">
                                `رقم السند/
                                <span className=" text-mainOrange">
                                    {nextBondNumber
                                        ? nextBondNumber
                                        : "تحميل رقم ..."}
                                </span>
                            </p>
                        }>

                            {/* supply type start */}
                            <div className="flex gap-x-2 mt-8 col-span-4">
                                <span className="font-bold" >{t('supply type')}</span>
                                <RadioGroup name="twred_type">
                                    <div className="flex gap-x-2" >
                                        <RadioGroup.RadioButton
                                            value="local"
                                            label={`${t('local')}`}
                                            id="local"
                                        />
                                        <RadioGroup.RadioButton
                                            value="global"
                                            label={`${t('global')}`}
                                            id="global"
                                        />
                                    </div>
                                </RadioGroup>
                            </div>
                            {/* supply type end */}

                            {/* document date start */}
                            <DateInputField
                                label={`${t('document date')}`}
                                name="bond_date"
                                maxDate={new Date()}
                            />
                            {/* document date end */}

                            {/* buyer name name start */}
                            <div className="flex flex-col">
                                <Select
                                    id="employee_id"
                                    label={`${t('buyer name')}`}
                                    name="employee_id"
                                    placeholder={`${t('buyer name')}`}
                                    loadingPlaceholder={`${t('loading')}`}
                                    options={employees}
                                    fieldKey="id"
                                    loading={employeesLoading}
                                    isDisabled={!employeesLoading && !!employeeError}
                                    onChange={(option:any)=>{
                                        setFieldValue('employee_value' ,option!.value )
                                        setFieldValue('employee_id' ,option!.id )
                                    }}
                                    value={{
                                        value: values.employee_value || formValues?.employee_value,
                                        label: values.employee_value || formValues?.employee_value || t('buyer name'),
                                        id: values.employee_id || values.employee_id
                                    }}
                                />
                                <RefetchErrorHandler failureReason={employeeError} isLoading={employeesLoading} refetch={refetchEmployee} />
                            </div>
                            {/* buyer name name end */}

                            {/* supplier name start */}
                            <div className="flex flex-col">
                                <Select
                                    id="supplier_id"
                                    label={`${t('supplier name')}`}
                                    name="supplier_id"
                                    placeholder={`${t('supplier name')}`}
                                    loadingPlaceholder={`${t('loading')}`}
                                    options={suppliers}
                                    fieldKey="id"
                                    loading={suppliersLoading}
                                    isDisabled={!suppliersLoading && !!suppliersErrorReason}
                                    onChange={(option:any)=>{
                                        setFieldValue('supplier_value' ,option!.value)
                                        setFieldValue('supplier_id' ,option!.id)
                                    }}
                                    value={{
                                        value: values.supplier_value || formValues?.supplier_value,
                                        label: values.supplier_value || formValues?.supplier_value  || t('supplier name'),
                                        id: values.supplier_id || values.supplier_id
                                    }}
                                />
                                <RefetchErrorHandler failureReason={suppliersErrorReason} isLoading={suppliersLoading} refetch={refetchSupplier} />
                            </div>
                            {/* supplier name end */}

                            {/* document number start */}
                            <BaseInputField
                                id="bond_number"
                                label={`${t("bond number")}`}
                                name="bond_number"
                                type="text"
                                placeholder={`${t("bond number")}`}
                                required
                            />
                            {/* document number end */}

                            {/* gold price start */}
                            <BaseInputField
                                id="entity_gold_price"
                                label={`${t("gold price")}`}
                                name="entity_gold_price"
                                type="text"
                                placeholder={`${t("gold price")}`}
                                required
                            />
                            {/* gold price end */}

                            {/* outer goods amount start */}
                            {
                                values.twred_type === 'global' &&
                                <BaseInputField
                                    id="out_goods_value"
                                    label={`${t("oute goods amount")}`}
                                    name="out_goods_value"
                                    type="text"
                                    placeholder={`${t("oute goods amount")}`}
                                    required
                                />
                            }
                            {/* outer goods amount end */}
                            <div className="col-span-4 flex justify-between gap-x-4" >
                                {/*doc file start */}
                                <div className="w-1/2" >
                                    <h2>{t('attach supplier document file')}</h2>
                                    <DropFile name="media" />
                                </div>
                                {/*doc file end */}

                                {/*doc goods file start */}
                                {
                                    values.twred_type === 'global' &&
                                    <div className="w-1/2" >
                                        <h2>{t('attach goods document file')}</h2>
                                        <DropFile name="goods_media" />
                                    </div>

                                }
                                {/*doc goods file end */}
                            </div>

                            {/* gold price start */}
                            <div className="col-span-4" >
                                <TextAreaField name="notes" className="col-span-4" rows={3} placeholder="notes" id="notes" label="notes" />
                            </div>
                            {/* gold price end */}
                        </InnerFormLayout>
                    </OuterFormLayout>

                    {/* </HandleBackErrors> */}


                </Form>

            )}

        </Formik>
    </>
}






///////////////////////////////////////////////////////

