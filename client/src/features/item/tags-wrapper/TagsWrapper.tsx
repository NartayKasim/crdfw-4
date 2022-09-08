import classes from "./TagsWrapper.module.css";
import { v4 as uuidv4 } from "uuid";
import { TagsWrapperProps } from "../itemTypes";
import { TagObj } from "../../tag/tagTypes";
import { Tag } from "../../tag/Tag";

export default function TagsWrapper({
   filterArr,
   tags,
   getItemObj,
   children,
}: TagsWrapperProps) {
   const activeTags: TagObj[] = [];
   const coreTags: { [key: string]: TagObj } = {};
   const disabledTags: TagObj[] = [];

   const coreTagsOrder = [
      "location",
      "brand",
      "category",
      "auction_price",
      "retail_price",
      "list_price",
      "sale_price",
      "sale_date",
   ];

   if (filterArr.includes("active")) {
      tags.forEach((tag) => {
         if (tag.value_type === "active") activeTags.push(tag);
      });
   }
   if (filterArr.includes("core")) {
      tags.forEach((tag) => {
         if (tag.value_type === "core") coreTags[tag.tag_value] = tag;
      });
   }
   if (filterArr.includes("disabled")) {
      tags.forEach((tag) => {
         if (tag.value_type === "disabled") disabledTags.push(tag);
      });
   }

   return (
      <div className={classes.tagsWrapper}>
         {children}
         {activeTags.length > 0 &&
            activeTags.map((tag) => (
               <Tag getItemObj={getItemObj} key={uuidv4()} tagObj={tag} />
            ))}
         {filterArr.includes("core") &&
            coreTagsOrder.map((tag_value) => (
               <Tag
                  getItemObj={getItemObj}
                  key={uuidv4()}
                  tagObj={coreTags[tag_value]}
               />
            ))}
         {disabledTags.length > 0 &&
            disabledTags.map((tag) => (
               <Tag getItemObj={getItemObj} key={uuidv4()} tagObj={tag} />
            ))}
      </div>
   );
}
