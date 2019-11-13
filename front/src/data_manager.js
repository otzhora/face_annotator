const axios = require("axios");

class Manager {
  constructor(url = "http://localhost:5001") {
    console.log(url);
    this.url = url;
  }

  load_id_list() {
    return axios.get(`${this.url}/images/id_list`).then(res => {
      return res["data"];
    });
  }

  get_faces(_id) {
    return axios.get(`${this.url}/images/${_id}/annotations`).then(res => {
      return res["data"];
    });
  }

  get_url(_id) {
    return axios.get(`${this.url}/images/${_id}/url`).then(res => {
      return res["data"];
    });
  }

  update_faces(id_, faces) {
    const options = {
      headers: { "content-type": "application/json" }
    };
    const data = JSON.stringify({ annotations: faces });
    console.log(data);
    return axios
      .post(`${this.url}/images/${id_}/annotations`, data, options)
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
