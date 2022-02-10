import IDockerField from "./IDockerField";

export default interface IDockerImage {
  registry: IDockerField;
  repository: IDockerField;
  tag: IDockerField;
}
