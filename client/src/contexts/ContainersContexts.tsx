import {
  useContext,
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
} from "react";
import IDockerContainer from "../interfaces/IDockerContainer";
import IDockerContainerRequest from "../interfaces/IDockerContainerRequest";
import IDockerField from "../interfaces/IDockerField";
import IDockerRegistry from "../interfaces/IDockerRegistry";
import IUser from "../interfaces/IUser";
import {
  getRegistryById,
  getRepositoryById,
  getTagById,
  getUserById,
} from "./requests";

const api_url = "http://localhost:3004/api";

type AddDockerContainerContextDelegate = (
  container: IDockerContainerRequest
) => Promise<string>;
const emptyAddDockerContainer = (container: IDockerContainerRequest) =>
  Promise.reject("");

const DockerContainersListContext = createContext<IDockerContainer[]>([]);
const AddDockerContainerContext =
  createContext<AddDockerContainerContextDelegate>(emptyAddDockerContainer);

export function useDockerContainersList() {
  return useContext(DockerContainersListContext);
}
export function useAddDockerContainer() {
  return useContext(AddDockerContainerContext);
}

const dataset: any = {
  users: {},
  images: {
    registries: {},
    repositories: {},
    tags: {},
  },
};

export function ContainersProvider(props: PropsWithChildren<{}>) {
  const [dockerContainersList, setDockerContainersList] = useState<
    IDockerContainer[]
  >([]);

  const addDockerContainer: AddDockerContainerContextDelegate = (
    container: IDockerContainerRequest
  ) => {
    return new Promise<string>(async (resolve, reject) => {
      await fetch(`${api_url}/containers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(container),
      })
        .then((data) => data.json())
        .then(async (containerResponse: IDockerContainerRequest) => {
          if (!dataset["users"][container.user]) {
            dataset["users"][container.user] = await getUserById(
              container.user
            );
          }
          if (!dataset["images"]["registries"][container.image.registry]) {
            dataset["images"]["registries"][container.image.registry] =
              await getRegistryById(container.image.registry);
          }
          if (!dataset["images"]["repositories"][container.image.repository]) {
            dataset["images"]["repositories"][container.image.repository] =
              await getRepositoryById(container.image.repository);
          }
          if (!dataset["images"]["tags"][container.image.tag]) {
            dataset["images"]["tags"][container.image.tag] = await getTagById(
              container.image.tag
            );
          }
          const newDockerContainer: IDockerContainer = {
            user: dataset["users"][containerResponse.user],
            image: {
              registry:
                dataset["images"]["registries"][container.image.registry],
              repository:
                dataset["images"]["repositories"][container.image.repository],
              tag: dataset["images"]["tags"][container.image.tag],
            },
            isRunning: container.isRunning,
            username: dataset["users"][container.user]["username"],
            userAvatar: dataset["users"][container.user]["avatar"],
            imageLabel: `${
              dataset["images"]["registries"][container.image.registry][
                "name"
              ] as string
            }/${
              dataset["images"]["repositories"][container.image.repository][
                "name"
              ] as string
            }:${
              dataset["images"]["tags"][container.image.tag]["name"] as string
            }`,
            id: container.id,
            name: container.name,
          };
          const newList = dockerContainersList;
          newList.push(newDockerContainer);
          setDockerContainersList(newList);
          resolve("container added sccessfully");
        })
        .catch((err) => {
          reject("an error has occured");
          console.log(err);
        });
    });
  };

  useEffect(() => {
    (async () => {
      if (dockerContainersList.length === 0)
        await fetch(`${api_url}/containers`)
          .then((data) => data.json())
          .then(async (containerPayload: IDockerContainerRequest[]) => {
            for (const container of containerPayload) {
              if (!dataset["users"][container.user]) {
                dataset["users"][container.user] = await getUserById(
                  container.user
                );
              }
              if (!dataset["images"]["registries"][container.image.registry]) {
                dataset["images"]["registries"][container.image.registry] =
                  await getRegistryById(container.image.registry);
              }
              if (
                !dataset["images"]["repositories"][container.image.repository]
              ) {
                dataset["images"]["repositories"][container.image.repository] =
                  await getRepositoryById(container.image.repository);
              }
              if (!dataset["images"]["tags"][container.image.tag]) {
                dataset["images"]["tags"][container.image.tag] =
                  await getTagById(container.image.tag);
              }
            }
            const containerList: IDockerContainer[] = containerPayload.map(
              (container) => ({
                id: container.id,
                name: container.name,
                user: dataset["users"][container.user] as IUser,
                image: {
                  registry: dataset["images"]["registries"][
                    container.image.registry
                  ] as IDockerField,
                  repository: dataset["images"]["repositories"][
                    container.image.repository
                  ] as IDockerField,
                  tag: dataset["images"]["tags"][
                    container.image.tag
                  ] as IDockerField,
                },
                isRunning: container.isRunning,
                username: dataset["users"][container.user]["username"],
                userAvatar: dataset["users"][container.user]["avatar"],
                imageLabel: `${
                  dataset["images"]["registries"][container.image.registry][
                    "name"
                  ] as string
                }/${
                  dataset["images"]["repositories"][container.image.repository][
                    "name"
                  ] as string
                }:${
                  dataset["images"]["tags"][container.image.tag][
                    "name"
                  ] as string
                }`,
              })
            );
            setDockerContainersList(containerList);
          });
    })();
  });

  return (
    <DockerContainersListContext.Provider value={dockerContainersList}>
      <AddDockerContainerContext.Provider value={addDockerContainer}>
        {props.children}
      </AddDockerContainerContext.Provider>
    </DockerContainersListContext.Provider>
  );
}
