/////////// IMPORTS
///
//import classes from './Operation.module.css'
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { Modal } from "../../components/molecules"
import { ShowButton } from "../../components/molecules/ViewButton"
import { Loading } from "../../components/organisms/Loading"
import { OperationDetails } from "../../components/templates/systemEstablishment/operation/OperationDetails"
import { useFetch } from "../../hooks"
///
/////////// Types
///
type Operation_Props_TP = {
  title: string
}
type Operation__TP = {
  description: string
  front_key: string
  id: number | null
  name: string
}

/////////// HELPER VARIABLES & FUNCTIONS
///
///
export const Operation = ({ title }: Operation_Props_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const {
    data: operations,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useFetch<Operation__TP[]>({
    queryKey: ["operations"],
    endpoint: `/accounting/api/v1/operations`,
  })
  ///
  /////////// STATES
  ///
  const [operationId, setOperationId] = useState<number | null>(null)
  ///
  /////////// SIDE EFFECTS
  ///
  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isError && (
        <div className="mb-5 pr-5">
          <h1 className="text-center text-2xl font-bold">{error.message} </h1>
        </div>
      )}
      {isLoading && <Loading mainTitle="العمليات" subTitle="جاري التحميل" />}
      {isSuccess && (
        <div className="p-4">
          <div className="mb-5 pr-5">
            <h1 className="text-2xl font-bold">العمليات</h1>
          </div>
          <div className="grid grid-cols-4 gap-4 gap-y-6">
            {operations?.map((operation) => {
              return (
                <>
                  <div className="col-span-1 w-full" key={operation.id}>
                    <ShowButton
                      action={() => {
                        setOperationId(operation.id)
                      }}
                      viewLabel={operation.name}
                      variant="secondary"
                    />
                  </div>
                </>
              )
            })}
          </div>
          <Modal
            isOpen={!!operationId}
            onClose={() => {
              setOperationId(null)
            }}
          >
            <OperationDetails operationId={operationId} />
          </Modal>
        </div>
      )}
    </>
  )
}
