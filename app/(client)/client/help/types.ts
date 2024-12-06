export interface ContentSection {
  type: 'text' | 'media' | 'list' | 'table';
  content?: any;
  className?: string;
  listType?: 'bullet' | 'number';
  listClassName?: string;
  items?: Array<{
    content: string;
    className?: string;
  }>;
} 