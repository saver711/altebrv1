import * as Yup from "yup"

export type GoldFirstFormInitValues_TP = {
    twred_type: 'global' | 'local'
    bond_date:Date
    employee_id:string
    supplier_id:string
    employee_value:string
    supplier_value:string
    bond_number:string
    api_gold_price:string
    entity_gold_price:string
    notes:string
    out_goods_value:string
    media:any
    goods_media:any
}

export const goldValidatingSchema = Yup.object({
    twred_type: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
    bond_date: Yup.date()
        .max(new Date())
        .required("برجاء ملئ هذا الحقل")
        .typeError("أدخل التاريخ من فضلك"),
        employee_id: Yup.string()
        .trim()
        .required("برجاء ملئ هذا الحقل"),
        supplier_id: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
        bond_number: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
        entity_gold_price: Yup.string().trim().required("برجاء ملئ هذا الحقل").typeError("الأرقام فقط مسموحة"),
        notes: Yup.string().trim().required("برجاء ملئ هذا الحقل"),
        out_goods_value: Yup.string().trim().when('twred_type', {
            is:'global',
            then:(schema)=> schema.trim().required("برجاء ملئ هذا الحقل"),
        }),
       media: Yup.array().required().min(1 ,"برجاء ملئ هذا الحقل" )
})
  