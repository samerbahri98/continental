import IDockerContainer from "../../interfaces/IDockerContainer";

interface HeadCell {
  disablePadding: boolean;
  id: keyof IDockerContainer;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "User",
  },
  {
    id: "imageLabel",
    numeric: false,
    disablePadding: false,
    label: "Image",
  },
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "isRunning",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

export default headCells;
