/////////// IMPORTS
///
import { useState } from "react"
import { Helmet } from "react-helmet-async"
// import { SecondForm } from "../../components/contracts/SecondForm"
// import { ContractFinalScreen } from "../../components/contracts/ContractFinalScreen"
// import {
//   DeleteImageHandler_TP,
//   FormValues_TP,
//   MediaTypes_TP,
//   Row_TP,
// } from "../../types"
import { t } from "i18next"
import { useNavigate } from "react-router-dom"
import { BoxesTypes, GoldSupplySecondForm, OTableDataTypes } from "../../components/gold-supply/GoldSupplySecondForm"
import { GoldSupplyFinalForm } from "../../components/gold-supply/GoldSupplyFinalForm"
import { GoldSupplyFirstForm } from "../../components/gold-supply/GoldSupplyFirstForm"
import { GoldFirstFormInitValues_TP } from "../../components/gold-supply/formInitialValues_types"
import { Loading } from "../../components/organisms/Loading"
import { useFetch } from "../../hooks/useFetch"
import { Back } from "../../utils/utils-components/Back"

/////////// HELPER VARIABLES & FUNCTIONS
///

/////////// TYPES
///
type GoldSupplyProps_TP = {
    title: string
    }

export type FinalData_TP = {
  table: OTableDataTypes[]
  boxes: BoxesTypes
}
///
export const GoldSupply = ({ title }: GoldSupplyProps_TP) => {
  /////////// VARIABLES
  ///
  //////////// CUSTOM HOCKS
  ///
  // get checkOperations
  const {
    data: checkOperations,
    isLoading: checkOperationsLoading,
    refetch: checkOperationsTitles,
    failureReason: checkOperationsErrorReason,
  } = useFetch<{ status: "" }>({
    endpoint: "twredGold/api/v1/check-operations",
    queryKey: ["checkOperations"],
  })


  const { data: nextBondNumber, isLoading: isLoadingNextBondNumber } = useFetch<{
    supply_bond_number: string
  }>({
    queryKey: ["nextBondNumber"],
    endpoint: "/twredGold/api/v1/nextbond",
  })

  const navigate = useNavigate()

  ///
  /////////// STATES
  ///
  const [stage, setStage] = useState(1)
  const [formValues, setFormValues] = useState<GoldFirstFormInitValues_TP>()
  const [finalData, setFinalData] = useState<FinalData_TP>()
  const [data, setData] = useState<OTableDataTypes[]>([])
  const [boxValues, setBoxValues] = useState<OTableDataTypes[]>([])
  const [editData, setEditData] = useState<OTableDataTypes>({} as OTableDataTypes)
  /////////// SIDE EFFECTS

  /////////// IF CASES

  /////////// EVENTS

  /////////// FUNCTIONS

  ///
  if (checkOperationsLoading) return <Loading mainTitle={`${t('loading')}`} subTitle={`${t('checking accounts operations')}`} />

  //  should be (!checkOperations?.status) ↓↓↓
  if (!checkOperations?.status) return <div className="h-screen flex justify-center items-center  bg-flatWhite " >
    <h2 className="font-bold text-2xl p-8 rounded-lg bg-mainGreen text-white cursor-pointer" onClick={() => navigate('/testSystem')}>
      {t(`please complete accounts operations first click to complete the operation`)}
    </h2>
  </div>

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {stage !== 3 && (
        <div className="mb-0 px-5 flex justify-between">
          <h1 className="text-2xl font-bold">{`${t('create gold bond')}`}</h1>
          <div>
            <Back />
          </div>
        </div>
      )}

      {stage === 1 && (
        <GoldSupplyFirstForm
          nextBondNumber={nextBondNumber?.supply_bond_number}
          formValues={formValues}
          setFormValues={setFormValues}
          setStage={setStage}
        />
      )}
      {stage === 2 && (
        <GoldSupplySecondForm 
          formValues={formValues} 
          setStage={setStage} 
          setFormValues={setFormValues} 
          setFinalData={setFinalData} 
          data={data}
          setData={setData}
          boxValues={boxValues}
          setBoxValues={setBoxValues}
          editData={editData}
          setEditData={setEditData}
        />
      )}
      {stage === 3 && (
        <GoldSupplyFinalForm 
          formValues={formValues} 
          setStage={setStage} 
          setFormValues={setFormValues} 
          finalData={finalData} 
        />
      )}
    </>
  )
}
