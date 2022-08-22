import classes from "./CoreTag.module.css";
import { CoreTagProps } from "../tagTypes";

import DescriptionTag from "../description-tag/DescriptionTag";
import TagLabel from "../tag-label/TagLabel";
import TagValue from "../tag-value/TagValue";
import TagInput from "../tag-input/TagInput";
import TagFooter from "../tag-footer/TagFooter";
import TagDateAndEdit from "../tag-date-and-edit/TagDateAndEdit";

export default function CoreTag({
   tag,
   displayDate,
   toggleEditState,
   handleChange,
   onUpdateValueClick,
   handleDescriptionChange,
   onToggleValueTag,
   onDeleteTagClick,
   style,
   ...rest
}: CoreTagProps) {
   if (tag.tag_value === "description")
      return (
         <DescriptionTag
            tag={tag}
            displayDate={displayDate}
            toggleEditState={toggleEditState}
            handleDescriptionChange={handleDescriptionChange}
            onUpdateValueClick={onUpdateValueClick}
         />
      );
   else
      return (
         <div className={classes.tagWrapper} {...rest}>
            <TagLabel style={style}>
               {tag.tag_value}
               <TagDateAndEdit
                  toggleEditState={toggleEditState}
                  displayDate={displayDate}
                  date={tag.date}
               />
            </TagLabel>
            {!tag.editState ? (
               <TagValue
                  className={classes.value}
                  style={{ color: "var(--gunmetal)", textTransform: "none" }}
               >
                  {tag.value}
               </TagValue>
            ) : (
               <>
                  <TagInput
                     value={tag.value}
                     onChange={handleChange}
                     name={tag.tag_value}
                     placeholder={tag.tag_value}
                  />
                  <TagFooter
                     onUpdateValueClick={onUpdateValueClick}
                     toggleEditState={toggleEditState}
                     onToggleValueTag={onToggleValueTag}
                     onDeleteTagClick={onDeleteTagClick}
                     value_type={tag.value_type}
                  />
               </>
            )}
         </div>
      );
}
