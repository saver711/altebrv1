/////////// IMPORTS
///
//import classes from './UploadSvg.module.css'
///
/////////// Types
///
type UploadSvg_TP = {
  stroke: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const UploadSvg = ({ stroke }: UploadSvg_TP) => {
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
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 17V11M9 11L7 13M9 11L11 13"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )
}
