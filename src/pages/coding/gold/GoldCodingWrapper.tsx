/////////// IMPORTS
///
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { Button } from "../../../components/atoms"
import { useLocalStorage, useMutate } from "../../../hooks"
import { CError_TP } from "../../../types"
import { mutateData } from "../../../utils/mutateData"
import { notify } from "../../../utils/toast"
import { GoldCodingSanad_initialValues_TP } from "../coding-types-and-helpers"
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
  const [addedPiecesLocal, setAddedPiecesLocal] = useLocalStorage<
    GoldCodingSanad_initialValues_TP[]
  >(`addedPiecesLocal_${sanadId}`)
  ///
  /////////// CUSTOM HOOKS
  ///
  const [addedPieces, setAddedPieces] = useState<
    GoldCodingSanad_initialValues_TP[]
  >(addedPiecesLocal || [])

  const { mutate, error, mutateAsync, isLoading } =
    useMutate<GoldCodingSanad_initialValues_TP>({
      mutationFn: mutateData,
    })

  ///
  /////////// STATES
  ///

  console.log(`GoldCodingWrapper ~ addedPieces:`, addedPieces)

  const [stage, setStage] = useState(1)
  ///
  /////////// SIDE EFFECTS
  ///

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
    if(error.response.data.message){
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
          stage={stage}
          setStage={setStage}
          addedPieces={addedPieces}
          setAddedPieces={setAddedPieces}
        />
      )}
      {stage === 2 && (
        <>
          <p>Second screen</p>
          {!!addedPieces.length && (
            <Button loading={isLoading} action={()=> sendPieces(addedPieces)}>
              إرسال القطع
            </Button>
          )}

          <Button action={() => setStage(1)}>رجوع</Button>
        </>
      )}
    </>
  )
}
