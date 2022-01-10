import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is Required"),
  password: yup
    .string()
    .required("Password is Required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password should contain atleast one uppercase, one lowercase and one special character"
    ),
});

const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(5, "Min 5 characters")
    .trim()
    .required("First Name is Required"),
  lastName: yup
    .string()
    .min(5, "Min 5 characters")
    .trim()
    .required("Last Name is Required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is Required"),
  password: yup
    .string()
    .required("Password is Required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password should contain atleast one uppercase, one lowercase and one special character"
    ),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is Required"),
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is Required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password should contain atleast one uppercase, one lowercase and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .test("", "Password must match", function (value) {
      return this.parent.password === value;
    }),
});

const urlSchema = yup.object().shape({
  originalUrl: yup
    .string()
    .required("Url is Required")
    .url("Should be valid url"),
});
export {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  urlSchema,
};
