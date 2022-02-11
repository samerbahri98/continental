import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Deploy from "./pages/Deploy";
import Login from "./pages/Login";
import "./App.css";
import Containers from "./pages/Containers";
import {
  useGetUserById,
  useLoggedUser,
  UserProvider,
} from "./contexts/UserContexts";
import { useEffect, useState } from "react";
import IUser from "./interfaces/IUser";

function App() {
  const loggedUser = useLoggedUser() as IUser;
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    if (!loggedUser) return;
    setUser(loggedUser);
  }, [loggedUser]);
  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route
              path="/"
              element={
                <>
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/deploy"
              element={
                <>
                  <Deploy />
                </>
              }
            />
            <Route
              path="/containers"
              element={
                <>
                  <Containers />
                </>
              }
            />
          </>
        ) : (
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
