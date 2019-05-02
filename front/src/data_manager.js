const axios = require("axios");

class Manager {
  constructor() {
    this.url = "http://localhost:5001/";
    this.data = {};
    this.ids = [];
  }

  async load_annotations() {
    await axios.get(`${this.url}images`).then(res => {
      this.data = Object.assign({}, res["data"]);
      this.ids = Object.keys(this.data);
    });
  }

  async get_faces(id_) {
    if (!(id_ in this.data)) {
      return [];
    }
    let faces = [];

    await axios.get(`${this.url}images/${id_}/annotations`).then(res => {
      faces = res["data"];
    });
    return faces;
  }

  async update_faces(id_, faces) {
    if (!(id_ in this.data)) {
      return [];
    }
    const options = {
      headers: { "content-type": "application/json" }
    };
    const data = JSON.stringify({ faces });

    await axios.post(`${this.url}images/${id_}/annotations`, data, options);

    this.data[id_]["faces"] = faces;
  }
  get_data() {
    return Object.assign({}, this.data);
  }
}

export default Manager;
