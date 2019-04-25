const Manager = require("./data_manager");
const path = require("path");

manager = new Manager(true);

(() => {
  test("proper loading", async done => {
    await manager.load_annotations();
    let data = manager.get_data();
    expect(data).toEqual({
      "5cc205d083e7a796b07dc18f": {
        _id: "5cc205d083e7a796b07dc18f",
        path: "./images/img_1.jpg",
        faces: [{ petrosyan: [113, 353, 188, 278] }]
      },
      "5cc205d083e7a796b07dc190": {
        _id: "5cc205d083e7a796b07dc190",
        path: "./images/img_2.jpg",
        faces: [{ uteshev: [236, 514, 325, 424] }]
      },
      "5cc205d083e7a796b07dc191": {
        _id: "5cc205d083e7a796b07dc191",
        path: "./images/img_3.jpg",
        faces: [
          { zhuk: [140, 808, 247, 700] },
          { petrosyan: [140, 641, 247, 533] }
        ]
      }
    });
    done();
  });

  test("proper pathes", done => {
    let pathes = manager.get_pathes();
    expect(pathes).toEqual([
      "./images/img_1.jpg",
      "./images/img_2.jpg",
      "./images/img_3.jpg"
    ]);
    done();
  });

  test("proper faces", done => {
    let faces = manager.get_faces("5cc205d083e7a796b07dc191");
    expect(faces).toEqual([
      {
        zhuk: [140, 808, 247, 700]
      },
      {
        petrosyan: [140, 641, 247, 533]
      }
    ]);
    done();
  });

  test("updating faces", done => {
    let faces = manager.get_faces("5cc205d083e7a796b07dc191");
    let old_faces = manager.get_faces("5cc205d083e7a796b07dc18f");
    manager.update_faces("5cc205d083e7a796b07dc18f", faces);
    expect(manager.get_faces("5cc205d083e7a796b07dc18f")).toEqual(faces);
    manager.update_faces("5cc205d083e7a796b07dc18f", old_faces);
    done();
  });

  test("proper absolute path", done => {
    manager.gen_absolute_pathes();

    let new_pathes = [
      path.join(__dirname, "./data", "./images/img_1.jpg"),
      path.join(__dirname, "./data", "./images/img_2.jpg"),
      path.join(__dirname, "./data", "./images/img_3.jpg")
    ];
    expect(manager.get_pathes()).toEqual(new_pathes);
    done();
  });

  test("proper relative path", async done => {
    manager.gen_relative_pathes();
    let pathes = manager.get_pathes();
    expect(pathes).toEqual([
      "./images/img_1.jpg",
      "./images/img_2.jpg",
      "./images/img_3.jpg"
    ]);

    done();
  });

  test("close", done => {
    manager.close();
    done();
  });
})();

manager.close();
