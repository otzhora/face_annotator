const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");

const url = `mongodb+srv://abc:123@cluster0-1uyqc.mongodb.net/test?retryWrites=true&w=majority`;

const ann_path = "./data/faces_test.json";
const db_name = "pm-anniversary";
const collection_name = "faceAnnotationsDebug";

const data = JSON.parse(fs.readFileSync(ann_path));
const subm = [];

for (let key in data) {
  subm.push({ url: key, faces: data[key] });
}

const client = new MongoClient(url, { useNewUrlParser: true });

client
  .connect()
  .then(client => {
    return client
      .db(db_name)
      .collection(collection_name)
      .insertMany(subm);
  })
  .then(result => {
    console.log("Insertion result: \n", result);
    client.close();
  })
  .catch(console.log);
