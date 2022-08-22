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
   const tagsArray: TagObj[] = [];
   const forbiddenTags = [
      "description",
      "item_link",
      "thumbnail",
      "sale_date",
      "sale_price",
   ];
   filterArr.forEach((filter) => {
      tags.forEach((tag) => {
         if (
            tag.value_type === filter &&
            !forbiddenTags.includes(tag.tag_value)
         ) {
            tagsArray.push(tag);
         }
      });
   });
   return (
      <div className={classes.tagsWrapper}>
         {children}
         {tagsArray.map((tag) => (
            <Tag getItemObj={getItemObj} key={uuidv4()} tagObj={tag} />
         ))}
      </div>
   );
}
