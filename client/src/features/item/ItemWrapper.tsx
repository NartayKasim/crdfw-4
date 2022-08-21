import { FullItemObj } from "./itemTypes";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Item from "./Item";
import Loading from "../../common/loading/Loading";

export default function ItemWrapper() {
   const [itemState, setItemState] = useState<{
      status: "success" | "loading" | "error" | "init";
      item: FullItemObj | null;
   }>({
      status: "init",
      item: null,
   });
   const [searchParams] = useSearchParams();
   const id = searchParams.get("id");

   const setStatus = (status: "success" | "loading" | "error" | "init") => {
      setItemState({ ...itemState, status: status });
   };

   const handleResponse = (response: AxiosResponse) => {
      if (response.data) {
         setItemState({ status: "success", item: response.data });
      } else setStatus("error");
   };

   const getItem = async () => {
      setStatus("loading");
      const response = await axios.put("/api/inventory/item", { id });
      handleResponse(response);
   };

   useEffect(() => {
      itemState.status === "init" && getItem();
   }, []);

   if (itemState.status === "error") return <h1>There was an error!</h1>;
   if (itemState.status === "success" && itemState.item) {
      return (
         <Item
            itemObj={itemState.item}
            setStatus={setStatus}
            getItem={getItem}
         />
      );
   } else return <Loading />;
}
