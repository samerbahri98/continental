import { FormikHelpers } from "formik";
import { PropsWithChildren } from "react";
import IAutocompleteOption from "./IAutcompleteOption";
import IDockerField from "./IDockerField";

export default interface IAutocompleteFieldProps extends PropsWithChildren<{}> {
  name: string;
  placeholder: string;
  value?: string;
  parentFieldId: string;
  setFieldValue?: any;
  label: string;
  options?: IDockerField[];
  disabled: boolean;
  resetRepository: () => void;
  resetTag: () => void;
}
