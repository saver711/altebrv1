/////////// IMPORTS
///
import { useFormikContext } from "formik"
import { t } from "i18next"
import { useState } from "react"
import { Button } from "../../atoms"
import { EditIcon } from "../../atoms/icons"
import { BaseInputField, DateInputField, InnerFormLayout, Modal, PhoneInput } from "../../molecules"
import RadioGroup from "../../molecules/RadioGroup"
import { DropFile } from "../../molecules/files/DropFile"
import { SelectBranches } from "../reusableComponants/branches/SelectBranches"
import { SelectRole } from "../reusableComponants/roles/SelectRole"
import { SelectNationality } from "../systemEstablishment/SelectNationality"
import { InitialValues_TP } from "./validation-and-types"
///
/////////// Types
///
type EmployeeMainDataProps_TP = {
  title: string
  editEmployeeData: InitialValues_TP | undefined
}
/////////// HELPER VARIABLES & FUNCTIONS
///
///
export const EmployeeMainData = ({ title, editEmployeeData }: EmployeeMainDataProps_TP) => {
  /////////// VARIABLES
  /////

  ///
  /////////// CUSTOM HOOKS
  ///
    const {values} = useFormikContext()
  ///
  /////////// STATES
  ///
  const [modalOpen , setModalOpen] = useState(false)

  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <>
      <InnerFormLayout title={title}>
        {/* name ar start */}
        <BaseInputField
          id="name"
          label={`${t("name")}`}
          name="name"
          type="text"
          placeholder={`${t("name")}`}
          labelProps={{ className: "mb-1" }}
          required
        />
        {/* name ar end */}

        {/* branch start */}
        <SelectBranches name="branch_id" editData={editEmployeeData} />
        {/* branch end */}

        {/* job title start */}

        {/* job title end */}
        <SelectRole name="role_id" />
        {/* address start */}
        <BaseInputField
          id="address"
          label={`${t("address")}`}
          name="address"
          type="text"
          placeholder={`${t("address")}`}
          required
        />
        {/* address end */}

        {/* mobile start */}
        {!!!editEmployeeData && (
          <PhoneInput
            label={`${t("mobile number")}`}
            name="mobile"
            placeholder={`${t("mobile number")}`}
          />
        )}
        {/* mobile end */}

        {/* phone start */}
        <BaseInputField
          id="phone"
          label={`${t("phone number")}`}
          name="phone"
          type="text"
          placeholder={`${t("phone number")}`}
        />
        {/* phone end */}

        {/* nationalities start */}
        <div className="flex flex-col">
          <SelectNationality
            name="nationality_id"
            editData={editEmployeeData}
          />
        </div>
        {/* nationalities end */}

        {/* birth date start */}
        <DateInputField
          label={`${t("birth date")}`}
          name="date_of_birth"
          maxDate={new Date()}
        />
        {/* birth date end */}

        {/* hiring date start */}
        {!!!editEmployeeData && (
          <DateInputField
            label={`${t("hiring date")}`}
            name="date_of_hiring"
            maxDate={new Date()}
          />
        )}

        {/* hiring date end */}

        {/* national_number start */}
        <BaseInputField
          id="national_number"
          label={`${t("national number")}`}
          name="national_number"
          type="text"
          placeholder={`${t("national number")}`}
          required
        />
        {/* national_number end */}

        {/* national_expire_date start */}
        <DateInputField
          label={`${t("national expire date")}`}
          name="national_expire_date"
          minDate={new Date()}
        />
        {/* national_expire_date end */}

        {/* email start */}
        <BaseInputField
          id="email"
          label={`${t("email")}`}
          name="email"
          type="email"
          placeholder={`${t("email")}`}
          required
        />
        {/* email end */}

        {/* username start */}
        <BaseInputField
          id="username"
          label={`${t("username")}`}
          name="username"
          type="text"
          placeholder={`${t("username")}`}
          required
        />
        {/* username end */}

        {/* password start */}
        <div className="flex items-center gap-x-2" >
          <BaseInputField
            id="password"
            label={`${t("password")}`}
            name="password"
            type="password"
            placeholder={ !!editEmployeeData ? "***********" : `${t("password")}`}
            required
            disabled={!!editEmployeeData}
            className={!!editEmployeeData ? "placeholder:font-bold placeholder:text-black placeholder:text-xl" : ''} 
          />
          {
            !!editEmployeeData &&
          <EditIcon action={()=>setModalOpen(true)} />
          }
        </div>
        {/* password end */}

        {/* isActive start */}
        <div className="flex gap-x-2 mt-8">
          <span className="font-bold">{t("is active")}</span>
          <RadioGroup name="is_active">
            <div className="flex gap-x-2">
              <RadioGroup.RadioButton
                value="Yes"
                label={`${t("Yes")}`}
                id="Yes"
              />
              <RadioGroup.RadioButton value="No" label={`${t("No")}`} id="No" />
            </div>
          </RadioGroup>
        </div>
        {/* isActive end */}
        <div className="col-span-2">
          <h2>ارفاق صورة الهوية</h2>
          <DropFile name="national_image" />
        </div>
        <div className="col-span-2">
          <h2>ارفاق الصورة الشخصية</h2>
          <DropFile name="image" />
        </div>
      </InnerFormLayout>
      <Modal isOpen={modalOpen} onClose={()=>setModalOpen(false)}>
      <BaseInputField
            id="password"
            label={`${t("edit password")}`}
            name="password"
            type="password"
            placeholder={`${t("password")}`}
            className="w-1/5"
          />
          {
          values.password.length <=8 &&
          <p className="text-red-700" >{t('at least 8 characters')}</p>
          }
          <Button type="button" action={()=> {
            if(values.password.length >=8)
            setModalOpen(false)
          } } className="flex mr-auto mt-8" >
            {t('submit')}
          </Button>
      </Modal>
    </>
  )
}
