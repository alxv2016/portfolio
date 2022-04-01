export interface BlogCollection {
  page_title: Pagetitle[] | null;
  page_description: Pagetitle[] | null;
  author: Author[] | null;
  author_tags: Authortag[] | null;
  blog_image: Blogimage | null;
  blog_content: Blogcontent[] | null;
  related_content: Relatedcontent[] | null;
}

interface Relatedcontent {
  content_id?: any;
  content_date?: any;
  content_author?: any;
  content_title?: any;
  content_description?: any;
  content_link: Taglink;
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

interface Authortag {
  tag_id: string;
  tag: string;
  tag_date: string;
  tag_link: Taglink;
}

interface Taglink {
  link_type: string;
}

interface Author {
  author_profile: Authorprofile;
  author_name: string;
  author_title: string;
  author_length: string;
  author_published_date: string;
}

interface Authorprofile {}

interface Pagetitle {
  type: string;
  text: string;
  spans: any[];
}
