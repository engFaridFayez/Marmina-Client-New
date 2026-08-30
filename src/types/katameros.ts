export interface KatamerosVerse {
  id: number;
  bibleId: number;
  bookId: number;
  chapter: number;
  number: number;
  text: string;
}

export interface KatamerosPassage {
  bookId: number;
  bookTranslation: string;
  chapter: number;
  ref: string;
  verses: KatamerosVerse[];
}

export interface KatamerosReading {
  id: number;
  title: string | null;
  introduction: string | null;
  conclusion: string | null;
  passages: KatamerosPassage[];
  html: string | null;
}

export interface KatamerosSubSection {
  id: number;
  title: string;
  introduction: string | null;
  readings: KatamerosReading[];
}

export interface KatamerosSection {
  id: number;
  title: string;
  subSections: KatamerosSubSection[];
}

export interface KatamerosBible {
  id: number;
  name: string;
  languageId: number;
  versificationSchemeId: number | null;
}

export interface KatamerosDate {
  gregorian: string;
  coptic: string;
}

export interface KatamerosResponse {
  date: KatamerosDate;
  readings: {
    title: string | null;
    periodInfo: string | null;
    bible: KatamerosBible;
    bibles: KatamerosBible[];
    sections: KatamerosSection[];
  };
}
