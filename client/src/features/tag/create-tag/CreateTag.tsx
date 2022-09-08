import classes from "./CreateTag.module.css";
import axios from "axios";
import { CreateTagProps } from "./../tagTypes";
import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import TagLabel from "../tag-label/TagLabel";

export default function CreateTag({ itemObj, getItem }: CreateTagProps) {
   const [availableTags, setAvailableTags] = useState<
      { tag_id: number; tag_value: string }[]
   >([]);
   const [displayStatus, setDisplayStatus] = useState<
      "loading" | "error" | "success" | "init"
   >("init");
   const [selectedTag, setSelectedTag] = useState<{
      tag_id: number;
      tag_value: string;
   }>({ tag_id: 4, tag_value: "notes" });
   const [tagContent, setTagContent] = useState("");
   const [displayCreateTag, setDisplayCreateTag] = useState(false);

   const handleCreateTag = async () => {
      const activeTags = [
         "notes",
         "facebook",
         "5miles",
         "ebay",
         "offerup",
         "nextdoor",
         "poshmark",
         "mercari",
         "in service",
         "ready to post",
         "review",
         "sold",
      ];
      if (tagContent.length === 0) return;
      const tagObj = {
         id: itemObj.id,
         tag_id: selectedTag?.tag_id,
         value: tagContent,
         value_type: activeTags.includes(selectedTag.tag_value)
            ? "active"
            : "core",
      };
      await axios.post("/api/tag/create-tag", tagObj);
      return getItem();
   };

   const handleSelectTag = (value: string) => {
      const filterTags = availableTags.filter((tag) => tag.tag_value === value);
      setSelectedTag(filterTags[0]);
   };

   const handleTagsResponse = (response: AxiosResponse) => {
      const singleUseTags = [
         "location",
         "brand",
         "category",
         "auction_price",
         "retail_price",
         "list_price",
         "sale_price",
         "item_link",
         "description",
         "sale_date",
         "thumbnail",
         "ready to post",
         "in progress",
         "review",
         "sold",
         "UPC",
      ];

      const allTags: { tag_id: number; tag_value: string }[] = response.data;
      const tagOptions: { tag_id: number; tag_value: string }[] = [];

      allTags.forEach((tag) => {
         const tagExists = itemObj.tags.filter(
            (currentTag) => currentTag.tag_value === tag.tag_value
         );
         if (tagExists.length > 0) {
            if (!singleUseTags.includes(tag.tag_value))
               return tagOptions.push(tag);
         } else if (tagExists.length === 0) {
            return tagOptions.push(tag);
         }
      });

      setAvailableTags(tagOptions);
      setDisplayStatus("success");
   };

   const getTagsFromDB = async () => {
      setDisplayStatus("loading");
      const response = await axios.get("/api/tag/get-tags");
      handleTagsResponse(response);
   };

   useEffect(() => {
      if (displayStatus === "init") getTagsFromDB();
   }, [displayStatus]);

   return (
      <div className={classes.createTag}>
         <TagLabel
            style={{
               background: "var(--dark-blue)",
               color: "var(--blue)",
               borderRadius: "0.25rem",
            }}
         >
            Create New Tag
         </TagLabel>
         <div className={classes.createTagInner}>
            {!displayCreateTag && (
               <div className={classes.createTagButtonWrapper}>
                  <button
                     className={classes.createTagButton}
                     onClick={() => setDisplayCreateTag(true)}
                  >
                     Create a New Tag
                  </button>
               </div>
            )}
            {displayCreateTag && (
               <>
                  <label className={classes.tagSelectLabel}>
                     Select Tag:
                     <select
                        value={selectedTag.tag_value}
                        className={classes.tagSelect}
                        onChange={(e) => handleSelectTag(e.target.value)}
                     >
                        {availableTags.map((tag) => (
                           <option
                              key={tag.tag_id}
                              className={classes.option}
                              value={tag.tag_value}
                           >
                              {tag.tag_value}
                           </option>
                        ))}
                     </select>
                  </label>
                  <label className={classes.tagSelectLabel}>
                     Tag Content:
                     <textarea
                        placeholder="Tag content..."
                        name="tag-content"
                        id="tag-content"
                        className={classes.textArea}
                        onChange={(e) => setTagContent(e.target.value)}
                     />
                  </label>
                  <div className={classes.submitWrapper}>
                     <button
                        onClick={() => setDisplayCreateTag(false)}
                        className={classes.submit}
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleCreateTag}
                        className={classes.submit}
                     >
                        Create Tag
                     </button>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
