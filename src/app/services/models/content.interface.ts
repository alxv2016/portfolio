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
  headline: string | null;
  disciplines: Discipline[] | null;
  content: string | null;
  social_links: Sociallink[] | null;
  site_links: Sitelink[] | null;
}

interface Sitelink {
  link: string;
}

interface Sociallink {
  social_media: string;
  social_media_link: Socialmedialink;
}

interface Socialmedialink {
  link_type: string;
  url: string;
  target: string;
}

interface Discipline {
  discipline: string;
}
