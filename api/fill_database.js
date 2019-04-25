const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const path = require("path");

const ann_path = "./data/faces_test.json";
const uri =
  "mongodb+srv://dbFaceAnnotations:MongodbPassword@faceannotatordb-bupak.gcp.mongodb.net/test?retryWrites=true";
const collection_name = "FaceAnnotationsCODebug";
const db_name = "FaceAnnotatorDB";

let data = JSON.parse(fs.readFileSync(ann_path));

let subm = [];

for (let key in data) {
  subm.push({ path: key, faces: data[key] });
}

const client = new MongoClient(uri, { useNewUrlParser: true });

(async () => {
  await client.connect();
  await client
    .db(db_name)
    .collection(collection_name)
    .insertMany(subm);

  await client.close();
})();
