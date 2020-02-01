const axios = require("axios");

class Manager {
  constructor(url = "http://localhost:5001") {
    this.url = url;
  }

  load_id_list() {
    return axios.get(`${this.url}/images/id_list`).then(res => {
      return res["data"];
    });
  }

  get_annotations_by_id(_id) {
    return axios.get(`${this.url}/images/${_id}/annotations`).then(res => {
      return res["data"];
    });
  }

  get_photo_url_by_id(_id) {
    return axios.get(`${this.url}/images/${_id}/url`).then(res => {
      return res["data"];
    });
  }

  update_annotations_by_id(id_, faces) {
    const options = {
      headers: { "content-type": "application/json" }
    };
    const data = JSON.stringify({ annotations: faces });
    return axios
      .post(`${this.url}/images/${id_}/annotations`, data, options)
      .then(res => {
        return res["data"];
      });
  }

  get_photo_data_by_id(id_) {
    return axios.get(`${this.url}images/${id_}`).then(res => {
      return res["data"];
    });
  }
}

export default Manager;
