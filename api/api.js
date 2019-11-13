const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const app = express();
const port = Number(process.env.SERVER_PORT) || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("data"));

const Manager = require("./data_manager_json");
const manager = new Manager(true);

manager.load_annotations().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
});

app.get("/images", (req, res) => {
  manager.get_images().then(data => {
    res.send(data);
  });
});

app.get("/images/id_list", (req, res) => {
  manager.get_id_list().then(ids => {
    res.send(ids);
  });
});
app.get("/images/:_id/annotations", (req, res) => {
  manager
    .get_annotations_by_id(req.params["_id"])
    .then(annotations => {
      res.send(annotations);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

app.get("/images/:_id/url", (req, res) => {
  manager
    .get_url_by_id(req.params["_id"])
    .then(url => {
      res.send(url);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

app.get("/images/:_id", (req, res) => {
  manager
    .get_image_info(req.params["_id"])
    .then(image_info => {
      res.send(image_info);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

app.post("/images/:_id/annotations", upload.array(), (req, res) => {
  let anno = req.body["annotations"];

  manager
    .update_annotations(req.params._id, anno)
    .then(() => res.status(201).send())
    .catch(err => {
      res.status(404).send(err);
    });
});
