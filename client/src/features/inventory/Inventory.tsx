import classes from "./Inventory.module.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useInventoryAPI from "./inventoryHooks";
import Display from "./display/Display";
import SortBar from "./sort-bar/SortBar";
import PageBar from "./page-bar/PageBar";

export default function Inventory() {
   const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
   const [searchParams, setSearchParams] = useSearchParams();

   const sortBy = searchParams.get("sortBy") || "title";
   const sortOrder = searchParams.get("sortOrder") || "asc";
   const term = searchParams.get("term") || "none";

   const inventoryAPI = useInventoryAPI({ sortBy, sortOrder, term });
   const hasResults = inventoryAPI.inventory.resultsCount > 0 ? true : false;
   const isLoading = inventoryAPI.inventory.loading;
   const pages = inventoryAPI.inventory.pages;

   const handlePageChange = (param: "up" | "down" | number) => {
      if (param === "up")
         return setCurrentPageIdx((currentPageIdx) => currentPageIdx + 1);
      else if (param === "down")
         return setCurrentPageIdx((currentPageIdx) => currentPageIdx - 1);
      else {
         const newPageNumber = param - 1;
         return setCurrentPageIdx(newPageNumber);
      }
   };

   const setSortBy = (sortBy: string) => {
      setSearchParams({ sortBy, sortOrder, term });
   };

   const toggleSortOrder = () => {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSearchParams({ sortBy, sortOrder: newSortOrder, term });
   };

   return (
      <div className={classes.inventory}>
         <div className={classes.row}>
            <SortBar
               sortBy={sortBy}
               sortOrder={sortOrder}
               setSortBy={setSortBy}
               toggleSortOrder={toggleSortOrder}
            />
         </div>
         {hasResults && (
            <PageBar
               handlePageChange={handlePageChange}
               currentPageIdx={currentPageIdx}
               pageCount={pages.length}
            />
         )}
         <Display page={pages[currentPageIdx] || []} isLoading={isLoading} />
         {hasResults && (
            <PageBar
               handlePageChange={handlePageChange}
               currentPageIdx={currentPageIdx}
               pageCount={pages.length}
            />
         )}
      </div>
   );
}
