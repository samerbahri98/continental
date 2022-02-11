import IDockerField from "../interfaces/IDockerField";
import IUser from "../interfaces/IUser";

const api_url = "http://localhost:3004/api";

export const getUserById = (id: string) => {
  return new Promise<IUser>(async (resolve, reject) => {
    await fetch(`${api_url}/users?id=${id}`)
      .then((data) => data.json())
      .then(async (user: IUser[]) => {
        const userPayload: IUser = {
          id: user[0].id,
          email: user[0].email,
          avatar: user[0].avatar,
          username: user[0].username,
        };
        resolve(userPayload);
      })
      .catch((err) => reject(err));
  });
};

export const getRegistryById = (id: string) => {
  return new Promise<IDockerField>(async (resolve, reject) => {
    await fetch(`${api_url}/registries?id=${id}`)
      .then((data) => data.json())
      .then(async (registries) => {
        const registryPayload: IDockerField = {
          id: registries[0].id,
          name: registries[0].name,
        };
        resolve(registryPayload);
      })
      .catch((err) => reject(err));
  });
};

export const getRepositoryById = (id: string) => {
  return new Promise<IDockerField>(async (resolve, reject) => {
    await fetch(`${api_url}/repositories?id=${id}`)
      .then((data) => data.json())
      .then(async (repositories) => {
        const repositoryPayload: IDockerField = {
          id: repositories[0].id,
          name: repositories[0].name,
        };
        resolve(repositoryPayload);
      })
      .catch((err) => reject(err));
  });
};

export const getTagById = (id: string) => {
  return new Promise<IDockerField>(async (resolve, reject) => {
    await fetch(`${api_url}/tags?id=${id}`)
      .then((data) => data.json())
      .then(async (tags) => {
        const tagPayload: IDockerField = {
          id: tags[0].id,
          name: tags[0].name,
        };
        resolve(tagPayload);
      })
      .catch((err) => reject(err));
  });
};
