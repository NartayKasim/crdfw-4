import classes from "./Loading.module.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
   return (
      <div className={classes.loading}>
         <CircularProgress />
         <h3>loading...</h3>
      </div>
   );
}
