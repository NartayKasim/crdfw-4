import classes from "./Button.module.css";

const Button: React.FunctionComponent<
   React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
   >
> = ({ children, style, ...rest }) => {
   return (
      <button className={classes.button} {...rest} style={{ ...style }}>
         {children}
      </button>
   );
};

export default Button;
