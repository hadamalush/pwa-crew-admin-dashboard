import * as yup from "yup";

const emailReg = yup
  .string()
  .required("Address email is required")
  .min(3, "At least 3 characters.")
  .email("Pass valid address email");

export const newUserSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "At least 3 characters")
    .max(80, "Max 80 characters"),
  email: emailReg,
  password: yup
    .string()
    .required("Password is required")
    .min(8, "At least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]:;'<,>.?/]).{8,}$/,
      "Password must be strong"
    ),
});

export const editUserSchema = yup.object().shape({
  username: yup.string().min(3, "At least 3 characters").max(80, "Max 80 characters"),
  email: yup.string().min(3, "At least 3 characters").email("Enter valid address email"),
  password: yup
    .mixed()
    .test("minLength", "At least 8 characters", (value) => {
      const val = value as string;
      if (val?.length) {
        return val.length > 7;
      }
      return true;
    })
    .test("strongPassword", "Password must be strong", (value) => {
      const val = value as string;
      const strongPasswordRegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]:;'<,>.?/]).{8,}$/;
      if (val && val.length > 0) {
        return strongPasswordRegExp.test(val);
      }
      return true;
    }),
});

export const loginSchema = yup.object().shape({
  email: emailReg,
  password: yup.string().required("Password is required").min(8, "Please enter valid password"),
});

export const emailSchema = yup.object().shape({
  email: emailReg,
});
