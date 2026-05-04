import prisma from "./prisma";
import bhajansJson from "../data/bhajans.json";
import booksJson from "../data/books.json";
import shlokasJson from "../data/shlokas.json";

function isMissingTableError(error) {
  return error?.code === "P2021";
}

function mergeById(primaryItems, fallbackItems) {
  const map = new Map();

  fallbackItems.forEach((item) => {
    map.set(item.id, item);
  });

  primaryItems.forEach((item) => {
    map.set(item.id, {
      ...(map.get(item.id) ?? {}),
      ...item,
    });
  });

  return Array.from(map.values());
}

export async function getBhajansContent() {
  try {
    const rows = await prisma.spiritualBhajan.findMany({ orderBy: { createdAt: "desc" } });
    const mapped = rows.map((row) => ({
        id: row.id,
        title_english: row.titleEnglish,
        title_hindi: row.titleHindi,
        deity: row.deity,
        type: row.type,
        lyrics_hindi: row.lyricsHindi,
        lyrics_english: row.lyricsEnglish,
        description: row.description,
      }));

    return mergeById(mapped, bhajansJson);
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.error("Failed to load spiritual bhajans from DB:", error);
    }
  }

  return bhajansJson;
}

export async function getBhajanById(id) {
  const all = await getBhajansContent();
  return all.find((item) => item.id === id) || null;
}

export async function getBooksContent() {
  try {
    const rows = await prisma.spiritualBook.findMany({
      orderBy: { createdAt: "desc" },
      include: { chapters: { orderBy: { chapterNumber: "asc" } } },
    });

    const mapped = rows.map((row) => ({
        id: row.id,
        title: row.title,
        author: row.author,
        description: row.description,
        chapters: row.chapters.map((chapter) => ({
          chapter_number: chapter.chapterNumber,
          title: chapter.title,
          description: chapter.description,
          verses: chapter.verses,
        })),
      }));

    return mergeById(mapped, booksJson);
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.error("Failed to load spiritual books from DB:", error);
    }
  }

  return booksJson;
}

export async function getBookById(id) {
  const all = await getBooksContent();
  return all.find((item) => item.id === id) || null;
}

export async function getShlokasContent() {
  try {
    const rows = await prisma.spiritualShloka.findMany({
      orderBy: [
        { source: "asc" },
        { chapter: "asc" },
        { verse: "asc" },
      ],
    });

    const mapped = rows.map((row) => ({
        id: row.id,
        source: row.source,
        chapter: row.chapter,
        verse: row.verse,
        hindi: row.hindi,
        english_transliteration: row.englishTransliteration,
        meaning_english: row.meaningEnglish,
        meaning_hindi: row.meaningHindi,
      }));

    return mergeById(mapped, shlokasJson);
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.error("Failed to load shlokas from DB:", error);
    }
  }

  return shlokasJson;
}
