import classes from "./Item.module.css";
import { FullItemObjAsProps, FullItemObj } from "./itemTypes";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "../tag/Tag";
import KeyIcon from "@mui/icons-material/Key";
import BarChartIcon from "@mui/icons-material/BarChart";
import LinkIcon from "@mui/icons-material/Link";
import DataObjectIcon from "@mui/icons-material/DataObject";
import AdjustIcon from "@mui/icons-material/Adjust";
import axios from "axios";

function ItemTags({ itemObj }: FullItemObjAsProps) {
   const brand = itemObj.tags.filter((tag) => tag.tag_value === "brand")[0];
   const category = itemObj.tags.filter(
      (tag) => tag.tag_value === "category"
   )[0];
   const list_price = itemObj.tags.filter(
      (tag) => tag.tag_value === "list_price"
   )[0];
   const auction_price = itemObj.tags.filter(
      (tag) => tag.tag_value === "auction_price"
   )[0];
   const retail_price = itemObj.tags.filter(
      (tag) => tag.tag_value === "retail_price"
   )[0];
   const location = itemObj.tags.filter(
      (tag) => tag.tag_value === "location"
   )[0];
   const notes = itemObj.tags.filter((tag) => tag.tag_value === "notes")[0];
   const fiveMiles = itemObj.tags.filter((tag) => tag.tag_value === "5miles");

   return (
      <div className={classes.itemTagsWrapper}>
         {fiveMiles.length && (
            <Tag key={uuidv4()} tagObj={fiveMiles[0]} label={""} />
         )}
         <Tag key={uuidv4()} tagObj={notes} label={""} />
         <Tag key={uuidv4()} tagObj={category} label={""} />
         <Tag key={uuidv4()} tagObj={brand} label={""} />
         <Tag key={uuidv4()} tagObj={location} label={""} />
         <Tag key={uuidv4()} tagObj={auction_price} label={""} />
         <Tag key={uuidv4()} tagObj={retail_price} label={""} />
         <Tag key={uuidv4()} tagObj={list_price} label={""} />
      </div>
   );
}

function ItemImages({ itemObj }: FullItemObjAsProps) {
   const onImageClick = ({ id, image }: { id: string; image: string }) => {
      window.open(image);
   };

   const onDeleteImageClick = ({
      id,
      image,
   }: {
      id: string;
      image: string;
   }) => {};

   return (
      <div className={classes.itemImagesWrapper}>
         {itemObj.images.map((image) => (
            <div className={classes.imageWrapper} key={uuidv4()}>
               <div
                  className={classes.deleteImageIcon}
                  onClick={() => onDeleteImageClick(image)}
               >
                  X
               </div>
               <img
                  onClick={() => onImageClick(image)}
                  src={image.image}
                  alt="item image"
                  className={classes.image}
               />
            </div>
         ))}
      </div>
   );
}

export default function Item() {
   const [item, setItem] = useState<FullItemObj | null>(null);
   const [searchParams] = useSearchParams();
   const id = searchParams.get("id");
   const thumbnail =
      item && item.tags.filter((tag) => tag.tag_value === "thumbnail")[0];
   const getItem = async () => {
      const response = await axios.put("/api/inventory/item", { id });
      if (response.data) setItem(response.data);
   };

   const handleLoveSeatLink = () => {
      if (!item) return;
      const item_link = item.tags.filter(
         (tag) => tag.tag_value === "item_link"
      )[0];
      window.open(item_link.value);
   };

   useEffect(() => {
      !item && getItem();
   }, [item]);

   return (
      <div className={classes.item}>
         <div className={classes.headerWrapper}>
            <div className={classes.header}>
               <div className={classes.headerLeft}>
                  <div className={classes.thumbnailWrapper}>
                     {thumbnail && (
                        <img
                           src={thumbnail.value}
                           alt="item_thumbnail"
                           className={classes.thumbnail}
                        />
                     )}
                  </div>
               </div>
               <div className={classes.headerRight}>
                  <div className={classes.titleWrapper}>
                     {item && item.title.value}
                  </div>
               </div>
            </div>
         </div>

         {item && (
            <div className={classes.detailsWrapper}>
               <div className={classes.idWrapper}>
                  <div className={classes.keyWrapper}>
                     <div className={classes.key}>
                        <KeyIcon color="primary" className={classes.icon} />
                        ID
                     </div>
                  </div>
                  <div className={classes.value}>{item.id}</div>
               </div>
               <div className={classes.idWrapper}>
                  <div className={classes.keyWrapper}>
                     <div className={classes.key}>
                        <AdjustIcon color="primary" className={classes.icon} />
                        SKU
                     </div>
                  </div>
                  <div className={classes.value}>{item.sku.value}</div>
               </div>
               <div className={classes.serialWrapper}>
                  <div className={classes.keyWrapper}>
                     <div className={classes.key}>
                        <BarChartIcon
                           color="primary"
                           className={classes.icon}
                        />
                        Serial
                     </div>
                  </div>
                  <div className={classes.value}>
                     {item.serial.value || "n/a"}
                  </div>
               </div>

               <div className={classes.serialWrapper}>
                  <div className={classes.keyWrapper}>
                     <div className={classes.key}>
                        <DataObjectIcon
                           color="primary"
                           className={classes.icon}
                        />
                        UPC
                     </div>
                  </div>
                  <div className={classes.value}>n/a</div>
               </div>

               <div className={classes.serialWrapper}>
                  <div className={classes.keyWrapper}>
                     <div className={classes.key}>
                        <LinkIcon color="primary" className={classes.icon} />
                        Item Link
                     </div>
                  </div>
                  <div
                     className={classes.linkValue}
                     onClick={() => handleLoveSeatLink()}
                  >
                     LoveSeat Link
                  </div>
               </div>
            </div>
         )}

         {item && <ItemTags itemObj={item} />}
         {item && <ItemImages itemObj={item} />}
      </div>
   );
}
