import classes from "./ActiveTag.module.css";
import { ActiveTagProps } from "../tagTypes";

import TagLabel from "../tag-label/TagLabel";
import TagValue from "../tag-value/TagValue";
import TagInput from "../tag-input/TagInput";
import TagFooter from "../tag-footer/TagFooter";
import TagDateAndEdit from "../tag-date-and-edit/TagDateAndEdit";

export default function ActiveTag({
   tag,
   displayDate,
   toggleEditState,
   handleChange,
   onUpdateValueClick,
   handleDescriptionChange,
   onToggleValueTag,
   style,
   ...rest
}: ActiveTagProps) {
   const colors = {
      "5miles": {
         background: "rgba(0, 128, 0, 0.328)",
         color: "var(--gunmetal)",
      },

      description: {
         background: "rgba(128, 0, 128, 0.378)",
         color: "var(--gunmetal)",
      },
   };

   if (tag.tag_value === "5miles")
      return (
         <div className={classes.tagWrapper} {...rest}>
            <TagLabel style={{ ...colors["5miles"] }}>
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
                     value_type={tag.value_type}
                  />
               </>
            )}
         </div>
      );
   else
      return (
         <div className={classes.tagWrapper} {...rest}>
            <TagLabel
               style={{
                  background: "rgba(128, 0, 128, 0.278)",
                  color: "var(--gunmetal)",
               }}
            >
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
                     value_type={tag.value_type}
                  />
               </>
            )}
         </div>
      );
}
