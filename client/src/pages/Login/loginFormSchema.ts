import * as Yup from "yup";

export const loginFormSchema = {
  email: Yup.string().email().required("Required!"),
  password: Yup.string().required("Required!"),
};
