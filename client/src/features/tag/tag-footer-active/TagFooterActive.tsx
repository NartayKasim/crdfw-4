import classes from "./TagFooterActive.module.css";
import { TagFooterProps } from "../tagTypes";

export default function TagFooterActive({
   onUpdateValueClick,
   toggleEditState,
   value_type,
   onToggleValueTag,
}: TagFooterProps) {
   return (
      <div className={classes.footer}>
         <button className={classes.footerButton} onClick={onToggleValueTag}>
            {value_type === "active " ? "Disable Tag" : "Activate Tag"}
         </button>
         <button className={classes.footerButton} onClick={onUpdateValueClick}>
            Save
         </button>
         <button className={classes.footerButton} onClick={toggleEditState}>
            Cancel
         </button>
      </div>
   );
}
