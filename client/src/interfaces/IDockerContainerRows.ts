import IDockerField from "./IDockerField";

export default interface IDockerContainerRows extends IDockerField {
  isRunning: boolean;
  imageLabel: string;
  username: string;
  userAvatar: string;
}
