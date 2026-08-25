import axios from "axios";
import type {
  KatamerosResponse,
  KatamerosReading,
} from "@/types/katameros";

export const getDailyReadings = async (): Promise<KatamerosResponse> => {
  const response = await axios.get<KatamerosResponse>(
    "/api/katameros/today/",
  );

  return response.data;
};

export const getLiturgyGospel = (
  data: KatamerosResponse,
): KatamerosReading | null => {
  const liturgySection = data.sections.find(
    (section) => section.title === "قداس",
  );

  if (!liturgySection) {
    return null;
  }

  const gospelSubSection = liturgySection.subSections.find(
    (subSection) => subSection.title === "المزمور والإنجيل",
  );

  if (!gospelSubSection) {
    return null;
  }

  const gospel = gospelSubSection.readings.find(
    (reading) =>
      reading.passages[0]?.bookTranslation === "متى" ||
      reading.passages[0]?.bookTranslation === "مرقس" ||
      reading.passages[0]?.bookTranslation === "لوقا" ||
      reading.passages[0]?.bookTranslation === "يوحنا",
  );

  return gospel ?? null;
};

export const getTodayVerse = (
  data: KatamerosResponse,
): { text: string; reference: string } | null => {
  const gospel = getLiturgyGospel(data);

  const passage = gospel?.passages[0];

  const firstVerse = passage?.verses[0];

  if (!passage || !firstVerse) {
    return null;
  }

  return {
    text: firstVerse.text,
    reference: `${passage.bookTranslation} ${passage.ref}`,
  };
};



export interface DailyReading {
  title: string;
  reference: string;
  firstVerse: string | null;
}


export const getSectionReadings = (
  data: KatamerosResponse,
  sectionTitle: string,
): DailyReading[] => {
  const section = data.sections.find(
    (section) => section.title === sectionTitle,
  );

  if (!section) {
    return [];
  }

  const readings: DailyReading[] = [];

  section.subSections.forEach((subSection) => {
    subSection.readings?.forEach((reading) => {
      const passage = reading.passages?.[0];

      if (!passage) {
        return;
      }

      const firstVerse = passage.verses?.[0];

      let title = subSection.title;

      if (passage.bookTranslation === "مزامير") {
        title = "المزمور";
      } else if (
        ["متى", "مرقس", "لوقا", "يوحنا"].includes(
          passage.bookTranslation,
        )
      ) {
        title = "الإنجيل";
      }

      readings.push({
        title,
        reference: `${passage.bookTranslation} ${passage.ref}`,
        firstVerse: firstVerse?.text ?? null,
      });
    });
  });

  return readings;
};
