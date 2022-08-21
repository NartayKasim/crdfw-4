import classes from "./Item.module.css";
import { ItemProps } from "./itemTypes";
import { TagObj } from "../tag/tagTypes";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "../tag/Tag";
import KeyIcon from "@mui/icons-material/Key";
import BarChartIcon from "@mui/icons-material/BarChart";
import LinkIcon from "@mui/icons-material/Link";
import DataObjectIcon from "@mui/icons-material/DataObject";
import IdWrapper from "../card/card-left/IdWrapper";
import ItemTags from "./item-tags/ItemTags";
import ItemImages from "./item-images/ItemImages";
import StoreIcon from "@mui/icons-material/Store";
import CreateTag from "../tag/create-tag/CreateTag";

export default function Item({ itemObj, setStatus, getItem }: ItemProps) {
   const tags: { [key: string]: TagObj } = {};
   itemObj.tags.forEach((tag) => {
      const tag_value = tag.tag_value;
      tags[tag_value] = { ...tag };
   });

   const handleLoveSeatLink = () => {
      window.open(tags.item_link.value);
   };

   return (
      <div className={classes.item}>
         <div className={classes.itemLeft}>
            <div className={classes.itemLeftInner}>
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
                     objKey={"sku"}
                     value={itemObj.sku.value}
                     icon={
                        <StoreIcon color="primary" className={classes.icon} />
                     }
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
               <div className={classes.itemTagsWrapper}>
                  <ItemTags tags={tags} />
               </div>
            </div>
         </div>
         <div className={classes.itemRightInner}>
            <div className={classes.createTagWrapper}>
               <CreateTag itemObj={itemObj} getItem={getItem} />
            </div>
            <Tag key={uuidv4()} tagObj={tags.description} label={""} />
            <div className={classes.imagesWrapper}>
               <ItemImages images={itemObj.images} id={itemObj.id} />
            </div>
         </div>
      </div>
   );
}
