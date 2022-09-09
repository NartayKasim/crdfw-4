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
   onDeleteTagClick,
   style,
   ...rest
}: ActiveTagProps) {
   const colors = {
      "5miles": {
         background: "rgba(0, 128, 0, 0.328)",
         borderRadius: "0.25rem",
         color: "var(--gunmetal)",
      },

      default: {
         background: "rgba(128, 0, 128, 0.378)",
         borderRadius: "0.25rem",
         color: "var(--gunmetal)",
      },

      facebook: {
         background: "rgb(66, 103, 178)",
         borderRadius: "0.25rem",
         color: "var(--cultured)",
      },

      "NOTE TO SELF": {
         background: "var(--note-to-self)",
         borderRadius: "0.25rem",
         color: "var(--charleston-green)",
      },

      "PRICE CHANGE": {
         background: "var(--price-change)",
         borderRadius: "0.25rem",
         color: "var(--cultured)",
      },

      EXPENSES: {
         background: "var(--expenses)",
         borderRadius: "0.25rem",
         color: "var(--cultured)",
      },
   };

   const renderSwitch = () => {
      switch (tag.tag_value) {
         case "EXPENSES":
            return (
               <div className={classes.tagWrapper} {...rest}>
                  <TagLabel style={{ ...colors["EXPENSES"] }}>
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
                        style={{
                           color: "var(--gunmetal)",
                           textTransform: "none",
                        }}
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
                           onDeleteTagClick={onDeleteTagClick}
                        />
                     </>
                  )}
               </div>
            );
         case "PRICE CHANGE":
            return (
               <div className={classes.tagWrapper} {...rest}>
                  <TagLabel style={{ ...colors["PRICE CHANGE"] }}>
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
                        style={{
                           color: "var(--gunmetal)",
                           textTransform: "none",
                        }}
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
                           onDeleteTagClick={onDeleteTagClick}
                        />
                     </>
                  )}
               </div>
            );
         case "NOTE TO SELF":
            return (
               <div className={classes.tagWrapper} {...rest}>
                  <TagLabel style={{ ...colors["NOTE TO SELF"] }}>
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
                        style={{
                           color: "var(--gunmetal)",
                           textTransform: "none",
                        }}
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
                           onDeleteTagClick={onDeleteTagClick}
                        />
                     </>
                  )}
               </div>
            );

         case "5miles":
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
                        style={{
                           color: "var(--gunmetal)",
                           textTransform: "none",
                        }}
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
                           onDeleteTagClick={onDeleteTagClick}
                        />
                     </>
                  )}
               </div>
            );
         case "facebook":
            return (
               <div className={classes.tagWrapper} {...rest}>
                  <TagLabel style={{ ...colors["facebook"] }}>
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
                        style={{
                           color: "var(--gunmetal)",
                           textTransform: "none",
                        }}
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
                           onDeleteTagClick={onDeleteTagClick}
                        />
                     </>
                  )}
               </div>
            );
         default:
            return (
               <div className={classes.tagWrapper} {...rest}>
                  <TagLabel style={{ ...colors["default"] }}>
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
                        style={{
                           color: "var(--gunmetal)",
                           textTransform: "none",
                        }}
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
                           onDeleteTagClick={onDeleteTagClick}
                        />
                     </>
                  )}
               </div>
            );
      }
   };

   return renderSwitch();
}
