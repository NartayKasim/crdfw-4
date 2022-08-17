import { Routes, Route } from "react-router-dom";
import PageNotFound from "../common/page-not-found/PageNotFound";
import Inventory from "../features/inventory/Inventory";
import Item from "../features/item/Item";

export default function Router() {
   return (
      <Routes>
         <Route path="/" element={<Inventory />} />
         <Route path="/inventory" element={<Inventory />}>
            <Route
               path="/inventory/?sortBy=:sortBy&sortOrder=:sortOrder&term=:term"
               element={<Inventory />}
            />
         </Route>
         <Route path="/item" element={<Item />}>
            <Route path="/item/?id=:id" element={<Item />} />
         </Route>
         <Route path="*" element={<PageNotFound />} />
      </Routes>
   );
}
