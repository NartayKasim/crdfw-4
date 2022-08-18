import { TagObj } from "../tag/tagTypes";

export interface ItemObj {
   id: string;
   sku: { value: string };
   serial: { value: string };
   title: { value: string };
   tags: TagObj[];
}

export interface FullItemObj extends ItemObj {
   images: { id: string; image: string }[];
}

export interface ItemAsProps {
   itemObj: ItemObj;
}

export interface FullItemObjAsProps {
   itemObj: FullItemObj;
}

export interface ItemProps {
   itemObj: FullItemObj;
   setStatus: (status: "success" | "loading" | "error" | "init") => void;
   getItem: () => void;
}

export interface imageObj {
   id: string;
   image: string;
}

export interface ItemImagesProps {
   images: imageObj[];
}
