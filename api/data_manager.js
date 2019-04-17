const fs = require("fs");

class Manager {
  constructor() {
    let rawdata = fs.readFileSync("./data/faces.json");
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
    return Object.assign({}, this.data); // we need this to return a copy of our data
  }

  update_db() {}
}

module.exports = Manager;
