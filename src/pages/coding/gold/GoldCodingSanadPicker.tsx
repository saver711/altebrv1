import { Form, Formik } from 'formik'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/atoms'
import { Header } from '../../../components/atoms/Header'
import { BaseInputField, DateInputField } from '../../../components/molecules'
import NinjaTable from '../../../components/molecules/NinjaTable'
import RadioGroup from '../../../components/molecules/RadioGroup'
import { Column } from '../../../components/molecules/table/types'
import { Loading } from '../../../components/organisms/Loading'
import { useFetch } from '../../../hooks'
import { formatDate, getDayBefore } from "../../../utils/date"
import { notify } from '../../../utils/toast'
import { GoldSanad_TP } from '../coding-types-and-helpers'

type InitialValues_TP = {
  sanad_type: 'tawrid' | 'talme3'
}

type SearchValues_TP = {
  id: string
  bond_number: string
  bond_date: Date
  total_weight: string
}

const initialValues: InitialValues_TP = {
  sanad_type: 'tawrid'
}

const searchValues: SearchValues_TP = {
  id: '',
  bond_number: '',
  bond_date: getDayBefore(new Date()),
  total_weight: '',
}

export const GoldCodingSanadPicker = () => {
  const navigate = useNavigate()
  const [activeBond, setActiveBond] = useState<GoldSanad_TP | undefined>()
  const [search, setSearch] = useState('')

  const searchValues: SearchValues_TP = {
    id: '',
    bond_number: '',
    bond_date: getDayBefore(new Date()),
    total_weight: '',
  }

  const columns: Column[] = [
    {
      name: "id",
      label: "رقم السند",
    },
    {
      name: "classification",
      label: "الفئة",
    },
    {
      name: "supplier_name",
      label: "اسم المورد",
    },
    {
      name: "bond_date",
      label: "تاريخ السند",
    },
    {
      name: "total_gold_by_24",
      label: "اجمالي ذهب 24",
    },
    {
      name: "total_money",
      label: "اجمالي النقدية",
    },
    {
      name: "item_count",
      label: "العدد",
    },
    {
      name: "bond_number",
      label: "رقم المرفق",
    },
  ]

  const {
    data,
    isLoading,
    isSuccess,
    failureReason,
    refetch,
    isRefetching
  } = useFetch<GoldSanad_TP[]>({
    endpoint: search === '' 
    ? 'tarqimGold/api/v1/open-bonds' 
    : `${search}`,
    queryKey: ["goldCodingSanads"],
    onSuccess: (data) => {
      setActiveBond(data[0])
    },
  })

  const forward = () => {
    if (activeBond) {
      navigate(`${activeBond.id}`)
    } else {
      notify('error', 'يجب اختيار سند')
    }
  }

  const getSearchResults = async (req: any) => {
    let uri = 'tarqimGold/api/v1/open-bonds'
    let first = true
    Object.keys(req).forEach(key => {
      if (req[key] !== '') {
        if (first) {
          uri += `?${key}[eq]=${req[key]}`
          first = false
        } else {
          uri += `&${key}[eq]=${req[key]}`
        }
      }
    })
    setSearch(uri)
  }

  useEffect(() => {
    refetch()
  }, [search])

  return (
    <>
      {!!!isLoading && failureReason && <p>{failureReason.response.data.message}</p>}
      {isLoading && <Loading mainTitle="تحميل السندات" />}
      {!isLoading && data && (
        <>
          <div className="flex flex-col gap-4 rounded-lg bg-opacity-50 mb-5">
            <div className="flex flex-col">
              <Header header="ترقيم الذهب" className="text-lg mb-5" />
              <div className="flex items-center gap-4 rounded-lg mb-5">
                <h3>الترقيم من</h3>
                <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
                  <Form>
                    <RadioGroup name="sanad_type">
                      <RadioGroup.RadioButton
                        value="tawrid"
                        label="سند توريد"
                        id="tawrid"
                      />
                      <RadioGroup.RadioButton
                        value="talme3"
                        label="سند تلميع"
                        id="talme3"
                      />
                    </RadioGroup>
                  </Form>
                </Formik>
              </div>
            </div>
            <Formik initialValues={searchValues} onSubmit={values => {
                getSearchResults({
                  ...values, 
                  bond_date: values.bond_date ? formatDate(values.bond_date) : '',
                })
              }}>
              <Form>
                <div className="flex gap-3">
                  <BaseInputField 
                    id="id"
                    name="id"
                    label="رقم السند"
                    placeholder="رقم السند"
                    className="shadow-xs"
                    type="text"
                  />
                  <DateInputField
                    label="تاريخ التوريد"
                    name="bond_date"
                    labelProps={{ className: "mt--10" }}
                  />
                  <BaseInputField 
                    label="وزن السند"
                    id="total_weight"
                    name="total_weight"
                    placeholder="وزن السند"
                    className="shadow-xs"
                    type="text"
                  />    
                  <BaseInputField 
                    label="رقم المرفق"
                    id="bond_number"
                    name="bond_number"
                    placeholder="رقم المرفق"
                    className="shadow-xs"
                    type="text"
                  />
                  <Button type="submit" loading={isRefetching} className="flex h-[40px] mt-7" bordered>
                    {t('search')}
                  </Button>
                </div>
              </Form>
            </Formik>
            <div className=" flex flex-col gap-1">
              <Header header="قم باختيار سند توريد الذهب" className="mb-3 text-lg" />
              <div className="GlobalTable">
                <NinjaTable<GoldSanad_TP>
                  data={data}
                  columns={columns}
                  selection="single"
                  selected={activeBond}
                  // @ts-ignore
                  setSelected={setActiveBond}
                  creatable={false}
                  />
              </div>
            </div>
          </div>
          {isSuccess && !!!data?.length && (
            <div className="mb-5 pr-5">
              <Header
                header={t(`لا يوجد`)}
                className="text-center text-2xl font-bold"
              />
            </div>
          )}
          <div className="flex items-end justify-end gap-5">
            <Button 
              type="button" 
              className="bg-mainGray border-mainGreen text-mainGreen"
              action={() => navigate('/coding')}
            >
              {t("cancel")}
            </Button>
            <Button 
              type="button"
              action={() => forward()}
            >
              {t("next")}
            </Button>
          </div>
        </>
      )}
    </>
  )
}
