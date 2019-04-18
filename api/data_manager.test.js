const Manager = require("./data_manager");
const path = require("path");

manager = new Manager("./data/faces_test.json");

test("proper loading", () => {
  let data = manager.get_data();
  expect(data).toEqual({
    "./images/img_1.jpg": [
      {
        petrosyan: [113, 353, 188, 278]
      }
    ],
    "./images/img_2.jpg": [
      {
        uteshev: [236, 514, 325, 424]
      }
    ],
    "./images/img_3.jpg": [
      {
        zhuk: [140, 808, 247, 700]
      },
      {
        petrosyan: [140, 641, 247, 533]
      }
    ]
  });
});

test("proper pathes", () => {
  let pathes = manager.get_pathes();
  expect(pathes).toEqual([
    "./images/img_1.jpg",
    "./images/img_2.jpg",
    "./images/img_3.jpg"
  ]);
});

test("proper faces", () => {
  let faces = manager.get_faces("./images/img_3.jpg");
  expect(faces).toEqual([
    {
      zhuk: [140, 808, 247, 700]
    },
    {
      petrosyan: [140, 641, 247, 533]
    }
  ]);
});

test("updating faces", () => {
  let faces = manager.get_faces("./images/img_3.jpg");
  manager.update_faces("./images/img_1.jpg", faces);
  expect(manager.get_faces("./images/img_1.jpg")).toEqual(faces);
});

test("proper refactor", () => {
  manager.refactor_pathes();

  let new_pathes = [
    path.join(__dirname, "./data", "./images/img_1.jpg"),
    path.join(__dirname, "./data", "./images/img_2.jpg"),
    path.join(__dirname, "./data", "./images/img_3.jpg")
  ];
  expect(manager.get_pathes()).toEqual(new_pathes);
});
