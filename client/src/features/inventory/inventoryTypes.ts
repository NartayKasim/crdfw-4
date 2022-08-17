import { ItemObj } from "../item/itemTypes";

export type QueryParamsType = string;

export interface QueryParams {
   sortBy: QueryParamsType;
   sortOrder: QueryParamsType;
   term: QueryParamsType;
}

export interface InventoryProps {
   loading: boolean;
   error: boolean;
   pages: ItemObj[][];
   resultsCount: number;
}

export interface DisplayProps {
   page: ItemObj[];
   isLoading: boolean;
}

export interface SortBarProps {
   sortBy: string;
   sortOrder: string;
   setSortBy: (value: string) => void;
   toggleSortOrder: () => void;
}

export interface PageBarProps {
   handlePageChange: (param: "up" | "down" | number) => void;
   currentPageIdx: number;
   pageCount: number;
}
