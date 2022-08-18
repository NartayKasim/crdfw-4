import { Routes, Route } from "react-router-dom";
import PageNotFound from "../common/page-not-found/PageNotFound";
import Inventory from "../features/inventory/Inventory";
import ItemWrapper from "../features/item/ItemWrapper";

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
         <Route path="/item" element={<ItemWrapper />}>
            <Route path="/item/?id=:id" element={<ItemWrapper />} />
         </Route>
         <Route path="*" element={<PageNotFound />} />
      </Routes>
   );
}
