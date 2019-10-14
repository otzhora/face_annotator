# Custom data_manager

data_manager methods:

1. load_annotaions() -> returns Promise with annotations object

this object keys are ids of images, each value is annotation object

keys of annotation object are "\_id", "url", "annotations"

2. update_annotations(\_id, anno)

should return empty Promise

3. get_anno_by_id(\_id)

return Promisified annotation object

4. get_id_list()

returns Promise

5. get_url_by_id(\_id)

returns Promise

6. get_images()

7. get_image_info(\_id)
