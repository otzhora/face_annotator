const nanoid = require("nanoid");
const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class Manager {
  constructor() {
    this.data = {};
    this.file_path = process.env.FILE_PATH || "./data/faces_test.json";
  }

  load_annotations() {
    return readFile(this.file_path).then(data => {
      let json = JSON.parse(data);

      for (let key in json) {
        this.data[nanoid()] = {
          path: key,
          annotations: json[key]
        };
      }

      return Object.assign({}, this.data);
    });
  }

  _convert_to_json() {
    let json = {};
    for (let key in this.data) {
      json[this.data[key]["path"]] = this.data[key]["annotations"];
    }
    return JSON.stringify(json);
  }

  update_annotations(_id, anno) {
    if (!(_id in this.data)) return Promise.reject("id is not valid");
    this.data[_id]["annotations"] = anno;
    return writeFile(this.file_path, this._convert_to_json()).catch(err => {
      return err;
    });
  }

  get_annotations_by_id(_id) {
    if (!(_id in this.data)) return Promise.reject("id is not valid");
    return Promise.resolve(this.data[_id]["annotations"]);
  }

  get_id_list() {
    return Promise.resolve(Object.keys(this.data));
  }

  get_url_by_id(_id) {
    if (!(_id in this.data)) return Promise.reject("id is not valid");
    return Promise.resolve(this.data[_id]["path"]);
  }

  get_images() {
    return Promise.resolve(Object.assign({}, this.data));
  }

  get_image_info(_id) {
    if (!(_id in this.data)) return Promise.reject("id is not valid");
    return Promise.resolve(this.data[_id]);
  }
}

module.exports = Manager;
