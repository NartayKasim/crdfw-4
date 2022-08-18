import classes from "./IdWrapper.module.css";
import { IdWrapperProps } from "./../../inventory/inventoryTypes";

export default function IdWrapper({
   objKey,
   value,
   icon,
   style,
   ...rest
}: IdWrapperProps) {
   return (
      <div className={classes.idWrapper}>
         <div className={classes.key}>
            {icon}
            {objKey}
         </div>
         <div className={classes.value} {...rest} style={style}>
            {value}
         </div>
      </div>
   );
}
