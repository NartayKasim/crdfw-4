import { ItemObj } from "./../item/itemTypes";

export interface TagObj {
   date: string;
   id: string;
   tag_id: number;
   tag_value: string;
   value_type: string;
   value: string;
   value_id: number;
}

export interface ExpandedTagObj extends TagObj {
   editState: boolean;
   loading: boolean;
   error: boolean;
}

export interface ValueObj {
   value: string;
   value_id: number;
}

export interface TagsObj {
   tags: { [key: string]: TagObj };
}

export interface TagProps {
   tagObj: TagObj;
   getItemObj: () => void;
}

export interface InnerTagProps extends React.HTMLAttributes<HTMLDivElement> {
   tag: ExpandedTagObj;
   displayDate: boolean;
   toggleEditState: () => void;
   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onUpdateValueClick: () => void;
}

export interface DescriptionInnerTagProps
   extends React.HTMLAttributes<HTMLDivElement> {
   tag: ExpandedTagObj;
   displayDate: boolean;
   toggleEditState: () => void;
   handleDescriptionChange: (value: string) => void;
   onUpdateValueClick: () => void;
}

export interface TagValueProps extends React.HTMLAttributes<HTMLDivElement> {
   tagValue: string;
}

export interface CreateTagProps {
   itemObj: ItemObj;
   getItem: () => void;
}

export interface TagFooterProps extends React.HTMLAttributes<HTMLDivElement> {
   onUpdateValueClick: () => void;
   toggleEditState: () => void;
   onToggleValueTag: () => void;
   onDeleteTagClick: () => void;
   value_type: string;
}

export interface TagDateAndEditProps
   extends React.HTMLAttributes<HTMLDivElement> {
   toggleEditState: () => void;
   displayDate: boolean;
   date: string;
}

// BEGIN 'CORE', 'ACTIVE', 'DISABLED':

export interface CoreTagProps extends React.HTMLAttributes<HTMLDivElement> {
   tag: ExpandedTagObj;
   displayDate: boolean;
   toggleEditState: () => void;
   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onUpdateValueClick: () => void;
   handleDescriptionChange: (value: string) => void;
   onToggleValueTag: () => void;
   onDeleteTagClick: () => void;
}

export interface ActiveTagProps extends CoreTagProps {
   onToggleValueTag: () => void;
}
