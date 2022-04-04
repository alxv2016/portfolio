export interface ApproachCollection {
  page_title: Pagetitle[];
  page_headline: string;
  discipline_title: string;
  sections: Section[];
}

interface Section {
  section_content: Sectioncontent[];
}

interface Sectioncontent {
  type: string;
  text: string;
  label?: string;
  spans: Span[][];
}

interface Span {
  start: number;
  end: number;
  type: string;
  data?: Data;
}

interface Data {
  link_type: string;
  url: string;
  target: string;
}

interface Pagetitle {
  type: string;
  text: string;
  spans: any[];
}
