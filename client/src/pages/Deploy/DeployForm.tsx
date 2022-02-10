import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import IDockerTag from "../../interfaces/IDockerTag";
const registries = [
  {
    id: "8bdead6d-2331-492f-a70b-e761ed7534f8",
    name: "docker.io",
    repositories: ["b23299b2-1412-4a13-8fba-93943edc6784"],
  },
  {
    id: "37ef371f-dbac-4c32-81f5-89df6600f096",
    name: "myregistry.io",
    repositories: [
      "ad4840de-ca46-426c-b4c7-ec3a7263d36a",
      "74c28f06-f911-4bf5-89a8-e948c3d927e6",
    ],
  },
  {
    id: "6ff5351e-b6aa-416a-be91-fec331d3e67f",
    name: "otherregistry.com",
    repositories: [],
  },
];
function DeployForm() {
  const defaultProps = {
    options: registries,
    getOptionLabel: (option: IDockerTag) => option.name,
  };
  const flatProps = {
    options: registries.map((option) => option.name),
  };
  const [value, setValue] = React.useState<IDockerTag | null>(null);

  return (
    <Stack spacing={1} sx={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        id="Registry"
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            label="Registry"
            variant="standard"
          />
        )}
      />
    </Stack>
  );
}

export default DeployForm;
