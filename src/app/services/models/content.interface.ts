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
  playground: Playground[] | null;
  hero_headline: string | null;
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

interface Playground {
  project_image: Projectimage;
  project_id: string;
  project_date: string;
  project_title: string;
  project_description: string;
  project_link: Projectlink;
}

interface Projectlink {
  link_type: string;
  url: string;
}

interface Projectimage {}
