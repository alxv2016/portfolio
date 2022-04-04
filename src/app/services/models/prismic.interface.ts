import {BlogCollection} from './blog.interface';

export interface Prismic {
  refs: Ref[];
  integrationFieldsRef?: any;
  bookmarks: Bookmarks;
  types: Types;
  languages: Language[];
  tags: string[];
  forms: Forms;
  oauth_initiate: string;
  oauth_token: string;
  version: string;
  experiments: Experiments;
  license: string;
}

export interface PrismicQuery {
  page: number;
  results_per_page: number;
  results_size: number;
  total_results_size: number;
  total_pages: number;
  next_page?: any;
  prev_page?: any;
  results: PrismicResult[];
  version: string;
  license: string;
}

export interface PrismicResult {
  id: string;
  uid: string;
  url?: any;
  type: string;
  href: string;
  tags: string[];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: any[];
  lang: string;
  alternate_languages: any[];
  data: any;
}

export interface PrismicBlogResult {
  id: string;
  uid: string;
  url?: any;
  type: string;
  href: string;
  tags: string[];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: any[];
  lang: string;
  alternate_languages: any[];
  data: BlogCollection;
}

interface Experiments {
  draft: any[];
  running: any[];
}

interface Forms {
  everything: Everything;
  tags: Tags;
}

interface Tags {
  method: string;
  enctype: string;
  action: string;
  fields: Bookmarks;
}

interface Everything {
  method: string;
  enctype: string;
  action: string;
  fields: Fields;
}

interface Fields {
  ref: Ref2;
  q: Ref2;
  lang: Ref2;
  page: Page;
  pageSize: Page;
  after: Ref2;
  fetch: Ref2;
  fetchLinks: Ref2;
  graphQuery: Ref2;
  orderings: Ref2;
  referer: Ref2;
}

interface Page {
  type: string;
  multiple: boolean;
  default: string;
}

interface Ref2 {
  type: string;
  multiple: boolean;
}

interface Language {
  id: string;
  name: string;
}

interface Types {
  apple_fitness_plus: string;
  tech_talks: string;
}

interface Bookmarks {}

interface Ref {
  id: string;
  ref: string;
  label: string;
  isMasterRef: boolean;
}
