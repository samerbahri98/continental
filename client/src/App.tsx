import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";


function App() {
  return (
      <Router>
        <Routes>
          {localStorage.getItem("user") === null ?(
            <Route path="/" element={
              <>
              <Login />
              </>
            }/>
          ):(
            <Route />
          )}
        </Routes>
      </Router>
  );
}

export default App;
