export interface TagObj {
   date: string;
   id: string;
   tag_id: number;
   tag_value: string;
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

export interface TagProps {
   tagObj: TagObj;
   label: string;
}

export interface InnerTagProps extends React.HTMLAttributes<HTMLDivElement> {
   tag: ExpandedTagObj;
   toggleEditState: () => void;
   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onUpdateValueClick: () => void;
}

export interface TagValueProps extends React.HTMLAttributes<HTMLDivElement> {
   tagValue: string;
}

// extends React.FunctionComponent<
// React.DetailedHTMLProps<
//    React.LabelHTMLAttributes<HTMLLabelElement>,
//    HTMLLabelElement
// >
// >
