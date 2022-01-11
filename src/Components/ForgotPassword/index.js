import React, { useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import InputField from "../InputField";
import { forgotPasswordSchema } from "../../helpers/validationSchema";
import Button from "../Button";
import axios from "../../Api/Api";
import Spinner from "../InlineSpinner";

function Index() {
  const history = useHistory();
  const { addToast } = useToasts();
  const AXIOS = axios();
  const [loading, setLoading] = useState(false);
  const INPUTS = [
    {
      name: "email",
      type: "email",
      inputType: "text",
      placeholder: "Email",
    },
  ];

  const handleSubmit = (values) => {
    setLoading(true);
    AXIOS.put(`/users/forgotpassword`, {
      ...values,
    })
      .then((res) => {
        console.log("res", res.data);
        addToast(res.data.message, { appearance: "success" });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.response.data.message, { appearance: "error" });
      });
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      enableReinitialize
      validationSchema={forgotPasswordSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({
        handleSubmit,
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        isSubmitting,
      }) => {
        return (
          <div className=" w-96 m-auto mt-14">
            <form onSubmit={handleSubmit}>
              <h1 className="font-semibold text-4xl mb-10">Login</h1>
              {INPUTS.map((input) => (
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
                />
              ))}
              <Button
                type="submit"
                disabled={loading}
                buttonText={"SUBMIT"}
                loading={loading}
              >
                {" "}
                <Spinner />
              </Button>
            </form>
            <div className="mt-4 flex justify-end font-medium text-gray-700">
              <p
                onClick={() => {
                  history.push("/");
                }}
                className="text-green-600 ml-1 font-semibold cursor-pointer"
              >
                Login
              </p>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default Index;
