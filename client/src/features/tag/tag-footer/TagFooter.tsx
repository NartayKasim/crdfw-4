import classes from "./TagFooter.module.css";
import { TagFooterProps } from "../tagTypes";

export default function TagFooter({
   onUpdateValueClick,
   toggleEditState,
   value_type,
   onToggleValueTag,
   ...rest
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
