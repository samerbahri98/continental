import IDockerField from "./IDockerField";
import IDockerTag from "./IDockerTag";

export default interface IDockerRepository extends IDockerField {
  tags?: IDockerTag[];
}
