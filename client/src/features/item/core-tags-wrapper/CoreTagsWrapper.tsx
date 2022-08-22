import classes from "./CoreTagsWrapper.module.css";
import { v4 as uuidv4 } from "uuid";
import { CoreTagsWrapperProps } from "./../itemTypes";
import { Tag } from "../../tag/Tag";

export default function CoreTagsWrapper({
   tags,
   getItemObj,
}: CoreTagsWrapperProps) {
   const filterTag = (tag_value: string) => {
      const filterArr = tags.filter((tag) => tag.tag_value === tag_value);
      if (filterArr[0])
         return (
            <Tag getItemObj={getItemObj} key={uuidv4()} tagObj={filterArr[0]} />
         );
      else return null;
   };

   return <div className={classes.coreTagsWrapper}>{filterTag("brand")}</div>;
}
