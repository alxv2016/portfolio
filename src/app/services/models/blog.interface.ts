export interface BlogCollection {
  page_title: string;
  page_description: string;
  author: Author[];
  blog_image: Blogimage;
  blog_content: Blogcontent[];
}

interface Blogcontent {
  type: string;
  text?: string;
  spans?: (Span | Spans2)[];
  url?: string;
  alt?: string;
  copyright?: any;
  dimensions?: Dimensions;
}

interface Spans2 {
  start: number;
  end: number;
  type: string;
  data: Data;
}

interface Data {
  link_type: string;
  url: string;
  target: string;
}

interface Span {
  start: number;
  end: number;
  type: string;
}

interface Blogimage {
  dimensions: Dimensions;
  alt: string;
  copyright?: any;
  url: string;
}

interface Dimensions {
  width: number;
  height: number;
}

interface Author {
  author_profile: Authorprofile;
  author_name: string;
  author_title: string;
}

interface Authorprofile {}
