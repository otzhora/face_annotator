const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

class Manager {
  constructor(
    user_name,
    user_password,
    cluster_location,
    db_name,
    collectionName
  ) {
    this.user_name = user_name || "dbAnnotationUser";
    this.user_password = user_password || "dbAnnotationPassword";
    this.cluster_location =
      cluster_location || "cluster0-zmdg3.gcp.mongodb.net";
    let url = process.env.DB_URL;
    this.url =
      url ||
      `mongodb+srv://${this.user_name}:${this.user_password}@${this.cluster_location}/test?retryWrites=true&w=majority`;

    this.db_name = db_name || "pm-anniversary";
    this.collectionName = collectionName || "faceAnnotationsDebug";

    this.client = new MongoClient(this.url, { useNewUrlParser: true });
    this.data = {};
    this.urls = [];
    return this;
  }

  load_annotations() {
    const collectionName = this.collectionName;

    return this.client
      .connect()
      .then(() => {
        return this.client
          .db(this.db_name)
          .collection(collectionName)
          .find({})
          .toArray();
      })
      .then(annotations => {
        for (let i = 0; i < annotations.length; i++) {
          let id = annotations[i]["_id"].toString();
          this.data[id] = annotations[i];
        }

        for (let id in this.data) this.urls.push(this.data[id]["url"]);

        return Object.assign({}, this.data);
      })
      .catch(console.log);
  }

  update_annotations(_id, anno) {
    if (!(_id in this.data)) return Promise.reject("id is not valid");

    const collectionName = this.collectionName;

    return this.client
      .db(this.db_name)
      .collection(collectionName)
      .updateMany(
        { _id: new mongodb.ObjectID(_id) },
        { $set: { annotations: anno } }
      )
      .then(() => {
        this.data[_id]["annotations"] = anno;
      })
      .catch(err => {
        return err;
      });
  }
  get_annotations_by_id(_id) {
    if (!(_id in this.data)) return Promise.reject("id is not valid");
    return Promise.resolve(Array.from(this.data[_id]["annotations"]));
  }

  get_id_list() {
    return Promise.resolve(Object.keys(this.data));
  }

  get_url_by_id(_id) {
    if (!(_id in this.data)) return Promise.reject("id is not valid");
    return Promise.resolve(this.data[_id]["url"]);
  }

  get_images() {
    return Promise.resolve(Object.assign({}, this.data));
  }

  get_image_info(_id) {
    if (!(_id in this.data)) return Promise.reject("id is not valid");
    return Promise.resolve(Object.assign({}, this.data[_id]));
  }

  close() {
    return this.client.close();
  }
}

module.exports = Manager;
