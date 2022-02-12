import IDockerField from "../interfaces/IDockerField";
import IUser from "../interfaces/IUser";

const api_url = process.env.API_URL || "http://localhost:3004/api";

export const getUserById = (id: string) => {
  return new Promise<IUser>(async (resolve, reject) => {
    await fetch(`${api_url}/users?id=${id}`)
      .then((data) => data.json())
      .then(async (user: IUser[]) => {
        const payload: IUser = {
          id: user[0].id,
          email: user[0].email,
          avatar: user[0].avatar,
          username: user[0].username,
        };
        resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

export const getRegistryById = (id: string) => {
  return new Promise<IDockerField>(async (resolve, reject) => {
    await fetch(`${api_url}/registries?id=${id}`)
      .then((data) => data.json())
      .then(async (registries) => {
        const payload: IDockerField = {
          id: registries[0].id,
          name: registries[0].name,
        };
        resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

export const getRepositoryById = (id: string) => {
  return new Promise<IDockerField>(async (resolve, reject) => {
    await fetch(`${api_url}/repositories?id=${id}`)
      .then((data) => data.json())
      .then(async (repositories) => {
        const payload: IDockerField = {
          id: repositories[0].id,
          name: repositories[0].name,
        };
        resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

export const getTagById = (id: string) => {
  return new Promise<IDockerField>(async (resolve, reject) => {
    await fetch(`${api_url}/tags?id=${id}`)
      .then((data) => data.json())
      .then(async (tags) => {
        const payload: IDockerField = {
          id: tags[0].id,
          name: tags[0].name,
        };
        resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

export const getAllRegistries = () => {
  return new Promise<IDockerField[]>(async (resolve, reject) => {
    await fetch(`${api_url}/registries`)
      .then((data) => data.json())
      .then(async (registries) => {
        const payload: IDockerField[] = registries.map(
          (registry: IDockerField) => ({
            id: registry.id,
            name: registry.name,
          })
        );
        resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

export const getRepositoriesByRegistryId = (registry: string) => {
  return new Promise<IDockerField[]>(async (resolve, reject) => {
    await fetch(`${api_url}/repositories?registry=${registry}`)
      .then((data) => data.json())
      .then(async (repositories) => {
        const payload: IDockerField[] = repositories.map(
          (repository: IDockerField) => ({
            id: repository.id,
            name: repository.name,
          })
        );
        resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

export const getTagsByRepositoryId = (repository: string) => {
  return new Promise<IDockerField[]>(async (resolve, reject) => {
    await fetch(`${api_url}/tags?repository=${repository}`)
      .then((data) => data.json())
      .then(async (tags) => {
        const payload: IDockerField[] = tags.map((tag: IDockerField) => ({
          id: tag.id,
          name: tag.name,
        }));
        resolve(payload);
      })
      .catch((err) => reject(err));
  });
};
