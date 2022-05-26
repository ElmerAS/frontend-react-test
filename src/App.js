import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import UploadFiles from "./components/uploadFile.component";
import ListFiles from "./components/listFiles.component";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/listFiles" className="navbar-brand">
          Rpa Latam
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/listFiles"} className="nav-link">
              Archivos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Subir Archivo
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<ListFiles />} />
          <Route exact path={"/listFiles"} element={<ListFiles />} />
          <Route exact path={"/add"} element={<UploadFiles />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
