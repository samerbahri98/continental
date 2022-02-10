import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Deploy from "./pages/Deploy";
import Login from "./pages/Login";
import "./App.css";
import Containers from "./pages/Containers";

function App() {
  return (
    <Router>
      <Routes>
        {localStorage.getItem("user") === null ? (
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
        ) : (
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
        )}
      </Routes>
    </Router>
  );
}

export default App;
