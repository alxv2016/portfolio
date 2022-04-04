export interface HomeCollection {
  page_title: Pagetitle[];
  navigation_label: string;
  social_media_label: string;
  pull_quote: string;
  page_content: Pagecontent[];
  social_media_links: Socialmedialink[];
  navigation: Navigation[];
  projects: Project[];
  about_me: Aboutme[];
}

interface Aboutme {
  bio: Pagetitle[];
}

interface Project {
  project_id: string;
  project_date: string;
  project_title: string;
  project_description: string;
  project_link: Smlink;
}

interface Navigation {
  link_id: string;
  link_label: string;
}

interface Socialmedialink {
  sm_id: string;
  sm_name: string;
  sm_link: Smlink;
}

interface Smlink {
  link_type: string;
  url: string;
  target: string;
}

interface Pagecontent {
  content: Content[];
}

interface Content {
  type: string;
  text: string;
  label?: string;
  spans: Span[];
}

interface Span {
  start: number;
  end: number;
  type: string;
}

interface Pagetitle {
  type: string;
  text: string;
  spans: any[];
}
