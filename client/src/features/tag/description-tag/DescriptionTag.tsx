import classes from "./DescriptionTag.module.css";
import parse from "html-react-parser";
import TagLabel from "../tag-label/TagLabel";
import EditIcon from "@mui/icons-material/Edit";
import RichTextEditor from "@mantine/rte";
import { DescriptionInnerTagProps } from "./../tagTypes";

export default function DescriptionTag({
   tag,
   displayDate,
   toggleEditState,
   handleDescriptionChange,
   onUpdateValueClick,
   style,
   ...rest
}: DescriptionInnerTagProps) {
   return (
      <div className={classes.descriptionTag}>
         <TagLabel style={style}>
            {tag.tag_value}
            <div className={classes.dateWrapper}>
               <EditIcon className={classes.icon} onClick={toggleEditState} />
            </div>
         </TagLabel>
         {!tag.editState && (
            <div className={classes.descriptionValueWrapper}>
               {parse(tag.value)}
            </div>
         )}
         {tag.editState && (
            <RichTextEditor
               classNames={{
                  toolbar: "mantine-RichTextEditor-toolbar",
                  root: "	.mantine-RichTextEditor-root",
               }}
               styles={{
                  toolbar: {
                     backgroundColor: "var(--gainsboro)",
                     overflow: "hidden",
                  },
                  root: {
                     backgroundColor: "var(--gainsboro)",
                     height: "80vh",
                     width: "100%",
                     overflow: "hidden",
                  },
               }}
               value={tag.value}
               onChange={(e) => handleDescriptionChange(e)}
            />
         )}
         {tag.editState && (
            <div className={classes.footer}>
               <button
                  className={classes.footerButton}
                  onClick={onUpdateValueClick}
               >
                  Save
               </button>
               <button
                  className={classes.footerButton}
                  onClick={toggleEditState}
               >
                  Cancel
               </button>
            </div>
         )}
      </div>
   );
}
