import classes from "./PageBar.module.css";
import { PageBarProps } from "../inventoryTypes";
import { v4 as uuidv4 } from "uuid";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function PageBar({
   handlePageChange,
   currentPageIdx,
   pageCount,
}: PageBarProps) {
   const pages = [];
   for (let i = 1; i < pageCount + 1; i++) {
      pages.push(i);
   }
   return (
      <div className={classes.pageBar}>
         <div className={classes.section}>
            <div className={classes.pages}>
               <div className={classes.arrow}>
                  <button
                     className={classes.arrowButton}
                     onClick={() => handlePageChange("down")}
                     disabled={currentPageIdx === 0 ? true : false}
                  >
                     <ArrowLeftIcon />
                  </button>
               </div>
               {pages.map((num) => (
                  <button
                     className={
                        currentPageIdx + 1 === num
                           ? classes.pageActive
                           : classes.page
                     }
                     onClick={() => handlePageChange(num)}
                     key={uuidv4()}
                  >
                     {num}
                  </button>
               ))}
               <div className={classes.mobile}>Previous / Next Page</div>
               <div className={classes.arrow}>
                  <button
                     className={classes.arrowButton}
                     onClick={() => handlePageChange("up")}
                     disabled={currentPageIdx + 1 === pageCount ? true : false}
                  >
                     <ArrowRightIcon />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
