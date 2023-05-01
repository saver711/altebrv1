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
      onSuccess: (data) => {
        notify("success")
        console.log(`GoldCodingWrapper ~ data:`, data)
        if(data){
          const filteredPieces = addedPieces.filter((piece) => {
            console.log(`filteredPieces ~ data:`, data.front_key)
            console.log(`filteredPieces ~ piece:`, piece.front_key)
            return piece.front_key !== data.front_key
          })
          setAddedPieces(filteredPieces)
          setAddedPiecesLocal(filteredPieces)
        }
      },
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
  const sendPieces = () => {
    try {
      addedPieces.map(async (piece) => {
        console.log(">>>")

        mutate({
          endpointName: "tarqimGold/api/v1/tarqim_gold",
          dataType: "formData",
          values: piece,
        })
        console.log("<<<")

        // if (data) {
        //   const filteredPieces = addedPieces.filter(
        //     (piece) => piece.front_key !== data.front_key
        //   )
        //   setAddedPieces(filteredPieces)
        //   setAddedPiecesLocal(filteredPieces)
        // }
      })
    } catch (err) {
      console.log(`addedPieces.map ~ send pieces err:`, err)
    }
  }
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
            <Button loading={isLoading} action={sendPieces}>
              إرسال القطع
            </Button>
          )}

          <Button action={() => setStage(1)}>رجوع</Button>
        </>
      )}
    </>
  )
}
