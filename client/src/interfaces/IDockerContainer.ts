import IDockerField from "./IDockerField";
import IDockerImage from "./IDockerImage";
import IUser from "./IUser";

export default interface IDockerContainer extends IDockerField {
  user: IUser;
  image: IDockerImage;
  isRunning: boolean;
  imageLabel: string;
  username: string;
  userAvatar: string;
}
