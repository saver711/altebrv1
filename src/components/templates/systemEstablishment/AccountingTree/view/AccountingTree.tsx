import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { Button } from "../../../../atoms"
import Reset from "../../../../atoms/icons/Reset"
import ZoomIn from "../../../../atoms/icons/ZoomIn"
import ZoomOut from "../../../../atoms/icons/ZoomOut"
import AccountingTreeData from "./AccountingTreeData"
import { Back } from "../../../../../utils/utils-components/Back"

const AccountingTree = () => {
  return (
    <div dir="ltr">
      <TransformWrapper disablePadding centerOnInit>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <div className="flex justify-between mb-5">
              <div>
                <Back />
              </div>
              <div className="flex  gap-2">
                <Button className="bg-mainOrange" action={() => zoomIn()}>
                  <ZoomIn />
                </Button>
                <Button
                  className="bg-mainOrange"
                  action={() => resetTransform()}
                >
                  <Reset />
                </Button>
                <Button className="bg-mainOrange" action={() => zoomOut()}>
                  <ZoomOut />
                </Button>
              </div>
            </div>
            <TransformComponent wrapperStyle={{ width: "100%" }}>
              <AccountingTreeData />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  )
}

export default AccountingTree