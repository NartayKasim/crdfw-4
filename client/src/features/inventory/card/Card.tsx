import classes from "./Card.module.css";
import { ItemAsProps } from "../../item/itemTypes";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "../../tag/Tag";
import { useState } from "react";
import KeyIcon from "@mui/icons-material/Key";
import BarChartIcon from "@mui/icons-material/BarChart";
import LinkIcon from "@mui/icons-material/Link";
import DataObjectIcon from "@mui/icons-material/DataObject";

export default function Card({ itemObj }: ItemAsProps) {
   const [expandCard, setExpandCard] = useState(false);

   const thumbnail = itemObj.tags.filter(
      (tag) => tag.tag_value === "thumbnail"
   )[0];
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

   const item_link = itemObj.tags.filter(
      (tag) => tag.tag_value === "item_link"
   )[0];

   const onItemLinkClick = () => {
      window.open(`${process.env.REACT_APP_CLIENT_URL}/item/?id=${itemObj.id}`);
   };

   const handleLoveSeatLink = () => {
      window.open(item_link.value);
   };

   return (
      <div className={classes.card}>
         <div className={classes.header}>
            <div className={classes.titleWrapper}>
               {itemObj.title.value}
               <div className={classes.skuWrapper}>
                  <div className={classes.sku}>{itemObj.sku.value}</div>
               </div>
            </div>
         </div>
         <div className={classes.bodyLeft}>
            <div className={classes.thumbnailWrapper}>
               <img
                  src={thumbnail.value}
                  className={classes.thumbnail}
                  alt=""
               />
            </div>
         </div>
         <div className={classes.accent} />
         <div className={classes.bodyRight}>
            <div className={classes.bodyRightStatic}>
               <div className={classes.idWrapper}>
                  <div className={classes.keyWrapper}>
                     <div className={classes.key}>
                        <KeyIcon color="primary" className={classes.icon} />
                        ID
                     </div>
                  </div>
                  <div className={classes.value}>{itemObj.id}</div>
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
                     {itemObj.serial.value || "n/a"}
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

            <div className={classes.bodyRightStatic}>
               {fiveMiles.length && (
                  <Tag key={uuidv4()} tagObj={fiveMiles[0]} label={""} />
               )}
               <Tag key={uuidv4()} tagObj={notes} label={""} />
               <Tag key={uuidv4()} tagObj={category} label={""} />
               <div
                  className={
                     expandCard
                        ? classes.expandTagsWrapperActive
                        : classes.expandTagsWrapper
                  }
               >
                  <Tag key={uuidv4()} tagObj={brand} label={""} />
                  <Tag key={uuidv4()} tagObj={location} label={""} />
                  <Tag key={uuidv4()} tagObj={auction_price} label={""} />
                  <Tag key={uuidv4()} tagObj={retail_price} label={""} />
                  <Tag key={uuidv4()} tagObj={list_price} label={""} />
               </div>
            </div>
         </div>
         <div className={classes.hasTagWrapper}>
            <div className={classes.hasTagHeader}>Item Tags</div>
            <div className={classes.hasTagBody}>
               {itemObj.tags.map((tag) => {
                  if (!tag.tag_value) return null;
                  else {
                     return (
                        <div
                           onClick={() => setExpandCard(true)}
                           key={uuidv4()}
                           className={classes.hasTag}
                        >
                           {tag.tag_value}
                        </div>
                     );
                  }
               })}
            </div>
         </div>
         <div className={classes.expandTagsFooter}>
            <button
               className={classes.openItemButton}
               onClick={() => onItemLinkClick()}
            >
               Open Item
            </button>
            <button
               className={classes.expandTagsButton}
               onClick={() => setExpandCard(!expandCard)}
            >
               Expand Tags
            </button>
         </div>
      </div>
   );
}
