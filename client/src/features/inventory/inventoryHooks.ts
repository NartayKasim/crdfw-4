import axios from "axios";
import { useState, useEffect } from "react";
import { QueryParams, InventoryProps } from "./inventoryTypes";
import { ItemObj } from "../item/itemTypes";
import { TagObj } from "../tag/tagTypes";

export default function useInventoryAPI({
   sortBy,
   sortOrder,
   term,
}: QueryParams) {
   const [inventory, setInventory] = useState<InventoryProps>({
      loading: false,
      error: false,
      pages: [],
      resultsCount: 0,
   });

   const getItems = async () => {
      setInventory({ ...inventory, loading: true });
      const apiURL = `/api/inventory/`;
      const response = await axios.get(apiURL);
      if (response.data) sortItems(response.data, sortBy, sortOrder);
      else setInventory({ ...inventory, loading: false, error: true });
   };

   const searchItems = (items: ItemObj[], term: string) => {
      if (term === "none") return items;
      const formatTerm = term.toLowerCase();
      let inventory: ItemObj[] = items.filter((item) => {
         const itemTitle = item.title.value.toLowerCase();
         if (item.sku.value === term) return item;
         if (itemTitle.includes(formatTerm)) return item;
         for (let i = 0; i < item.tags.length; i++) {
            const tag = item.tags[i];
            const FORBIDDEN_TAGS = [
               "description",
               "auction_price",
               "retail_price",
               "list_price",
               "sale_price",
               "sale_date",
               "thumbnail",
               "item_link",
            ];
            if (tag.tag_value && !FORBIDDEN_TAGS.includes(tag.tag_value)) {
               if (tag.value) {
                  if (
                     tag.tag_value === formatTerm ||
                     tag.value.toLowerCase().includes(formatTerm)
                  ) {
                     return item;
                  }
               }
            } else if (item.id === term) {
               return item;
            }
         }
      });

      return inventory;
   };

   const sortItems = (items: ItemObj[], sortBy: string, sortOrder: string) => {
      const inventory = searchItems(items, term);
      if (sortBy === "title") {
         for (let i = inventory.length; i > 0; i--) {
            for (let j = 0; j < i; j++) {
               if (j < inventory.length - 1) {
                  if (
                     inventory[j][sortBy].value.toLowerCase() >
                     inventory[j + 1][sortBy].value.toLowerCase()
                  ) {
                     let temp = inventory[j];
                     inventory[j] = inventory[j + 1];
                     inventory[j + 1] = temp;
                  }
               }
            }
         }
      } else if (
         sortBy === "auction_price" ||
         sortBy === "retail_price" ||
         sortBy === "list_price"
      ) {
         for (let i = inventory.length; i > 0; i--) {
            for (let j = 0; j < i; j++) {
               if (j < inventory.length - 1) {
                  const jPos = inventory[j].tags.filter(
                     (tag: TagObj) => tag.tag_value === sortBy
                  )[0];
                  const j1Pos = inventory[j + 1].tags.filter(
                     (tag: TagObj) => tag.tag_value === sortBy
                  )[0];
                  if (parseFloat(jPos.value) > parseFloat(j1Pos.value)) {
                     let temp = inventory[j];
                     inventory[j] = inventory[j + 1];
                     inventory[j + 1] = temp;
                  }
               }
            }
         }
      } else {
         for (let i = inventory.length; i > 0; i--) {
            for (let j = 0; j < i; j++) {
               if (j < inventory.length - 1) {
                  const jPos = inventory[j].tags.filter(
                     (tag: TagObj) => tag.tag_value === sortBy
                  )[0];
                  const j1Pos = inventory[j + 1].tags.filter(
                     (tag: TagObj) => tag.tag_value === sortBy
                  )[0];

                  if (jPos.value && j1Pos.value) {
                     if (jPos.value.toLowerCase() > j1Pos.value.toLowerCase()) {
                        let temp = inventory[j];
                        inventory[j] = inventory[j + 1];
                        inventory[j + 1] = temp;
                     }
                  }
               }
            }
         }
      }
      return sortOrder === "asc"
         ? paginateItems(inventory)
         : paginateItems(inventory.reverse());
   };

   const paginateItems = (items: ItemObj[]) => {
      const itemCount = items.length;
      if (itemCount < 25) {
         setInventory({
            ...inventory,
            loading: false,
            pages: [items],
            resultsCount: items.length,
         });
      } else {
         let numberOfPages = Math.ceil(itemCount / 35);
         let start = 0;
         let end = 34;
         let pages = [];
         for (let i = 0; i < numberOfPages; i++) {
            start = i === 0 ? i : i * 35;
            end = start + 35 > itemCount ? itemCount : start + 35;
            let page = items.slice(start, end);
            pages.push(page);
         }
         setInventory({
            ...inventory,
            loading: false,
            pages: pages,
            resultsCount: items.length,
         });
      }
   };

   useEffect(() => {
      if (!inventory.loading && !inventory.error) getItems();
   }, [sortBy, sortOrder, term]);

   return { inventory, getItems };
}
