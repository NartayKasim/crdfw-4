import classes from "./TagValue.module.css";

export default function TagValue({
   children,
   style,
}: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div className={classes.tagValue} style={{ ...style }}>
         {children}
      </div>
   );
}
