import * as Yup from "yup";

export const deployFormSchema = {
  id: Yup.string().required("Required!"),
  name: Yup.string().required("Required!"),
  user: Yup.string().required("Required!"),
  image: Yup.object().shape({
    registry: Yup.string().required("Required!"),
    repository: Yup.string().required("Required!"),
    tag: Yup.string().required("Required!"),
  }),
};
