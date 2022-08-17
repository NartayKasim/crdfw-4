import { Link } from "react-router-dom";
import { useCurrentLocation } from "./useCurrentLocation";
import classes from "./NavLink.module.css";

interface NavLinkProps {
   to: string;
   content: string;
   icon: React.ReactNode;
}

export default function NavLink({ to, content, icon }: NavLinkProps) {
   const location = useCurrentLocation({ to });
   return (
      <Link
         to={to}
         className={location ? classes.navLinkActive : classes.navLink}
      >
         {icon} {content}
      </Link>
   );
}
