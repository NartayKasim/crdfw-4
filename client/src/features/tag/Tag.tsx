import classes from "./Tag.module.css";
import axios from "axios";
import { InnerTagProps, TagProps, TagObj, ExpandedTagObj } from "./tagTypes";
import { useState } from "react";
import { AxiosResponse } from "axios";
import Loading from "../../common/loading/Loading";

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
   toggleEditState,
   handleChange,
   onUpdateValueClick,
   style,
   ...rest
}: InnerTagProps) {
   return (
      <div className={classes.tagWrapper} {...rest}>
         <label className={classes.label} htmlFor={tag.tag_value || "none"}>
            <TagLabel style={style}>
               {tag.tag_value}
               <span
                  style={{
                     color: "var(--slate-gray)",
                  }}
               >
                  {tag.date}
               </span>
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
         </label>
         <div className={classes.header}>
            <TagButton
               className={classes.button}
               style={{ color: "var(--gunmetal)" }}
               onClick={toggleEditState}
            >
               Edit
            </TagButton>
         </div>
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

   const renderSwitch = (tag: ExpandedTagObj) => {
      const defaultProps = {
         tag,
         toggleEditState,
         handleChange,
         onUpdateValueClick,
      };

      switch (tag.tag_value) {
         case "5miles":
            return (
               <DefaultTag
                  {...defaultProps}
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
                  style={{
                     background: "rgba(128, 0, 128, 0.378)",
                     color: "var(--gunmetal)",
                  }}
               />
            );
         case "description":
            return null;
         case null:
            return null;
         default:
            return (
               <DefaultTag
                  {...defaultProps}
                  style={{
                     background: "var(--gainsboro)",
                     color: "var(--slate-gray)",
                  }}
               />
            );
      }
   };

   return renderSwitch(tag);
}
