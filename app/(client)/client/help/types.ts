


export interface MediaContent {
      type: 'image';
      src: string;
      alt: string;
      style: {
          width: string;
          height: number;
          objectFit: string;
          containerClassName: string;
          className: string;
      };
  }
  
export interface TextContent {
      type: 'text';
      content: string;
      className?: string;
  }
  
export interface ListItem {
      content: string;
      className?: string;
  }
  
export interface ListContent {
      type: 'list';
      listType: 'bullet' | 'number';
      listClassName: string;
      items: ListItem[];
  }
  
export type SectionContent = TextContent | MediaContent | ListContent;
  
export interface SectionItem {
      id: string;
      title: string;
      content: JSX.Element;
  }
  
export  interface Section {
      id: string;
      title: string;
      items: SectionItem[];
  }