import IDockerField from "./IDockerField";
import IDockerRepository from "./IDockerRepository";

export default interface IDockerRegistry extends IDockerField {
  repositories?: IDockerRepository[];
}
