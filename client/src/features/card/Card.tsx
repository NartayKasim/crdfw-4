import classes from "./Card.module.css";
import { ItemAsProps } from "../item/itemTypes";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "../tag/Tag";
import { useState } from "react";
import KeyIcon from "@mui/icons-material/Key";
import BarChartIcon from "@mui/icons-material/BarChart";
import LinkIcon from "@mui/icons-material/Link";
import DataObjectIcon from "@mui/icons-material/DataObject";
import IdWrapper from "./card-left/IdWrapper";
import { TagObj } from "../tag/tagTypes";

export default function Card({ itemObj }: ItemAsProps) {
   const [expandCard, setExpandCard] = useState(false);
   const tags: { [key: string]: TagObj } = {};
   itemObj.tags.forEach((tag) => {
      const tag_value = tag.tag_value;
      tags[tag_value] = { ...tag };
   });

   const handleItemClick = () => {
      window.open(`${process.env.REACT_APP_CLIENT_URL}/item/?id=${itemObj.id}`);
   };

   const handleLoveSeatLink = () => {
      window.open(tags.item_link.value);
   };

   return (
      <div className={classes.card}>
         <div className={classes.cardLeft}>
            <div className={classes.cardLeftInner}>
               <div className={classes.titleWrapper}>{itemObj.title.value}</div>
               <div className={classes.thumbnailWrapper}>
                  <img
                     src={tags.thumbnail.value}
                     alt="thumbnail"
                     className={classes.thumbnail}
                  />
               </div>
               <div className={classes.idsWrapper}>
                  <IdWrapper
                     objKey={"id"}
                     value={itemObj.id}
                     icon={<KeyIcon color="primary" className={classes.icon} />}
                  />
                  <IdWrapper
                     objKey={"upc"}
                     value={"n/a"}
                     icon={
                        <DataObjectIcon
                           color="primary"
                           className={classes.icon}
                        />
                     }
                  />
                  <IdWrapper
                     objKey={"serial"}
                     value={"n/a"}
                     icon={
                        <BarChartIcon
                           color="primary"
                           className={classes.icon}
                        />
                     }
                  />
                  <IdWrapper
                     objKey={"link"}
                     value={"LoveSeat Link"}
                     onClick={handleLoveSeatLink}
                     style={{
                        color: "var(--blue)",
                        cursor: "pointer",
                        fontWeight: 600,
                     }}
                     icon={
                        <LinkIcon color="primary" className={classes.icon} />
                     }
                  />
               </div>
            </div>
         </div>
         <div className={classes.cardRight}>
            <div className={classes.cardRightInner}>
               <div className={classes.skuWrapper}>
                  <div className={classes.sku}>{itemObj.sku.value}</div>
               </div>
               <div className={classes.tagsWrapper}>
                  {tags["5miles"] && (
                     <Tag key={uuidv4()} tagObj={tags["5miles"]} label={""} />
                  )}
                  <Tag key={uuidv4()} tagObj={tags.notes} label={""} />
                  <Tag key={uuidv4()} tagObj={tags.category} label={""} />
                  <Tag key={uuidv4()} tagObj={tags.brand} label={""} />
                  <Tag key={uuidv4()} tagObj={tags.location} label={""} />
                  <Tag key={uuidv4()} tagObj={tags.auction_price} label={""} />
                  <Tag key={uuidv4()} tagObj={tags.retail_price} label={""} />
                  <Tag key={uuidv4()} tagObj={tags.list_price} label={""} />
               </div>
            </div>
         </div>
         <button className={classes.footer} onClick={handleItemClick}>
            Go To Item
         </button>
      </div>
   );
}
