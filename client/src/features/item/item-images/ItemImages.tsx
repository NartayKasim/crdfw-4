import classes from "./ItemImages.module.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { imageObj, ItemImagesProps } from "../itemTypes";
import { useState } from "react";
import TagLabel from "../../tag/tag-label/TagLabel";
import { AxiosResponse } from "axios";

export default function ItemImages({ images, id }: ItemImagesProps) {
   const [imageState, setImageState] = useState<{
      status: "success" | "loading" | "error";
      images: imageObj[];
   }>({
      status: "success",
      images: images,
   });

   const [imageInput, setImageInput] = useState("");

   const toggleLoadState = () => {
      setImageState({ ...imageState, status: "loading" });
   };

   const toggleErrorState = () => {
      setImageState({ ...imageState, status: "error" });
   };

   const handleResponse = (response: AxiosResponse) => {
      if (response.data)
         setImageState({ status: "success", images: response.data });
      else {
         toggleErrorState();
      }
   };

   const onDeleteImageClick = async (idx: number) => {
      toggleLoadState();
      const response = await axios.put("/api/inventory/item/delete-image", {
         image: imageState.images[idx],
      });
      handleResponse(response);
   };

   const onAddImageClick = async () => {
      toggleLoadState();
      const response = await axios.put("/api/inventory/item/add-image", {
         image: imageInput,
         id: id,
      });
      handleResponse(response);
   };

   return (
      <div className={classes.itemImages}>
         <div className={classes.labelWrapper}>
            <TagLabel
               style={{
                  color: "var(--gunmetal)",
                  background: "var(--gainsboro)",
               }}
            >
               images
            </TagLabel>
         </div>
         <div className={classes.imagesWrapper}>
            {imageState.images.map((image, idx) => (
               <div className={classes.imageWrapper} key={uuidv4()}>
                  <div className={classes.imageHeader}>
                     <button onClick={() => onDeleteImageClick(idx)}>X</button>
                  </div>
                  <img
                     src={image.image}
                     alt="item image"
                     className={classes.image}
                  />
               </div>
            ))}
         </div>

         <div className={classes.addImagesWrapper}>
            <div className={classes.urlsWrapper}>
               <TagLabel
                  style={{
                     color: "var(--gunmetal)",
                     background: "var(--gainsboro)",
                  }}
               >
                  image urls
               </TagLabel>

               {imageState.images.map((image) => (
                  <div className={classes.urlWrapper} key={uuidv4()}>
                     <div className={classes.url}>{image.image}</div>
                  </div>
               ))}
            </div>
            <div className={classes.addImage}>
               <TagLabel
                  style={{
                     color: "var(--gunmetal)",
                     background: "var(--gainsboro)",
                  }}
               >
                  add image
               </TagLabel>
               <label className={classes.addImageLabel} htmlFor="add-image">
                  <input
                     onChange={(e) => setImageInput(e.target.value)}
                     className={classes.addImageInput}
                     name="add-image"
                     id="add-image"
                     placeholder="enter image url here"
                  />
                  <button
                     className={classes.addImageButton}
                     onClick={onAddImageClick}
                  >
                     Add Image
                  </button>
               </label>
            </div>
         </div>
      </div>
   );
}
