import React, { Component } from "react";
//import ObjectDataService from "../services/object.service";
import { withAlert } from "react-alert";
import axios from "axios";
class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      file: null,
      folder: null,
    };
  }

  handleChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  handleChangeText(event) {
    this.setState({ folder: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);
    data.append("folder", this.state.folder);
    var config = {
      method: "post",
      url: "http://localhost:3000/apirpa/putObject",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        this.props.alert.show("Archivo cargado correctamente!");
      })
      .catch((e) => {
        console.log(e);
        this.props.alert.error("Ocurrio un problema!");
      });
  }

  render() {
    return (
      <div className="worker row">
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Carpeta
            </span>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChangeText}
            />
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h1>Cargar Archivos</h1>
          <input type="file" onChange={this.handleChange} />
          <button className="btn btn-info ms-2" type="submit">
            Listo
          </button>
        </form>
      </div>
    );
  }
}
export default withAlert()(UploadFile);
