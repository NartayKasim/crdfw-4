import classes from "./TagDateAndEdit.module.css";
import { TagDateAndEditProps } from "./../tagTypes";
import EditIcon from "@mui/icons-material/Edit";

export default function TagDateAndEdit({
   toggleEditState,
   displayDate,
   date,
}: TagDateAndEditProps) {
   const formatDate = () => {
      return new Date(date.replace(" ", "T")).toString().split("GMT-0500")[0];
   };

   return (
      <div className={classes.dateWrapper}>
         {displayDate && (
            <span className={classes.date}>{date && formatDate()}</span>
         )}
         <EditIcon className={classes.icon} onClick={toggleEditState} />
      </div>
   );
}
