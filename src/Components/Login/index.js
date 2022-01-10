import React, { useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import jwtDecode from "jwt-decode";

import InputField from "../InputField";
import { loginSchema } from "../../helpers/validationSchema";
import Button from "../Button";
import axios from "../../Api/Api";
import Spinner from "../InlineSpinner";
import { useAuth } from "../../Providers/AuthProvider";

function Index() {
  const history = useHistory();
  const { addToast } = useToasts();
  const { setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const INPUTS = [
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

  const handleLogin = (values) => {
    setLoading(true);
    axios
      .put(`/users/login`, {
        ...values,
      })
      .then((res) => {
        console.log("res", res.data);
        addToast(res.data.message, { appearance: "success" });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify(jwtDecode(res.data.token))
        );
        history.push("/dashboard");
        setToken(res.data.token);
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
      validationSchema={loginSchema}
      onSubmit={(values) => handleLogin(values)}
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
                className={"flex  relative px-9"}
              >
                {" "}
                <Spinner className={"absolute right-5"} />
              </Button>
            </form>
            <div className="mt-4 flex justify-between font-medium text-gray-700">
              <p>
                No Account?
                <span
                  className="text-green-600 ml-1 font-semibold cursor-pointer"
                  onClick={() => {
                    history.push("/signup");
                  }}
                >
                  Create Account
                </span>
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  history.push("/forgotpassword");
                }}
              >
                Forgot Password?
              </p>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default Index;
