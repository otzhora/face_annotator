const fs = require("fs");
const path = require("path");

class Manager {
  constructor(imgs_path = "./data/faces.json") {
    let rawdata = fs.readFileSync(imgs_path);
    this.data = JSON.parse(rawdata);
  }

  update_faces(img_path, new_faces) {
    if (!(img_path in this.data)) return;

    this.data[img_path] = new_faces;
  }

  get_faces(img_path) {
    if (!(img_path in this.data)) return [];
    return Array.from(this.data[img_path]);
  }

  get_pathes() {
    return Object.keys(this.data);
  }

  get_data() {
    return Object.assign({}, this.data);
  }

  update_db() {}

  refactor_pathes() {
    for (let img_path in this.data) {
      let new_path = path.join(__dirname, "./data", img_path);
      this.data[new_path] = this.data[img_path];
      delete this.data[img_path];
    }
  }
}

module.exports = Manager;
