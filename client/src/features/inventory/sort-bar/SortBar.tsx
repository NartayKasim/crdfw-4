import { SortBarProps } from "../inventoryTypes";
import { v4 as uuidv4 } from "uuid";
import classes from "./SortBar.module.css";

export default function SortBar({
   sortBy,
   sortOrder,
   setSortBy,
   toggleSortOrder,
}: SortBarProps) {
   return (
      <div className={classes.sortBar}>
         <section className={classes.section}>
            <span>Sort By:</span>

            <label className={classes.label}>
               <select
                  className={classes.select}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
               >
                  <option className={classes.option} value="title">
                     title
                  </option>
                  <option className={classes.option} value="category">
                     category
                  </option>
                  <option className={classes.option} value="condition">
                     condition
                  </option>
                  <option className={classes.option} value="item_type">
                     item_type
                  </option>
                  <option className={classes.option} value="brand">
                     brand
                  </option>
                  <option className={classes.option} value="condition">
                     condition
                  </option>
               </select>
            </label>
            <span>Sort Order:</span>
            <button
               className={
                  sortOrder === "asc"
                     ? classes.sortOrderButtonActive
                     : classes.sortOrderButton
               }
               onClick={() => toggleSortOrder()}
            >
               Ascending
            </button>
            <button
               className={
                  sortOrder === "desc"
                     ? classes.sortOrderButtonActive
                     : classes.sortOrderButton
               }
               onClick={() => toggleSortOrder()}
            >
               Descending
            </button>
         </section>
      </div>
   );
}
