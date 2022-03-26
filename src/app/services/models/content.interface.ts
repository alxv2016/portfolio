export interface PrismicQuery {
  page: number;
  results_per_page: number;
  results_size: number;
  total_results_size: number;
  total_pages: number;
  next_page?: any;
  prev_page?: any;
  results: Result[];
  version: string;
  license: string;
}

interface Result {
  id: string;
  uid: string;
  url?: any;
  type: string;
  href: string;
  tags: any[];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: any[];
  lang: string;
  alternate_languages: any[];
  data: AlxvCollection;
}

export interface AlxvCollection {
  page_title: string | null;
  callout: string | null;
  content: Content[] | null;
  social_media_title: string | null;
  social_links: Sociallink[] | null;
  navigation_title: string | null;
  time_quote: string | null;
  site_links: Sitelink[] | null;
  about_content: Aboutcontent[] | null;
  approach: Approach[] | null;
}

export interface Sitelink {
  link_id: string;
  link: string;
}

export interface AboutContent {
  paragraph: string;
}

interface Sociallink {
  social_media_id: string;
  social_media: string;
  social_media_link: Socialmedialink;
}

interface Socialmedialink {
  link_type: string;
  url: string;
  target: string;
}

interface Approach {
  approach_callout?: string;
  approach_content: Approachcontent[];
}

interface Approachcontent {
  type: string;
  text: string;
  spans: Span[];
}

interface Span {
  start: number;
  end: number;
  type: string;
}

interface Aboutcontent {
  paragraph: string;
}

interface Content {
  type: string;
  text: string;
  spans: Span[];
}
