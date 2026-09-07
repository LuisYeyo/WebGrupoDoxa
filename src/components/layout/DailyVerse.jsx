import {
  useLanguage,
} from "../../context/LanguageContext";

import {
  useDailyVerse,
} from "../../hooks/useDailyVerse";

function DailyVerse({
  compact = false,
  light = false,
}) {
  const {
    language,
  } = useLanguage();

  const verse =
    useDailyVerse();

  if (!verse) {
    return null;
  }

  /*
    Compatible con varias formas
    de guardar verses.js.

    Ejemplos soportados:

    reference: "SALMOS 23:1"

    o

    reference: {
      es: "SALMOS 23:1",
      en: "PSALMS 23:1"
    }

    y lo mismo con text.
  */

  const getTranslatedValue = (
    value
  ) => {
    if (
      value &&
      typeof value === "object"
    ) {
      return (
        value[language] ||
        value.es ||
        value.en ||
        ""
      );
    }

    return value || "";
  };

  const reference =
    getTranslatedValue(
      verse.reference ||
        verse.ref ||
        verse.verse
    );

  const text =
    getTranslatedValue(
      verse.text ||
        verse.content ||
        verse.quote
    );

  return (
    <div
      className={`
        daily-verse
        ${
          compact
            ? "daily-verse--compact"
            : ""
        }
        ${
          light
            ? "daily-verse--light"
            : ""
        }
      `}
    >
      <div className="daily-verse-reference">
        {reference}
      </div>

      <div
        className="
          daily-verse-text
        "
      >
        {text}
      </div>
    </div>
  );
}

export default DailyVerse;