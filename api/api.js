const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const app = express();
const port = Number(process.argv[2]) || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("data"));

const Manager = require("./data_manager");
const manager = new Manager(true);

manager.load_annotations().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
});

app.get("/images", (req, res) => {
  manager.get_data().then(data => {
    res.send(data);
  });
});

app.get("/images/:_id/annotations", (req, res) => {
  manager.get_faces(req.params["_id"]).then(face_array => {
    res.send(face_array);
  });
});

app.get("/images/:_id", (req, res) => {
  manager.get_url(req.params["_id"]).then(face_array => {
    res.send(face_array);
  });
});

app.post("/images/:_id/annotations", upload.array(), (req, res) => {
  let faces = req.body["faces"];
  manager
    .update_faces(req.params._id, faces)
    .then(() => res.send("Oki"))
    .catch(console.log);
});
