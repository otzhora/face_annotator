const axios = require("axios");

class Manager {
  constructor(url = "http://localhost:5000/") {
    this.url = url;
  }

  load_id_list() {
    return axios.get(`${this.url}images/id_list`).then(res => {
      return res["data"];
    });
  }

  get_faces(id_) {
    return axios.get(`${this.url}images/${id_}/annotations`).then(res => {
      return res["data"];
    });
  }

  update_faces(id_, faces) {
    const options = {
      headers: { "content-type": "application/json" }
    };
    const data = JSON.stringify({ faces });

    return axios
      .post(`${this.url}images/${id_}/annotations`, data, options)
      .then(res => {
        return res["data"];
      });
  }

  get_photo_info(id_) {
    return axios.get(`${this.url}images/${id_}`).then(res => {
      return res["data"];
    });
  }
}

export default Manager;
