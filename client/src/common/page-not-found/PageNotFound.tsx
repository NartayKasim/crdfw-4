import classes from "./PageNotFound.module.css";

export default function PageNotFound() {
   return (
      <div className={classes.pageNotFound}>
         <div className={classes.pageNotFoundInner}>
            <div className={classes.row}>404</div>
            <div className={classes.row}>PAGE NOT FOUND</div>
         </div>
      </div>
   );
}
