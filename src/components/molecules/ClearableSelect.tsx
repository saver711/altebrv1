/////////// IMPORTS
///
//import classes from './ClearableSelect.module.css'
///
/////////// Types
///

import { AiOutlineClose } from "react-icons/ai"
import { useFetch } from "../../hooks"
import { Button } from "../atoms"
import { Country_city_distract_markets } from "../templates/reusableComponants/Country_city_distract_markets"
import { Select } from "./formik-fields"

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const ClearableSelect = () => {
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
  const {
    data: countriesOptions,
    isLoading: countriesLoading,
    failureReason,
    refetch,
  } = useFetch({
    queryKey: ["countries"],
    endpoint: "governorate/api/v1/countries",
    select: (data) =>
      data.map((country) => ({
        ...country,
        id: country.id,
        value: country.name,
        label: country.name,
      })),
  })
  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  return (
    <div className="relative">
      <Select
        id={"countryName"}
        label={"label"}
        name={"countryName"}
        placeholder={"label"}
        options={countriesOptions}
      />
      <Button className=" bg-transparent border-none text-gray-300  absolute top-1/2 left-3">
        <AiOutlineClose className=" fill-mainRed" />
      </Button>
    </div>
  )
}
