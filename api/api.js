const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Manager = require("./data_manager");
const manager = new Manager(true);

// load annotations
(async () => {
  await manager.load_annotations();
  manager.gen_absolute_pathes();
})();

app.get("/images", (req, res) => {
  res.send(manager.get_data());
});

app.get("/images/:_id/annotations", (req, res) => {
  res.send(manager.get_faces(req.params["_id"]));
});

app.post("/images/:_id/annotations", upload.array(), (req, res) => {
  let faces = req.body["faces"];
  manager
    .update_faces(req.params._id, faces)
    .then(() => res.send("Oki"))
    .catch(console.log);
});

const port = 5001;
app.listen(port, () => console.log(`Listening on port ${port}`));
