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
      });

    for (let key in this.data) this.pathes.push(this.data[key]["path"]);
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
    return Array.from(this.pathes);
  }

  get_data() {
    //await this.load_annotations();
    return Object.assign({}, this.data);
  }

  update_db() {}

  gen_absolute_pathes() {
    for (let img_path in this.data) {
      let new_path = path.join(__dirname, "./data", img_path);
      this.data[new_path] = this.data[img_path];
      delete this.data[img_path];
    }
  }

  gen_relative_pathes() {
    for (let img_path in this.data) {
      let img_name = "./images/" + path.basename(img_path);
      this.data[img_name] = this.data[img_path];
      delete this.data[img_path];
    }
  }
}

(async () => {
  const manager = new Manager();
  await manager.load_annotations();
  console.log(manager.get_pathes());
})();

module.exports = Manager;
