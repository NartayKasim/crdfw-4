import classes from "./TagLabel.module.css";

export default function TagLabel({
   children,
   style,
}: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div className={classes.tagValue} style={{ ...style }}>
         {children}
      </div>
   );
}
