import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import IDockerTag from "../../interfaces/IDockerTag";
import AutocompleteField from "./AutocompleteField";
import { Field, FormikProps } from "formik";
import IDockerContainerRequest from "../../interfaces/IDockerContainerRequest";

interface IDeployFormProps {
  props: FormikProps<IDockerContainerRequest>;
}
function DeployForm({ props }: IDeployFormProps) {
  const resetRepository = () => {
    props.setFieldValue("image.repository", "");
  };

  const resetTag = () => {
    props.setFieldValue("image.tag", "");
  };
  return (
    <Stack spacing={1} sx={{ width: 300 }}>
      <TextField
        label="Name"
        variant="standard"
        name="name"
        id="name"
        required
        value={props.values.name}
        onChange={(e) => props.setFieldValue("name", e.target.value)}
      />
      <AutocompleteField
        setFieldValue={props.setFieldValue}
        name="image.registry"
        placeholder="Registry"
        parentFieldId={""}
        label="Registry"
        value={props.values.image.registry}
        disabled={false}
        resetRepository={resetRepository}
        resetTag={resetTag}
      />

      <AutocompleteField
        setFieldValue={props.setFieldValue}
        value={props.values.image.repository}
        name="image.repository"
        placeholder="Repository"
        parentFieldId={props.values.image.registry}
        label="Repository"
        disabled={props.values.image.registry === ""}
        resetRepository={resetRepository}
        resetTag={resetTag}
      />

      <AutocompleteField
        setFieldValue={props.setFieldValue}
        value={props.values.image.tag}
        name="image.tag"
        placeholder="Tag"
        parentFieldId={props.values.image.repository}
        label="Tag"
        disabled={props.values.image.repository === ""}
        resetRepository={resetRepository}
        resetTag={resetTag}
      />
    </Stack>
  );
}

export default DeployForm;
