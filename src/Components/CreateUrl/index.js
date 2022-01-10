import React from "react";
import { Formik } from "formik";

import InputField from "../InputField";
import Button from "../Button";
import Spinner from "../InlineSpinner";

function index({ validationSchema, handleLogin, inputs, loading }) {
  return (
    <Formik
      initialValues={{
        originalUrl: "",
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        //console.log("val", values, resetForm);
        handleLogin(values, resetForm);
      }}
    >
      {({
        handleSubmit,
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        resetForm,
      }) => {
        return (
          <div className=" w-9/12 md:w-6/12 m-auto mt-14">
            <form onSubmit={handleSubmit} className="flex items-start">
              {inputs.map((input) => (
                <InputField
                  key={input.name}
                  name={input.name}
                  inputType={input.inputType}
                  type={input.type}
                  value={values[input.name]}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  touched={touched[input.name]}
                  error={errors[input.name]}
                  placeholder={input.placeholder}
                  disabled={loading}
                  className={"mb-0 flex-1"}
                />
              ))}
              <Button
                type="submit"
                disabled={loading}
                buttonText={"SHORTEN"}
                loading={loading}
                className="px-10 mt-0 ml-2 mb-0 py-2 flex relative"
              >
                {" "}
                <Spinner className={"absolute right-5"} />
              </Button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default index;
