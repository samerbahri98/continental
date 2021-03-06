import {
  useContext,
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
} from "react";
import ILoginRequest from "../interfaces/ILoginRequest";
import IUser from "../interfaces/IUser";

const api_url = process.env.API_URL || "http://localhost:3004/api";

type LoginDelegate = (credentials: ILoginRequest) => Promise<IUser>;
type LogoutDelegate = () => void;
type GetUserByIdDelegate = (id: string) => Promise<IUser>;

const emptyLogin: LoginDelegate = (credentials: ILoginRequest) =>
  Promise.reject("");
const emptyGetUserById: GetUserByIdDelegate = (id: string) =>
  Promise.reject("");

const LogoutContext = createContext<LogoutDelegate>(() => {});
const LoggedUserContext = createContext<IUser | null>(null);
const GetUserByIdContext = createContext<GetUserByIdDelegate>(emptyGetUserById);
const LoginContext = createContext<LoginDelegate>(emptyLogin);

export function useLoggedUser() {
  return useContext(LoggedUserContext);
}

export function useLogout() {
  return useContext(LogoutContext);
}

export function useLogin() {
  return useContext(LoginContext);
}
export function useGetUserById() {
  return useContext(GetUserByIdContext);
}

export function UserProvider(props: PropsWithChildren<{}>) {
  const [loggedUser, setLoggedUser] = useState<IUser | null>(null);

  const login: LoginDelegate = (credentials: ILoginRequest) => {
    return new Promise<IUser>(async (resolve, reject) => {
      await fetch(
        `${api_url}/users?email=${credentials.email}&password=${credentials.password}`
      )
        .then((data) => data.json())
        .then(async (user: IUser[]) => {
          if (user.length === 0)
            reject(new Error("incorrect email and/or password"));
          const userPayload: IUser = {
            id: user[0].id,
            email: user[0].email,
            avatar: user[0].avatar,
            username: user[0].username,
          };
          console.log(userPayload);
          setLoggedUser(userPayload);
          localStorage.setItem("user", userPayload.id);
          resolve(userPayload);
        })
        .catch((err) => reject(err));
    });
  };

  const getUserById: GetUserByIdDelegate = (id: string) => {
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
          setLoggedUser(userPayload);
          resolve(userPayload);
        })
        .catch((err) => reject(err));
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedUser(null);
  };

  useEffect(() => {
    (async () => {
      const id: string | null = localStorage.getItem("user");

      const user = id ? await getUserById(id) : null;
      setLoggedUser(user);
    })();
  }, []);

  return (
    <LoggedUserContext.Provider value={loggedUser}>
      <LoginContext.Provider value={login}>
        <GetUserByIdContext.Provider value={getUserById}>
          <LogoutContext.Provider value={logout}>
            {props.children}
          </LogoutContext.Provider>
        </GetUserByIdContext.Provider>
      </LoginContext.Provider>
    </LoggedUserContext.Provider>
  );
}
