/////////// IMPORTS
///

import { Form, Formik } from "formik";
import { t } from "i18next";
import { useContext, useRef, useState } from "react";
import * as Yup from "yup";
import { authCtx } from "../../context/auth-and-perm/auth";
import { Button } from "../atoms/buttons/Button";
import { BaseInputField } from "../molecules/formik-fields/BaseInputField";
import videoHome from '../../assets/homeVideo.mp4'
import logo from "../../assets/altebr_logo.png"

///
/////////// Types
///
type LoginFormProps_TP = {};
///
/////////// HELPER VARIABLES & FUNCTIONS
///
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").trim().required(),
  password: Yup.string().trim().required(),
});
///
export const LoginForm = () => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const { logInHandler, isLoggedIn, isLoggingIn } = useContext(authCtx);
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
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <div>
        <video
         autoPlay
            loop 
            muted
            
            className="myVideo"
            src={videoHome}

        
        />
       
      
      </div>
      <div className="content">
        <img src={logo} className="m-auto h-[50px] w-[50px] object-contain" alt="logo" />

      <h1 className="text-2xl font-bold  text-center mb-5">Tenant login</h1>
      <Formik
        initialValues={{
          email: "emp@emp.com",
          password: "123",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          logInHandler(values);
        }}
      >
        <Form>
          <BaseInputField
            labelProps={{ className: "mb-1 font-bold" }}
            id="email"
            label={`${t("email")}`}
            name="email"
            type="text"
            placeholder="email"
          />
          <BaseInputField
            labelProps={{ className: "mt-6 mb-1 font-bold" }}
            className="mb-4"
            id="password"
            label={`${t("password")}`}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button
            className="mt-3 w-full"
            type="submit"
            variant="primary"
            loading={isLoggingIn}
          >
            دخول
          </Button>
        </Form>
      </Formik>
        </div>

    </div>
  );
};
