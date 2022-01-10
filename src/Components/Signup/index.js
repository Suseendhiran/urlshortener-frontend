import React, { useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import InputField from "../InputField";
import { signupSchema } from "../../helpers/validationSchema";
import Button from "../Button";
import axios from "../../Api/Api";
import Spinner from "../InlineSpinner";
import { useAuth } from "../../Providers/AuthProvider";

function Index() {
  const history = useHistory();
  const { setToken } = useAuth();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const INPUTS = [
    {
      name: "firstName",
      type: "text",
      inputType: "text",
      placeholder: "First Name",
    },
    {
      name: "lastName",
      type: "text",
      inputType: "text",
      placeholder: "Last Name",
    },
    {
      name: "email",
      type: "email",
      inputType: "text",
      placeholder: "Email",
    },
    {
      name: "password",
      type: "password",
      inputType: "text",
      placeholder: "Password",
    },
  ];
  const handleSignup = (values) => {
    setLoading(true);
    axios
      .post(`/users/signup`, {
        ...values,
      })
      .then((res) => {
        console.log("res", res.data);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        history.push("/dashboard");
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      enableReinitialize
      onSubmit={(values) => handleSignup(values)}
      validationSchema={signupSchema}
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
          <div className="w-96 m-auto mt-14">
            <form onSubmit={handleSubmit}>
              <h1 className="font-semibold text-4xl mb-10">Signup</h1>
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
                  disabled={isSubmitting}
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
              <p>
                Already have account?
                <span
                  className="text-green-600 ml-1 font-semibold cursor-pointer"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default Index;
