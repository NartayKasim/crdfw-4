import classes from "./NoResults.module.css";

export default function NoResults() {
   return (
      <div className={classes.noResults}>
         <h3 className={classes.row}>Your search returned no results</h3>
      </div>
   );
}
