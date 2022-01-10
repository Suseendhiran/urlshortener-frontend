import React, { useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import InputField from "../InputField";
import { resetPasswordSchema } from "../../helpers/validationSchema";
import Button from "../Button";
import axios from "../../Api/Api";
import Spinner from "../InlineSpinner";
import { useLocation } from "react-router-dom";

function Index() {
  const history = useHistory();
  const { search } = useLocation();
  const queryStringParams = new URLSearchParams(search);
  const token = queryStringParams.get("token");
  const id = queryStringParams.get("id");

  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const INPUTS = [
    {
      name: "password",
      type: "password",
      inputType: "text",
      placeholder: "New Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      inputType: "text",
      placeholder: "Confirm Password",
    },
  ];

  const handleLogin = (values) => {
    setLoading(true);
    axios
      .put(`/users/resetpassword`, {
        token: token,
        id: id,
        password: values.password,
      })
      .then((res) => {
        addToast(res.data.message, { appearance: "success" });
        setLoading(false);
        history.push("/");
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
      validationSchema={resetPasswordSchema}
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
              <h1 className="font-semibold text-4xl mb-10">Reset Password</h1>
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
          </div>
        );
      }}
    </Formik>
  );
}

export default Index;
