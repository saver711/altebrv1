/////////// IMPORTS
///
import { useEffect, useRef } from "react"
import { Helmet } from "react-helmet-async"
///
/////////// Types
///
type CodingProps_TP = {
  title: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Coding = ({ title }: CodingProps_TP) => {
    const link = useRef(null)
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
  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
    useEffect(() => {
        link.current.click()
    }, [])
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <a
        href="https://alexon.altebr.jewelry/identity/admin/identities"
        ref={link}
      ></a>
    </>
  )
}
