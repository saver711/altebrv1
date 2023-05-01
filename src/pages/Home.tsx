/////////// IMPORTS
///
//import classes from './Home.module.css'
import { Form, Formik } from "formik"
import { Helmet } from "react-helmet-async"
import * as Yup from "yup"
import { Button } from "../components/atoms/buttons/Button"
import { SelectCategorySize } from "../components/templates/categories-sizes/SelectCategorySize"
import { ExpandableTable } from "./try-osama/ExapndableTable"
import { tableData } from "./try-osama/TabelData"

///
/////////// Types
///
type HomeProps_TP = {
  title: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///
const validatingSchema = Yup.object({
    category_id: Yup.string().trim().required(),
    size_type: Yup.string()
      .trim()
      .when("sizeIsRequired", {
        is: (val: boolean) => val === true,
        then: (schema) => schema.required(),
      }),
    size_unit_id: Yup.string()
      .trim()
      .when("sizeIsRequired", {
        is: (val: boolean) => val === true,
        then: (schema) => schema.required(),
      }),
  })
///
export const Home = ({ title }: HomeProps_TP) => {
  /////////// VARIABLES
  ///
  const initValues = {
    category_id: "",
    size_type: "",
    size_unit_id: "",
  }

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
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///

  
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <h1 className="text-4xl font-bold">Home</h1>
        <Formik
          initialValues={initValues}
          onSubmit={(values) => {
            console.log("SUBMIT VALUES =>>>", values)
          }}
          validationSchema={validatingSchema}
        >
          {({ errors }) => (
            <Form>
              {/* <SelectCategory name="category_id" /> */}
              <SelectCategorySize
                // initialCategory={{
                //   id: 3,
                //   name: "خاتم",
                //   has_size: 1,
                //   has_selsal: 0,
                //   type: "single",
                //   selling_type: "part",
                //   sizes: [
                //     {
                //       id: 3,
                //       type: "عربي",
                //       start: 30,
                //       end: 60,
                //       increase: 2,
                //       category_name: "خاتم",
                //       units: [
                //         {
                //           id: 28,
                //           value: "30",
                //           size_id: 3,
                //         },
                //         {
                //           id: 29,
                //           value: "32",
                //           size_id: 3,
                //         },
                //         {
                //           id: 30,
                //           value: "34",
                //           size_id: 3,
                //         },
                //         {
                //           id: 31,
                //           value: "36",
                //           size_id: 3,
                //         },
                //         {
                //           id: 32,
                //           value: "38",
                //           size_id: 3,
                //         },
                //         {
                //           id: 33,
                //           value: "40",
                //           size_id: 3,
                //         },
                //         {
                //           id: 34,
                //           value: "42",
                //           size_id: 3,
                //         },
                //         {
                //           id: 35,
                //           value: "44",
                //           size_id: 3,
                //         },
                //         {
                //           id: 36,
                //           value: "46",
                //           size_id: 3,
                //         },
                //         {
                //           id: 37,
                //           value: "48",
                //           size_id: 3,
                //         },
                //         {
                //           id: 38,
                //           value: "50",
                //           size_id: 3,
                //         },
                //         {
                //           id: 39,
                //           value: "52",
                //           size_id: 3,
                //         },
                //         {
                //           id: 40,
                //           value: "54",
                //           size_id: 3,
                //         },
                //         {
                //           id: 41,
                //           value: "56",
                //           size_id: 3,
                //         },
                //         {
                //           id: 42,
                //           value: "58",
                //           size_id: 3,
                //         },
                //         {
                //           id: 43,
                //           value: "60",
                //           size_id: 3,
                //         },
                //       ],
                //     },
                //   ],
                // }}
                categoryName="category_id"
                sizeTypeName="size_type"
                theSizeName="size_unit_id"
              />

              {/* <SelectCategoryAndSize
                categorySelectName="category_id"
                sizeTypeSelectName="size_type"
                sizeNumberSelectName="sizeNumber_id"
                setValidateYupTypeAndCategory={setValidateYupTypeAndCategory}
              /> */}
              <ExpandableTable tableData={tableData}/>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
