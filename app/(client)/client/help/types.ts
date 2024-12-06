
// export type ContentSection =
//   | {
//       type: 'text';
//       content: string;
//       className?: string;
//     }
//   | {
//       type: 'media';
//       content: {
//         src: string;
//         alt?: string;
//         caption?: string;
//       };
//       className?: string;
//     }
//   | {
//       type: 'list';
//       listType: 'bullet' | 'number';
//       listClassName?: string;
//       items: Array<{
//         content: string;
//         className?: string;
//       }>;
//       className?: string;
//     }
//   | {
//       type: 'table';
//       items: Array<{
//         content: string;
//         className?: string;
//       }>;
//       className?: string;
//     }; 

    interface MediaContent {
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
  
  interface TextContent {
      type: 'text';
      content: string;
      className?: string;
  }
  
  interface ListItem {
      content: string;
      className?: string;
  }
  
  interface ListContent {
      type: 'list';
      listType: 'bullet' | 'number';
      listClassName: string;
      items: ListItem[];
  }
  
  type SectionContent = TextContent | MediaContent | ListContent;
  
  interface SectionItem {
      id: string;
      title: string;
      content: JSX.Element;
  }
  
  interface Section {
      id: string;
      title: string;
      items: SectionItem[];
  }