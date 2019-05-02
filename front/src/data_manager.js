const axios = require("axios");

class Manager {
  constructor() {
    this.url = "http://localhost:5001/";
    this.data = {};
    this.ids = [];
  }

  async load_annotations() {
    console.log("loading annotations...");
    await axios
      .get(`${this.url}images`)
      .then(res => {
        this.data = Object.assign({}, res["data"]);
        this.ids = Object.keys(this.data);
        console.log("loading finished");
      })
      .catch(console.log);
  }

  async get_faces(id_) {
    if (!(id_ in this.data)) {
      console.log(`id ${id_} not in data`);
      return [];
    }
    let faces = [];
    console.log(`loading faces for ${id_}`);

    await axios
      .get(`${this.url}images/${id_}/annotations`)
      .then(res => {
        console.log(`finished loading faces for ${id_}`);
        faces = res["data"];
      })
      .catch(console.log);
    return faces;
  }

  async update_faces(id_, faces) {
    if (!(id_ in this.data)) {
      console.log(`id ${id_} not in data`);
      return [];
    }
    console.log(`sending faces for ${id_}`);
    const options = {
      headers: { "content-type": "application/json" }
    };
    const data = JSON.stringify({ faces });

    await axios
      .post(`${this.url}images/${id_}/annotations`, data, options)
      .then(() => {
        console.log(`finished sending faces for ${id_}`);
      })
      .catch(console.log);

    this.data[id_]["faces"] = faces;
  }
  get_data() {
    return Object.assign({}, this.data);
  }
}

module.exports = Manager;
