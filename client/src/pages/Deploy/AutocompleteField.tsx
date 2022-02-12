import React, { useEffect, useState } from "react";
import { Field } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@material-ui/core";
import IAutocompleteFieldProps from "../../interfaces/IAutocompleteFieldProps";
import IDockerField from "../../interfaces/IDockerField";
import {
  getAllRegistries,
  getRepositoriesByRegistryId,
  getTagsByRepositoryId,
} from "../../contexts/requests";

type AutocompleteListDelegate = (arg: string) => Promise<IDockerField[]>;
type AutocompleteListDictionary = { [key: string]: AutocompleteListDelegate };

const getAutocompleteListByName: AutocompleteListDictionary = {};
getAutocompleteListByName["image.registry"] = getAllRegistries;
getAutocompleteListByName["image.repository"] = getRepositoriesByRegistryId;
getAutocompleteListByName["image.tag"] = getTagsByRepositoryId;

function AutocompleteField({
  name,
  setFieldValue,
  parentFieldId,
  label,
  disabled,
  value,
  resetRepository,
  resetTag,
}: IAutocompleteFieldProps) {
  const [options, setOptions] = useState<IDockerField[]>([]);
  const [updated, setUpdated] = useState<boolean>(false);
  const [parent, setParent] = useState<string>("");

  const getOptionById = (id: string) =>
    options.filter((elem) => elem.id === id)[0];

  useEffect(() => {
    (async () => {
      if (!updated || parentFieldId !== parent) {
        const autocompleteList: AutocompleteListDelegate =
          getAutocompleteListByName[name];
        const optionList = await autocompleteList(parentFieldId);
        setOptions(optionList);
        setUpdated(true);
        setParent(parentFieldId);
      }
    })();
  });
  return (
    <Autocomplete
      options={options ? options : []}
      getOptionLabel={(option: IDockerField) => option.name}
      onChange={(e, option) => {
        setFieldValue(name, option?.id);
        if (name === "image.registry" || name === "image.repository")
          resetTag();
        if (name === "image.registry") resetRepository();
      }}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      id={name}
      disabled={disabled}
      value={value ? getOptionById(value) : null}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          name={name}
          required
        />
      )}
    />
  );
}

export default AutocompleteField;
