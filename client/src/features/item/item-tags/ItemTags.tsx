import classes from "./ItemTags.module.css";
import { v4 as uuidv4 } from "uuid";
import { TagsObj } from "../../tag/tagTypes";
import { Tag } from "../../tag/Tag";

export default function ItemTags({ tags }: TagsObj) {
   const TAG_ORDER = [
      "5miles",
      "notes",
      "location",
      "brand",
      "category",
      "auction_price",
      "retail_price",
      "list_price",
   ];

   return (
      <div className={classes.itemTags}>
         {TAG_ORDER.map((tag_value) => {
            if (tags[tag_value]) {
               return (
                  <Tag key={uuidv4()} tagObj={tags[tag_value]} label={""} />
               );
            }
         })}
      </div>
   );
}
