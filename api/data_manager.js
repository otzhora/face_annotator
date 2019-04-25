const fs = require("fs");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

class Manager {
  constructor(debug = false) {
    this.uri =
      "mongodb+srv://dbFaceAnnotations:MongodbPassword@faceannotatordb-bupak.gcp.mongodb.net/test?retryWrites=true";

    this.client = new MongoClient(this.uri, { useNewUrlParser: true });
    this.debug = debug;
    this.data = {};
    this.pathes = [];
    return this;
  }

  async load_annotations() {
    const collectionName = this.debug
      ? "FaceAnnotationsCODebug"
      : "FaceAnnotationsCO";

    await this.client.connect();

    await this.client
      .db("FaceAnnotatorDB")
      .collection(collectionName)
      .find({})
      .forEach(e => {
        this.data[e["_id"]] = e;
        this.data[e["_id"]]["_id"] = this.data[e["_id"]]["_id"].toString();
      });

    for (let key in this.data) this.pathes.push(this.data[key]["path"]);
  }

  update_faces(_id, new_faces) {
    if (!(_id in this.data)) return;

    this.data[_id]["faces"] = new_faces;
  }

  get_faces(_id) {
    if (!(_id in this.data)) return [];
    return Array.from(this.data[_id]["faces"]);
  }

  get_pathes() {
    return Array.from(this.pathes);
  }

  get_data() {
    return Object.assign({}, this.data);
  }

  gen_absolute_pathes() {
    for (let key in this.data) {
      let new_path = path.join(__dirname, "./data", this.data[key]["path"]);
      this.data[key]["path"] = new_path;
    }
    this.pathes = [];
    for (let key in this.data) this.pathes.push(this.data[key]["path"]);
  }

  gen_relative_pathes() {
    for (let key in this.data) {
      let rel_path = "./images/" + path.basename(this.data[key]["path"]);
      this.data[key]["path"] = rel_path;
    }
    this.pathes = [];
    for (let key in this.data) this.pathes.push(this.data[key]["path"]);
  }

  close() {
    console.log("closing");
    this.client.close();
  }
}

module.exports = Manager;
