/////////// IMPORTS
///
import { t } from "i18next"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { Button } from "../../../components/atoms"
import { Modal } from "../../../components/molecules"
import { useLocalStorage, useMutate } from "../../../hooks"
import { CError_TP } from "../../../types"
import { mutateData } from "../../../utils/mutateData"
import { notify } from "../../../utils/toast"
import { ExpandableTable } from "../../try-osama/ExapndableTable"
import { GoldCodingSanad_initialValues_TP, GoldSanad_TP } from "../coding-types-and-helpers"
import { CodingSanad } from "./CodingSanad"
///
/////////// Types
///
type GoldCodingWrapperProps_TP = {
  title: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const GoldCodingWrapper = ({ title }: GoldCodingWrapperProps_TP) => {
  /////////// VARIABLES
  ///
  const { sanadId } = useParams()
  const [selectedSanadLocal, setSelectedSanadLocal] =
  useLocalStorage<GoldSanad_TP>(`selectedSanadLocal_${sanadId}`)

  const [addedPiecesLocal, setAddedPiecesLocal] = useLocalStorage<
  GoldCodingSanad_initialValues_TP[]
  >(`addedPiecesLocal_${sanadId}`)
  const [openModal, setOpenModal] = useState(false)
  ///
  /////////// CUSTOM HOOKS
  ///
  const [addedPieces, setAddedPieces] = useState<
  GoldCodingSanad_initialValues_TP[]
  >(addedPiecesLocal || [])


  const { mutate, error, mutateAsync, isLoading } =
    useMutate<GoldCodingSanad_initialValues_TP>({
      mutationFn: mutateData,
      onSuccess:()=>{
        setOpenModal(true)
      }
    })
    useEffect(() => {
      if(addedPiecesLocal?.length)
      notify('info',`${t('there are items already existed you can save it')}`)
    }, [])
    

  ///
  /////////// STATES
  ///
const [selectedSanad, setSelectedSanad] = useState<GoldSanad_TP | undefined>(
  selectedSanadLocal
)
  const [stage, setStage] = useState(1)
  ///
  /////////// SIDE EFFECTS

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  const sendPieces = async (pieces: GoldCodingSanad_initialValues_TP[]) => {
    if (pieces.length === 0) {
      return;
    }

    const [piece, ...remainingPieces] = pieces;

    try {
      const result = await mutateAsync({
        endpointName: "tarqimGold/api/v1/tarqim_gold",
        dataType: "formData",
        values: piece,
      });

      if (result) {
        const filteredPieces = remainingPieces.filter(
          (p) => p.front_key !== result.front_key
        );
        setAddedPieces(filteredPieces);
        setAddedPiecesLocal(filteredPieces);
      }
    } catch (err) {
      const error = err as CError_TP
      if (error.response.data.message) {
        notify("error", error.response.data.message)
      }

    }

    await sendPieces(remainingPieces);
  };
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {stage === 1 && (
        <CodingSanad
          selectedSanad={selectedSanad}
          setSelectedSanad={setSelectedSanad}
          stage={stage}
          setStage={setStage}
          addedPieces={addedPieces}
          setAddedPieces={setAddedPieces}
        />
      )}
      {stage === 2 && !!addedPieces.length && (
        <div className="flex flex-col mx-auto relative">
          <ExpandableTable
            setSelectedSanad={setSelectedSanad}
            setAddedPieces={setAddedPieces}
            addedPieces={addedPieces}
            showDetails={true}
          />
          <div className=" flex item-center gap-x-2 mr-auto">
            <Button action={() => setStage(1)} bordered>
              رجوع
            </Button>
            <Button loading={isLoading} action={() => sendPieces(addedPieces)}>
              ارسال
            </Button>
          </div>
        </div>
      )}
      {stage === 2 && !!!addedPieces.length && (
        <div className="flex justify-between mx-auto relative">
          <h2 className="text-mainGreen text-xl">لا يوجد قطع مرقمة</h2>
          <Button action={() => setStage(1)} bordered>
            رجوع
          </Button>
        </div>
      )}
      <Modal isOpen={openModal} onClose={()=>setOpenModal(false)}>
        <div className="flex gap-x-2 p-16 justify-center items-center" >
          <Button type="button" action={()=>{
            setOpenModal(false)
            setStage(1)
          }} bordered>
              {t('back to digitization page')}
          </Button>

          <Button type="button"  action={()=>{
            setOpenModal(false)
          }}  >
              <a href='https://alexon.altebr.jewelry/identity/admin/identities' target="_blank">{t('go to identification management')}</a>
          </Button>
        </div>
      </Modal>
    </>
  )
}