/////////// IMPORTS
///
//import classes from './Home.module.css'
import { Form, Formik } from "formik";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Button } from "../components/atoms/buttons/Button";
import { BiSearchAlt } from "react-icons/bi";
import { DateInputField } from "../components/molecules";
import { t } from "i18next";
import { BoxesDataBase } from "../components/atoms/card/BoxesDataBase";

///
/////////// Types
///
type HomeProps_TP = {
  title: string;
};
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
});
///
export const Home = ({ title }: HomeProps_TP) => {
  /////////// VARIABLES
  ///
  const initValues = {
    category_id: "",
    size_type: "",
    size_unit_id: "",
  };

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
      {/* <div className="flex flex-col items-center justify-center h-screen gap-3">
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
              <SelectCategory name="category_id" />
              <SelectCategorySize
                initialCategory={{
                  id: 3,
                  name: "خاتم",
                  has_size: 1,
                  has_selsal: 0,
                  type: "single",
                  selling_type: "part",
                  sizes: [
                    {
                      id: 3,
                      type: "عربي",
                      start: 30,
                      end: 60,
                      increase: 2,
                      category_name: "خاتم",
                      units: [
                        {
                          id: 28,
                          value: "30",
                          size_id: 3,
                        },
                        {
                          id: 29,
                          value: "32",
                          size_id: 3,
                        },
                        {
                          id: 30,
                          value: "34",
                          size_id: 3,
                        },
                        {
                          id: 31,
                          value: "36",
                          size_id: 3,
                        },
                        {
                          id: 32,
                          value: "38",
                          size_id: 3,
                        },
                        {
                          id: 33,
                          value: "40",
                          size_id: 3,
                        },
                        {
                          id: 34,
                          value: "42",
                          size_id: 3,
                        },
                        {
                          id: 35,
                          value: "44",
                          size_id: 3,
                        },
                        {
                          id: 36,
                          value: "46",
                          size_id: 3,
                        },
                        {
                          id: 37,
                          value: "48",
                          size_id: 3,
                        },
                        {
                          id: 38,
                          value: "50",
                          size_id: 3,
                        },
                        {
                          id: 39,
                          value: "52",
                          size_id: 3,
                        },
                        {
                          id: 40,
                          value: "54",
                          size_id: 3,
                        },
                        {
                          id: 41,
                          value: "56",
                          size_id: 3,
                        },
                        {
                          id: 42,
                          value: "58",
                          size_id: 3,
                        },
                        {
                          id: 43,
                          value: "60",
                          size_id: 3,
                        },
                      ],
                    },
                  ],
                }}
                categoryName="category_id"
                sizeTypeName="size_type"
                theSizeName="size_unit_id"
              />

              <SelectCategoryAndSize
                categorySelectName="category_id"
                sizeTypeSelectName="size_type"
                sizeNumberSelectName="sizeNumber_id"
                setValidateYupTypeAndCategory={setValidateYupTypeAndCategory}
              />
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div> */}

      <main>
        <div className="flex justify-between  align-middle">
          <div>
            <h1 className="font-bold">اهلا محمد المحيسن</h1>
            <p>مرحبا بك في لوحة التحكم الخاصة بك</p>
          </div>
          <div>
            <h3 className="font-bold">3 مايو - 20233</h3>
            <p>05:23:07(GMT)</p>
          </div>
        </div>
        <Formik
          initialValues={initValues}
          onSubmit={(values) => {
            console.log("SUBMIT VALUES =>>>", values);
          }}
        >
          <Form>
            <div className="flex justify-between  align-middle mt-5 ">
              <div>فلتر البحث</div>

              <div className="w-[90%]">
                <form className="flex items-center rounded-md border-2 border-slate-200 p-1 ">
                  <input
                    type="search"
                    placeholder="بحث"
                    className=" placeholder-slate-400 border-transparent p-0"
                  />
                  <BiSearchAlt className="fill-slate-400" />
                </form>
              </div>
            </div>
            <div className="grid grid-cols-4 gpa-2 mt-5">
              <div className="col-span-1">
                <DateInputField label={`${t("Date from")}`} name="end_date" />
              </div>
              <div className="col-span-1 mx-2">
                <DateInputField label={`${t("Date end")}`} name="end_date" />
              </div>
            </div>
          </Form>
        </Formik>
        <div className="grid-cols-5 grid gap-8 mt-5">
          {/* اجمالي الذهب حسب الاسهم */}
          <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>
          <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>
          <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>
          <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>
          <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>
          <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>
          <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>
          <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>

            <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>
            <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>
            <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>
            <div className="col-span-1 shadow rounded-md bg-mainGreen ">
            <div className=" text-white font-bold text-center mt-3 ">
              <p className="p-4">اجمالي عدد قطع الذهب</p>
            </div>
            <div className="bg-white mt-4 p-3 font-bold text-center">
              <p>2220 جرام</p>
            </div>
          </div>

          {/* اجمالي صندوق الذهب 24 */}
        </div>
      </main>
    </>
  );
};
