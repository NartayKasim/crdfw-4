import classes from "./Tag.module.css";
import axios from "axios";
import { InnerTagProps, TagProps, TagObj, ExpandedTagObj } from "./tagTypes";
import { useState } from "react";
import { AxiosResponse } from "axios";
import Loading from "../../common/loading/Loading";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionTag from "./description-tag/DescriptionTag";

function TagLabel({ children, style }: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div className={classes.tagValue} style={{ ...style }}>
         {children}
      </div>
   );
}

function TagValue({ children, style }: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div className={classes.tagValue} style={{ ...style }}>
         {children}
      </div>
   );
}

function TagButton({
   children,
   style,
   ...rest
}: React.DetailedHTMLProps<
   React.ButtonHTMLAttributes<HTMLButtonElement>,
   HTMLButtonElement
>) {
   return (
      <button className={classes.tagButton} style={{ ...style }} {...rest}>
         {children}
      </button>
   );
}

function TagInput({
   ...rest
}: React.DetailedHTMLProps<
   React.InputHTMLAttributes<HTMLInputElement>,
   HTMLInputElement
>) {
   return <input className={classes.input} {...rest} />;
}

function DefaultTag({
   tag,
   displayDate,
   toggleEditState,
   handleChange,
   onUpdateValueClick,
   style,
   ...rest
}: InnerTagProps) {
   const date = new Date(tag.date.replace(" ", "T"))
      .toString()
      .split("GMT-0500")[0];

   return (
      <div className={classes.tagWrapper} {...rest}>
         <TagLabel style={style}>
            {tag.tag_value}
            <div className={classes.dateWrapper}>
               {displayDate && <span className={classes.date}>{date}</span>}
               <EditIcon className={classes.icon} onClick={toggleEditState} />
            </div>
         </TagLabel>
         {!tag.editState && (
            <TagValue
               className={classes.value}
               style={{ color: "var(--gunmetal)", textTransform: "none" }}
            >
               {tag.value}
            </TagValue>
         )}
         {tag.editState && (
            <TagInput
               value={tag.value}
               onChange={handleChange}
               className={classes.input}
               name={tag.tag_value}
               placeholder={tag.tag_value}
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

export function Tag({ tagObj }: TagProps) {
   const [tag, setTag] = useState({
      editState: false,
      loading: false,
      error: false,
      ...tagObj,
   });

   const toggleEditState = () => {
      setTag({ ...tag, editState: !tag.editState });
   };

   const displayLoading = () => {
      setTag({ ...tag, loading: true });
   };

   const displayError = () => {
      setTag({ editState: false, loading: false, error: true, ...tagObj });
   };

   const displayTag = (tag: TagObj) => {
      setTag({ editState: false, loading: false, error: false, ...tag });
   };

   const handleResponse = (response: AxiosResponse<any, any>) => {
      if (response.data) displayTag(response.data);
      else displayError();
   };

   const onUpdateValueClick = async () => {
      toggleEditState();
      displayLoading();
      const response = await axios.put("/api/tag/update-value", { tag });
      handleResponse(response);
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTag({
         ...tag,
         value: e.target.value,
      });
   };

   const handleDescriptionChange = (value: string) => {
      setTag({
         ...tag,
         value: value,
      });
   };

   const renderSwitch = (tag: ExpandedTagObj) => {
      const defaultProps = {
         tag,
         displayDate: false,
         toggleEditState,
         handleChange,
         onUpdateValueClick,
      };

      switch (tag.tag_value) {
         case "5miles":
            return (
               <DefaultTag
                  {...defaultProps}
                  displayDate={true}
                  style={{
                     background: "rgba(0, 128, 0, 0.328)",
                     color: "var(--gunmetal)",
                  }}
               />
            );
         case "notes":
            return (
               <DefaultTag
                  {...defaultProps}
                  displayDate={true}
                  style={{
                     background: "rgba(128, 0, 128, 0.378)",
                     color: "var(--gunmetal)",
                  }}
               />
            );
         case "description":
            return (
               <DescriptionTag
                  {...defaultProps}
                  handleDescriptionChange={handleDescriptionChange}
               />
            );
         case null:
            return null;
         default:
            return (
               <DefaultTag
                  {...defaultProps}
                  style={{
                     color: "var(--slate-gray)",
                  }}
               />
            );
      }
   };

   return renderSwitch(tag);
}
