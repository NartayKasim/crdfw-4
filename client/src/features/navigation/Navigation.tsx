import classes from "./Navigation.module.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLink from "../../common/nav-link/NavLink";
import Search from "./search/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function Navigation() {
   const [expandMobile, setExpandMobile] = useState(false);

   const mobileVariant = {
      initial: {
         height: 0,
         transition: {
            duration: 0.25,
         },
      },
      animate: {
         height: "3rem",
         transition: { duration: 0.25 },
      },
      exit: {
         height: 0,
         transition: { duration: 0.25 },
      },
   };

   return (
      <div className={classes.navigation}>
         <div className={classes.desktopWrapper}>
            <Search />
            <NavLink to="/" content={"Home"} icon={<HomeOutlinedIcon />} />
            <NavLink
               to="/inventory/?sortBy=title&sortOrder=asc&term=none"
               content={"Inventory"}
               icon={<WarehouseOutlinedIcon />}
            />
         </div>

         <div className={classes.mobileWrapper}>
            <div className={classes.mobileStatic}>
               <button
                  className={classes.dropdownButton}
                  onClick={() => setExpandMobile(!expandMobile)}
               >
                  <MenuOutlinedIcon />
                  Menu
               </button>
               <Search />
            </div>
            <AnimatePresence>
               {expandMobile && (
                  <motion.div
                     className={classes.mobileDropdown}
                     variants={mobileVariant}
                     initial="initial"
                     animate="animate"
                     exit="exit"
                  >
                     <NavLink
                        to="/"
                        content={"Home"}
                        icon={<HomeOutlinedIcon />}
                     />
                     <NavLink
                        to="/inventory/?sortBy=title&sortOrder=asc&term=none"
                        content={"Inventory"}
                        icon={<WarehouseOutlinedIcon />}
                     />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
}
