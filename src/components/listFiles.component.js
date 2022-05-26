import React, { Component } from "react";
import { withAlert } from "react-alert";
import ObjectDataService from "../services/object.service";
class ListFiles extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveObjects = this.retrieveObjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveObject = this.setActiveObject.bind(this);
    this.removeObject = this.removeObject.bind(this);
    this.searchName = this.searchName.bind(this);
    this.state = {
      objects: [],
      currentObject: null,
      currentIndex: -1,
      searchName: "",
    };
  }
  componentDidMount() {
    this.retrieveObjects();
  }
  onChangeSearchTitle(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName,
    });
  }
  retrieveObjects() {
    ObjectDataService.getAll()
      .then((response) => {
        this.setState({
          objects: response.data,
        });
      })
      .catch((e) => {
        this.props.alert.error("Ocurrio un problema!");
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveObjects();
    this.setState({
      currentObject: null,
      currentIndex: -1,
    });
  }
  setActiveObject(object, index) {
    ObjectDataService.get(object.Key)
      .then((response) => {
        object.urlSigned = response.data;
        this.setState({
          currentObject: object,
          currentIndex: index,
        });
      })
      .catch((e) => {
        this.props.alert.error("Ocurrio un problema!");
        console.log(e);
      });
  }
  removeObject(key) {
    ObjectDataService.delete(key)
      .then((response) => {
        this.props.alert.show("Archivo eliminado correctamente!");
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
        this.props.alert.error("Ocurrio un problema!");
      });
  }
  searchName() {
    ObjectDataService.findByTitle(this.state.searchName)
      .then((response) => {
        this.setState({
          objects: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { searchName, objects, currentObject, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre"
              value={searchName}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de archivos</h4>
          <ul className="list-group">
            {objects &&
              objects.map((object, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveObject(object, index)}
                  key={index}
                >
                  {object.Key}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentObject ? (
            <div>
              <h4>Objeto</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentObject.Key}
              </div>
              <div>
                <label>
                  <strong>Acceso:</strong>
                </label>{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="list-group-item-link"
                  href={currentObject.urlSigned ? currentObject.urlSigned : "#"}
                >
                  Abrir
                </a>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => this.removeObject(currentObject.Key)}
                  type="button"
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Selecciona un archivo...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default withAlert()(ListFiles);
