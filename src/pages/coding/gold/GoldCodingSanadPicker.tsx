import { Form, Formik } from 'formik'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/atoms'
import { Header } from '../../../components/atoms/Header'
import { BaseInputField, DateInputField } from '../../../components/molecules'
import NinjaTable from '../../../components/molecules/NinjaTable'
import RadioGroup from '../../../components/molecules/RadioGroup'
import { Column } from '../../../components/molecules/table/types'
import { Loading } from '../../../components/organisms/Loading'
import { useFetch, useIsRTL } from '../../../hooks'
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
  const isRTL = useIsRTL()
  const navigate = useNavigate()
  const [activeBond, setActiveBond] = useState<GoldSanad_TP | undefined>()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState<number>(1)
  const [dataSource, setDataSource] = useState<GoldSanad_TP[]>([])

  const searchValues: SearchValues_TP = {
    id: '',
    bond_number: '',
    bond_date: null,
    total_weight: '',
  }

  const columns: Column[] = [
    {
      name: "index",
      label: t('Sequence '),
    },
    {
      name: "id",
      label: t('bond number'),
    },
    {
      name: "classification",
      label: t('classification'),
    },
    {
      name: "supplier_name",
      label: t('supplier name'),
    },
    {
      name: "bond_date",
      label: t('bond date'),
    },
    {
      name: "total_gold_by_24",
      label: t('total gold by 24'),
    },
    {
      name: "total_money",
      label: t('total money'),
    },
    {
      name: "item_count",
      label: t('item count'),
    },
    {
      name: "bond_number",
      label: t('attachment number'),
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
    ? `tarqimGold/api/v1/open-bonds?page=${page}`
    : `${search}`,
    queryKey: ["goldCodingSanads"],
    pagination: true,
    onSuccess: (data) => {
      // console.log(data.data)
      setDataSource(data.data)
      // setActiveBond(data.data[0].id)
    },
    select(data) {
      return {
        ...data,
        data: data.data.map((item, i) => ({
          ...item,
          index: i + 1,
        })),
      }
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
    let uri = `tarqimGold/api/v1/open-bonds?page=${page}`
    let first = false
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
  }, [page])

  useEffect(() => {
    if (page == 1) {
      refetch()
    } else {
      setPage(1)
    }
  }, [search])

  useEffect(() => {
    if (dataSource.length) {
      setActiveBond(dataSource[0])
    }
  }, [dataSource])

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg bg-opacity-50 mb-5">
        <div className="flex flex-col">
          <Header header={`${t('gold coding')}`} className="text-lg mb-5" />
          <div className="flex items-center gap-4 rounded-lg mb-5">
            <h3>{t('coding from')}</h3>
            <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
              <Form>
                <RadioGroup name="sanad_type">
                  <RadioGroup.RadioButton
                    value="tawrid"
                    label={`${t('supply bond')}`}
                    id="tawrid"
                  />
                  <RadioGroup.RadioButton
                    value="talme3"
                    label={`${t('polishing bond')}`}
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
                label={`${t('bond number')}`}
                placeholder={`${t('bond number')}`}
                className="shadow-xs"
                type="text"
              />
              <DateInputField
                label={`${t('bond date')}`}
                placeholder={`${t('bond date')}`}
                name="bond_date"
                labelProps={{ className: "mt--10" }}
              />
              <BaseInputField 
                label={`${t('total gold by 24')}`}
                id="total_gold_by_24"
                name="total_gold_by_24"
                placeholder={`${t('total gold by 24')}`}
                className="shadow-xs"
                type="text"
              />    
              <BaseInputField 
                label={`${t('attachment number')}`}
                id="bond_number"
                name="bond_number"
                placeholder={`${t('attachment number')}`}
                className="shadow-xs"
                type="text"
              />
              <Button type="submit" disabled={isRefetching} className="flex h-[40px] mt-7" bordered>
                {t('search')}
              </Button>
            </div>
          </Form>
        </Formik>
        {(isLoading || isRefetching) && (
          <Loading mainTitle={t("loading bonds")} />
        )}
        {isSuccess &&
          !!dataSource &&
          !isLoading &&
          !isRefetching &&
          !!activeBond &&
          !!dataSource.length && (
          <div className=" flex flex-col gap-1">
            <Header header={`${t('choose gold bond supply')}`} className="mb-3 text-lg" />
            <div className="GlobalTable">
              <NinjaTable<GoldSanad_TP>
                data={dataSource}
                columns={columns}
                selection="single"
                selected={activeBond}
                // @ts-ignore
                setSelected={setActiveBond}
                creatable={false}
                />
                <div className="mt-3 flex items-center justify-end gap-5 p-2">
                  <div className="flex items-center gap-2 font-bold">
                    {t('page')}
                    <span className=" text-mainGreen">
                      {data.current_page}
                    </span>
                    {t('from')}
                    <span className=" text-mainGreen">{data.pages}</span>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <Button
                      className=" rounded bg-mainGreen p-[.18rem] "
                      action={() => setPage((prev) => prev - 1)}
                      disabled={page == 1}
                    >
                      {isRTL ? <MdKeyboardArrowRight className="h-4 w-4 fill-white" /> : <MdKeyboardArrowLeft className="h-4 w-4 fill-white" />}
                    </Button>
                    <Button
                      className=" rounded bg-mainGreen p-[.18rem] "
                      action={() => setPage((prev) => prev + 1)}
                      disabled={page == data.pages}
                    >
                      {isRTL ? <MdKeyboardArrowLeft className="h-4 w-4 fill-white" /> : <MdKeyboardArrowRight className="h-4 w-4 fill-white" />}
                    </Button>
                  </div>
                </div>
            </div>
          </div>
        )}
      </div>
      {isSuccess && !!!dataSource && !isLoading && !isRefetching && !!dataSource.length && (
      <div className="mb-5 pr-5">
        <Header
          header={t('no items')}
          className="text-center text-2xl font-bold"
        />
      </div>
      )}
      <div className="flex items-end justify-end gap-5">
        <Button 
          type="button"
          action={() => forward()}
        >
          {t("next")}
        </Button>
      </div>
    </>
  )
}
