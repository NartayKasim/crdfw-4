import axios from "axios";
import { TagProps, TagObj, ExpandedTagObj } from "./tagTypes";
import { useState } from "react";
import { AxiosResponse } from "axios";
import CoreTag from "./core-tag/CoreTag";
import ActiveTag from "./active-tag/ActiveTag";

export function Tag({ tagObj, getItemObj }: TagProps) {
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

   const onToggleValueTag = async () => {
      toggleEditState();
      displayLoading();
      const response = await axios.put("/api/tag/toggle-value-tag", { tag });
      getItemObj();
      // handleResponse(response);
   };

   const onUpdateValueClick = async () => {
      toggleEditState();
      displayLoading();
      const response = await axios.put("/api/tag/update-value", { tag });
      handleResponse(response);
   };

   const onDeleteTagClick = async () => {
      toggleEditState();
      displayLoading();
      await axios.put("/api/tag/delete-tag", { tag });
      getItemObj();
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
      const coreProps = {
         tag,
         displayDate: false,
         toggleEditState,
         handleChange,
         onUpdateValueClick,
         handleDescriptionChange,
         onToggleValueTag,
         onDeleteTagClick,
      };
      const activeProps = {
         ...coreProps,
         displayDate: true,
      };
      switch (tag.value_type) {
         case "active":
            return <ActiveTag {...activeProps} />;

         case "disabled":
            return <CoreTag {...coreProps} />;

         default:
            return <CoreTag {...coreProps} />;
      }
   };

   return renderSwitch(tag);
}
