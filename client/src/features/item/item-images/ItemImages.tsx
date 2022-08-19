import classes from "./ItemImages.module.css";
import { v4 as uuidv4 } from "uuid";
import { imageObj, ItemImagesProps } from "../itemTypes";
import TagLabel from "../../tag/tag-label/TagLabel";
import { useState } from "react";

export default function ItemImages({ images }: ItemImagesProps) {
   const [imageState, setImageState] = useState<{
      status: "success" | "loading" | "error";
      images: imageObj[];
   }>({
      status: "success",
      images: images,
   });

   const onDeleteImageClick = (idx: number) => {
      return;
   };

   return (
      <div className={classes.itemImages}>
         <div className={classes.labelWrapper}>
            <TagLabel style={{ color: "var(--slate-gray)" }}>images</TagLabel>
         </div>
         <div className={classes.imagesWrapper}>
            {images.map((image, idx) => (
               <div className={classes.imageWrapper} key={uuidv4()}>
                  <div className={classes.imageHeader}>
                     <button onClick={() => onDeleteImageClick(idx)}>X</button>
                  </div>
                  <img
                     src={image.image}
                     alt="item image"
                     className={classes.image}
                  />{" "}
               </div>
            ))}
         </div>
      </div>
   );
}
