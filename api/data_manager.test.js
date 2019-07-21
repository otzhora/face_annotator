const Manager = require("./data_manager");
const mongodb = require("mongodb");

(() => {
  test("proper loading", done => {
    let manager = new Manager(true);
    manager
      .load_annotations()
      .then(data => {
        expect(data).toEqual({
          "5d34c74f13877249f331bad3": {
            _id: mongodb.ObjectID("5d34c74f13877249f331bad3"),
            url: "photos/img_1.jpg",
            faces: [
              {
                petrosyan: [113, 353, 188, 278]
              }
            ]
          },
          "5d34c74f13877249f331bad4": {
            _id: mongodb.ObjectID("5d34c74f13877249f331bad4"),
            url: "photos/img_2.jpg",
            faces: [
              {
                uteshev: [236, 514, 325, 424]
              }
            ]
          },
          "5d34c74f13877249f331bad5": {
            _id: mongodb.ObjectID("5d34c74f13877249f331bad5"),
            url: "photos/img_3.jpg",
            faces: [
              {
                zhuk: [140, 808, 247, 700]
              },
              {
                petrosyan: [140, 641, 247, 533]
              }
            ]
          }
        });
        return manager.close();
      })
      .then(() => {
        done();
      });
  });

  test("updating faces", async done => {
    let faces1 = [
      {
        petrosyan: [113, 353, 188, 278]
      }
    ];
    let faces2 = [
      {
        zhuk: [140, 808, 247, 700]
      },
      {
        petrosyan: [140, 641, 247, 533]
      }
    ];

    let manager1 = new Manager(true);
    // img_1
    manager1
      .load_annotations()
      .then(() => {
        return manager1.update_faces("5d34c74f13877249f331bad3", faces2);
      })
      .then(() => {
        return manager1.get_faces("5d34c74f13877249f331bad3");
      })
      .then(faces => {
        expect(faces).toEqual(faces2);
        return manager1.update_faces("5d34c74f13877249f331bad3", faces1);
      })
      .then(() => {
        return manager1.get_faces("5d34c74f13877249f331bad3");
      })
      .then(faces => {
        expect(faces).toEqual(faces1);
        return manager1.close();
      })
      .then(() => done());
  });
})();
