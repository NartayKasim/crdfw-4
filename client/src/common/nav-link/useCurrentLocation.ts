import { useLocation } from "react-router";

interface useCurrentLocationProps {
   to: string;
}

export function useCurrentLocation({ to }: useCurrentLocationProps) {
   const location = useLocation();
   if (to === "/" && location.pathname === "/") return true;
   else if (to !== "/" && to.includes(location.pathname)) return true;
   else return false;
}
