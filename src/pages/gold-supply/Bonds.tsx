import { Helmet } from "react-helmet-async"

type BondsProps_TP = {
  title: string
}

export const Bonds = ({ title }: BondsProps_TP) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div>Bonds</div>
    </>
  )
}
