/////////// IMPORTS
///
import { t } from "i18next"
import { formatDate } from "../../../../utils/date"
import { pdfOrImage } from "../../../../utils/helpers"
import { FilesPreview } from "../../../molecules/files/FilesPreview"
import { allDocs_TP } from "./Documents"
///
/////////// Types
///
type DocsDataProps_TP = {
  docsData: allDocs_TP | undefined
}

/////////// HELPER VARIABLES & FUNCTIONS
///
///
export const DocsData = ({ docsData }: DocsDataProps_TP) => {
  console.log("🚀 ~ file: DocsData.tsx:21 ~ DocsData:", docsData)

  const checkType = () => {
    if (docsData?.files.type === "pdf") {
      return "pdf"
    } else {
      return "image"
    }
  }

  let images: any = docsData?.files.filter(
    (file: any) => pdfOrImage(file) === checkType()
  )
  console.log("🚀 ~ file: DocsData.tsx:36 ~ DocsData ~ images:", images)

  let pdfs: any = docsData?.files.filter(
    (file: any) => pdfOrImage(file) === checkType()
  )

  /////////// VARIABLES
  ///
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  ///
  return (
    <>
      <h2 className="text-xl font-bold text-center mb-5">
        {t("document Details")}
      </h2>
      <div className="grid grid-cols-3 gap-y-8 items-center justify-center">
        {/* document type start */}
        <div className="col-span-1">
          <div className="flex gap-x-2">
            <span className="font-bold">{t("document type")} :</span>
            <span className="font-thin">{docsData?.data?.docType.label}</span>
          </div>
        </div>
        {/* document type end */}

        {/* document name start */}
        <div className="col-span-1">
          <div className="flex gap-x-2">
            <span className="font-bold">{t("document name")} :</span>
            <span className="font-thin">{docsData?.data?.docName}</span>
          </div>
        </div>
        {/* document name end */}

        {/* document number start */}
        <div className="col-span-1">
          <div className="flex gap-x-2">
            <span className="font-bold">{t("document number")} :</span>
            <span className="font-thin">{docsData?.data?.docNumber}</span>
          </div>
        </div>
        {/* document number end */}

        {/* document end date start */}
        <div className="col-span-1">
          <div className="flex gap-x-2">
            <span className="font-bold"> {t("document end date")} :</span>
            <span className="font-thin">{docsData!?.data?.endDate}</span>
          </div>
        </div>
        {/* document end date end */}

        {/* document days count start */}
        <div className="col-span-1">
          <div className="flex gap-x-2">
            <span className="font-bold">{t("reminder days count")} :</span>
            <span className="font-thin">{docsData?.data?.reminder}</span>
          </div>
        </div>
        {/* document days count end */}

        {/* media start */}
        <div className="col-span-1 flex items-center">
          <span className="font-bold">{t("media")} :</span>
          <FilesPreview preview images={images} pdfs={pdfs} />
        </div>
        {/* media end */}
      </div>
    </>
  )
}
