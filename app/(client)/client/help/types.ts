export type ContentSection =
  | {
      type: 'text';
      content: string;
      className?: string;
    }
  | {
      type: 'media';
      content: {
        src: string;
        alt?: string;
        caption?: string;
      };
      className?: string;
    }
  | {
      type: 'list';
      listType: 'bullet' | 'number';
      listClassName?: string;
      items: Array<{
        content: string;
        className?: string;
      }>;
      className?: string;
    }
  | {
      type: 'table';
      items: Array<{
        content: string;
        className?: string;
      }>;
      className?: string;
    }; 