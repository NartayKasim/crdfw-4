import classes from "./Search.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Search() {
   const [searchInput, setSearchInput] = useState("none");
   const [searchParams, setSearchParams] = useSearchParams();
   const navigate = useNavigate();

   const onSearchClick = () => {
      // setSearchParams({ term: searchInput });
      if (!searchInput.length) return;
      const formatInput = searchInput.replaceAll(" ", "+");
      navigate(`/inventory/?orderBy=id&sortOrder=asc&term=${formatInput}`);
   };

   return (
      <div className={classes.search}>
         <input
            className={classes.searchInput}
            type="text"
            placeholder="Search Inventory"
            onChange={(e) => setSearchInput(e.target.value)}
         />
         <button className={classes.searchButton} onClick={onSearchClick}>
            Search
         </button>
      </div>
   );
}

// GE++27.7-cu+ft+French+Door+Refrigerator+with+Ice+Maker+(Fingerprint-resistant+Stainless+Steel)+ENERGY+STAR
// GE++27.7-cu+ft+French+Door+Refrigerator+with+Ice+Maker+(Fingerprint-resistant+Stainless+Steel)+ENERGY+STAR
