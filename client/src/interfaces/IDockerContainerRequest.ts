import { string } from "yup";
import IDockerField from "./IDockerField";

export default interface IDockerContainerRequest extends IDockerField {
  user: string;
  image: {
    registry: string;
    repository: string;
    tag: string;
  };
  isRunning: boolean;
}
