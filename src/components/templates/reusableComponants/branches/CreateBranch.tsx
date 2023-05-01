/////////// IMPORTS
///
import { useQueryClient } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { t } from "i18next"
import { useState } from "react"
import * as Yup from "yup"
import { NationalAddress } from "../.."
import { useMutate } from "../../../../hooks"
import { mutateData } from "../../../../utils/mutateData"
import { notify } from "../../../../utils/toast"
import { Button } from "../../../atoms"
import { PhoneInput } from "../../../molecules"
import { BaseInputField } from "../../../molecules/formik-fields/BaseInputField"
import { Country_city_distract_markets } from "../Country_city_distract_markets"
///
/////////// Types
///
type CreateBranchProps_TP = {
    value: string
    onAdd: (value: string) => void
}

type InitialValues_TP = {
    [x: string]: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const CreateBranch = ({
    value,
    onAdd
}: CreateBranchProps_TP) => {
    /////////// VARIABLES
    ///
    const initialValues: InitialValues_TP = {
        name_ar: "",
        name_en: "",
        market_id: "",
        city_id: "",
        district_id: "",
        market_number: "",
        phone: "",
        fax: "",
        building_number: "",
        street_number: "",
        sub_number: "",
        address: "",
        number: "",
        zip_code: "",
    }
    const validationSchema = Yup.object({
        name_ar: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        name_en: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        market_id: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        city_id: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        district_id: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        market_number: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        phone: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        fax: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        building_number: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        street_number: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        sub_number: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        address: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        number: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
        zip_code: Yup.string().trim().required('برجاء ملئ هذا الحقل'),
    })


    /////////// STATES
    ///
    ///
    /////////// CUSTOM HOOKS
    ///
    const queryClient = useQueryClient();
    const {
        mutate,
        error: errorQuery,
    } = useMutate({
        mutationFn: mutateData,
        onSuccess: (data) => {
            notify("success")
            queryClient.setQueryData(['branches'], (old: any) => {
                return [...old, data]
            })
            onAdd(value)
        },
        onError: (error) => {
            notify("error")
        }
    })
    /////////// SIDE EFFECTS
    ///

    /////////// FUNCTIONS | EVENTS | IF CASES
    ///

    function PostNewValue(values: InitialValues_TP) {

        mutate({
            endpointName: "branch/api/v1/branches",
            values
        })
    }
    ///
    return (
        <div className="flex items-center justify-between gap-2">
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    PostNewValue(values)
                }
                }
                validationSchema={validationSchema}
            >
                <Form className="w-full">
                    <div className="flex flex-col gap-y-8" >

                        <div className="grid-cols-4 items-center grid gap-x-4">
                            {/* branch ar  start */}
                            <div className="col-sapn-1" >
                                <BaseInputField
                                    id="name_ar"
                                    label={`${t("branch in arabic")}`}
                                    name="name_ar"
                                    type="text"
                                    placeholder={`${t("branch in arabic")}`}
                                />
                            </div>
                            {/* branch ar  end */}

                            {/* branch en  start */}
                            <div className="col-sapn-1" >
                                <BaseInputField
                                    id="name_en"
                                    label={`${t("branch in english")}`}
                                    name="name_en"
                                    type="text"
                                    placeholder={`${t("branch in english")}`}
                                />
                            </div>
                            {/* branch en  end */}

                            {/* branch number  start */}
                            <div className="col-sapn-1" >
                                <BaseInputField
                                    id="number"
                                    label={`${t("branch number")}`}
                                    name="number"
                                    type="text"
                                    placeholder={`${t("branch number")}`}
                                />
                            </div>
                            {/* branch number  end */}

                            {/* market  start */}
                            <Country_city_distract_markets cityFieldKey="value"
                                cityLabel={`${t('city')}`}
                                cityName="city_branch_value"
                                countryFieldKey='value'
                                countryLabel={`${t('country')}`}
                                countryName="country_branch_value"
                                distractFieldKey="value"
                                distractLabel={`${t('district')}`}
                                distractName="district_branch_value"
                                marketFieldKey='id'
                                marketLabel={`${t('market')}`}
                                marketName="market_id"
                            />
                            {/* market  end */}

                            {/* market number start */}
                            <div className="col-sapn-1" >
                                <BaseInputField
                                    id="market_number"
                                    label={`${t("market number")}`}
                                    name="market_number"
                                    type="number"
                                    placeholder={`${t("market number")}`}
                                />
                            </div>
                            {/* market number  end */}

                            {/* address start */}
                            <div className="col-sapn-1" >
                                <BaseInputField
                                    id="address"
                                    label={`${t("address")}`}
                                    name="address"
                                    type="text"
                                    placeholder={`${t("address")}`}
                                />
                            </div>
                            {/* address  end */}

                            {/* phone start */}
                            <div className="col-sapn-1" >
                                <BaseInputField
                                    id="phone"
                                    label={`${t("phone")}`}
                                    name="phone"
                                    type="text"
                                    placeholder={`${t("phone")}`}
                                />
                            </div>
                            {/* phone end */}

                            {/* fax start */}
                            <div className="col-sapn-1" >
                                <BaseInputField
                                    id="fax"
                                    label={`${t("fax")}`}
                                    name="fax"
                                    type="text"
                                    placeholder={`${t("fax")}`}
                                />
                            </div>
                            {/* fax end */}

                        </div>

                        <div>
                            <NationalAddress />
                        </div>

                    </div>
                    <Button
                        type="submit"
                        className="mr-auto"
                    >
                        {t('submit')}
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}