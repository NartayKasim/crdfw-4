import classes from "./TagInput.module.css";

export default function TagInput({
   ...rest
}: React.DetailedHTMLProps<
   React.InputHTMLAttributes<HTMLInputElement>,
   HTMLInputElement
>) {
   return <input className={classes.input} {...rest} />;
}
