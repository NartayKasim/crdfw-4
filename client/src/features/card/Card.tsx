import classes from "./Card.module.css";
import { ItemAsProps } from "../item/itemTypes";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Tag } from "../tag/Tag";
import { TagObj } from "../tag/tagTypes";
import { ItemObj } from "../item/itemTypes";
import { AxiosResponse } from "axios";
import axios from "axios";
import KeyIcon from "@mui/icons-material/Key";
import BarChartIcon from "@mui/icons-material/BarChart";
import LinkIcon from "@mui/icons-material/Link";
import DataObjectIcon from "@mui/icons-material/DataObject";
import IdWrapper from "./card-left/IdWrapper";
import TagsWrapper from "../item/tags-wrapper/TagsWrapper";

export default function Card({ itemObj }: ItemAsProps) {
   const [itemState, setItemState] = useState<{
      status: "success" | "loading" | "error";
      item: ItemObj;
   }>({
      status: "success",
      item: itemObj,
   });

   const tags: { [key: string]: TagObj } = {};
   itemObj.tags.forEach((tag) => {
      const tag_value = tag.tag_value;
      tags[tag_value] = { ...tag };
   });
   const setStatus = (status: "success" | "loading" | "error") => {
      setItemState({ ...itemState, status });
   };

   const handleResponse = (response: AxiosResponse) => {
      if (response.data)
         setItemState({ status: "success", item: response.data });
      else setItemState({ status: "error", item: itemObj });
   };

   const getShortItem = async () => {
      console.log("a");
      setStatus("loading");
      const response = await axios.put("/api/inventory/short-item", {
         itemObj,
      });
      handleResponse(response);
   };

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
                  <TagsWrapper
                     filterArr={["active", "core"]}
                     tags={itemState.item.tags}
                     getItemObj={getShortItem}
                  ></TagsWrapper>
                  {/* {tags["5miles"] && (
                     <Tag
                        key={uuidv4()}
                        tagObj={tags["5miles"]}
                        getItemObj={getShortItem}
                     />
                  )}
                  <Tag
                     key={uuidv4()}
                     tagObj={tags.notes}
                     getItemObj={getShortItem}
                  />
                  <Tag
                     key={uuidv4()}
                     tagObj={tags.category}
                     getItemObj={getShortItem}
                  />
                  <Tag
                     key={uuidv4()}
                     tagObj={tags.brand}
                     getItemObj={getShortItem}
                  />
                  <Tag
                     key={uuidv4()}
                     tagObj={tags.location}
                     getItemObj={getShortItem}
                  />
                  <Tag
                     key={uuidv4()}
                     tagObj={tags.auction_price}
                     getItemObj={getShortItem}
                  />
                  <Tag
                     key={uuidv4()}
                     tagObj={tags.retail_price}
                     getItemObj={getShortItem}
                  />
                  <Tag
                     key={uuidv4()}
                     tagObj={tags.list_price}
                     getItemObj={getShortItem}
                  /> */}
               </div>
            </div>
         </div>
         <button className={classes.footer} onClick={handleItemClick}>
            Go To Item
         </button>
      </div>
   );
}
