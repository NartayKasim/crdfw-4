import { ReactNode } from "react";
import classes from "./Hint.module.css";

interface HintProps {
   text: string;
}

export default function Hint({ text }: HintProps) {
   return <div className={classes.hint}>{text}</div>;
}
