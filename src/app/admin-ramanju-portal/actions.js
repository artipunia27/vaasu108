"use server";

import { revalidatePath } from "next/cache";
import { redirect, unstable_rethrow } from "next/navigation";
import prisma from "../../lib/prisma";
import { assertAdminRequestAllowed } from "../../lib/admin-access";
import bhajansData from "../../data/bhajans.json";
import booksData from "../../data/books.json";
import shlokasData from "../../data/shlokas.json";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function assertAdminToken(formData) {
  const submitted = String(formData.get("adminToken") || "").trim();
  const expected = process.env.CONTENT_ADMIN_TOKEN;

  if (!expected) {
    throw new Error("CONTENT_ADMIN_TOKEN is not set in environment.");
  }

  if (!submitted || submitted !== expected) {
    throw new Error("Invalid admin token.");
  }
}

function getLines(value) {
  const normalized = String(value || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd());

  while (normalized.length > 0 && normalized[0] === "") {
    normalized.shift();
  }

  while (normalized.length > 0 && normalized[normalized.length - 1] === "") {
    normalized.pop();
  }

  return normalized;
}

function normalizeLyricsLines(value) {
  const rawLines = String(value || "")
    .replace(/\r\n?/g, "\n")
    .split("\n");

  const normalized = rawLines.map((line) => {
    const trimmed = String(line || "").trim();
    if (!trimmed) return "";

    // Remove common numbering/bullet prefixes from pasted text.
    const withoutPrefixes = trimmed.replace(/^([0-9]+[\.)]|[-*•])\s+/, "");
    return withoutPrefixes.replace(/\s+/g, " ");
  });

  const compact = [];
  let previousBlank = true;
  for (const line of normalized) {
    const isBlank = line === "";
    if (isBlank && previousBlank) continue;
    compact.push(line);
    previousBlank = isBlank;
  }

  while (compact.length > 0 && compact[0] === "") compact.shift();
  while (compact.length > 0 && compact[compact.length - 1] === "") compact.pop();
  return compact;
}

function assertLyricsSafety(lines) {
  const text = (lines || []).join(" ").toLowerCase();
  const riskyPatterns = [
    "all rights reserved",
    "copyright",
    "lyrics licensed",
    "from movie",
    "from film",
    "official soundtrack",
  ];

  const hit = riskyPatterns.find((token) => text.includes(token));
  if (hit) {
    throw new Error("Potential copyright-risk content detected. Please submit only original, licensed, or public-domain lyrics.");
  }
}

function escapeForSentence(value) {
  return String(value || "")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getFirstMeaningfulLine(lines) {
  return (lines || []).map((line) => String(line || "").trim()).find(Boolean) || "";
}

function buildStructuredBhajanDescription({ titleEnglish, deity, type, lyricsHindi, lyricsEnglish, sourceNote }) {
  const firstHindi = getFirstMeaningfulLine(lyricsHindi);
  const firstEnglish = getFirstMeaningfulLine(lyricsEnglish);
  const excerpt = escapeForSentence(firstHindi || firstEnglish || "Devotional lyrics provided by contributor.");
  const safeSource = escapeForSentence(sourceNote || "Contributor-submitted / public-domain source");

  return [
    `Overview: ${titleEnglish} is a ${type.toLowerCase()} dedicated to ${deity}.`,
    `Key Theme: Devotion, surrender, and inner spiritual reflection through daily chanting.`,
    `Opening Line: ${excerpt}.`,
    `Practice Guidance: Recite mindfully with correct pronunciation and intention.`,
    `Source Note: ${safeSource}. Content submitted by admin with usage rights confirmation.`,
  ].join(" ");
}

function getChapterLines(value) {
  const lines = getLines(value);
  return lines.map((line, index) => {
    const [numRaw, titleRaw, descriptionRaw, versesRaw] = line.split("|").map((part) => (part || "").trim());

    return {
      chapterNumber: Number.parseInt(numRaw, 10) || index + 1,
      title: titleRaw || `Chapter ${index + 1}`,
      description: descriptionRaw || "",
      verses: Number.parseInt(versesRaw, 10) || 0,
    };
  });
}

function withStatusRedirect(status, message) {
  const params = new URLSearchParams({ status, message });
  redirect(`/admin-ramanju-portal?${params.toString()}`);
}

function revalidateContentPaths() {
  revalidatePath("/");
  revalidatePath("/bhajans");
  revalidatePath("/books");
  revalidatePath("/admin-ramanju-portal");
}

export async function createSpiritualBhajan(formData) {
  try {
    await assertAdminRequestAllowed();
    assertAdminToken(formData);

    const existingId = String(formData.get("existingId") || "").trim();
    const titleEnglish = String(formData.get("titleEnglish") || "").trim();
    const titleHindi = String(formData.get("titleHindi") || "").trim();
    const deity = String(formData.get("deity") || "").trim();
    const type = String(formData.get("type") || "Bhajan").trim();
    const sourceNote = String(formData.get("sourceNote") || "").trim() || "Contributor-submitted source";
    const rightsConfirmed = String(formData.get("rightsConfirmed") || "") === "on";
    const existingBhajan = existingId
      ? await prisma.spiritualBhajan.findUnique({ where: { id: existingId } })
      : null;
    const lyricsHindi = normalizeLyricsLines(formData.get("lyricsHindi"));
    const lyricsEnglish = normalizeLyricsLines(formData.get("lyricsEnglish"));

    if (!rightsConfirmed) {
      throw new Error("Please confirm that you have rights or public-domain permission for this bhajan content.");
    }

    assertLyricsSafety(lyricsHindi);
    assertLyricsSafety(lyricsEnglish);

    const description = buildStructuredBhajanDescription({
      titleEnglish,
      deity,
      type,
      lyricsHindi,
      lyricsEnglish,
      sourceNote,
    }) || existingBhajan?.description || `${titleEnglish} devotional bhajan`;

    if (!titleEnglish || !titleHindi || !deity) {
      throw new Error("Please fill all required bhajan fields.");
    }

    const id = existingId || slugify(titleEnglish);

    await prisma.spiritualBhajan.upsert({
      where: { id },
      update: {
        titleEnglish,
        titleHindi,
        deity,
        type,
        description,
        lyricsHindi,
        lyricsEnglish,
      },
      create: {
        id,
        titleEnglish,
        titleHindi,
        deity,
        type,
        description,
        lyricsHindi,
        lyricsEnglish,
      },
    });

    revalidateContentPaths();
    revalidatePath(`/bhajans/${id}`);
    withStatusRedirect("success", `Bhajan saved: ${titleEnglish}`);
  } catch (error) {
    unstable_rethrow(error);
    withStatusRedirect("error", error.message || "Failed to save bhajan.");
  }
}

export async function deleteAllSpiritualBhajans(formData) {
  try {
    await assertAdminRequestAllowed();
    assertAdminToken(formData);

    const result = await prisma.spiritualBhajan.deleteMany({});
    revalidateContentPaths();
    withStatusRedirect("success", `Deleted ${result.count} bhajans from database.`);
  } catch (error) {
    unstable_rethrow(error);
    withStatusRedirect("error", error.message || "Failed to delete all bhajans.");
  }
}

export async function createSpiritualBook(formData) {
  try {
    await assertAdminRequestAllowed();
    assertAdminToken(formData);

    const existingId = String(formData.get("existingId") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const author = String(formData.get("author") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const chapterLines = getChapterLines(formData.get("chapters"));

    if (!title || !author || !description) {
      throw new Error("Please fill all required book fields.");
    }

    const id = existingId || slugify(title);

    await prisma.$transaction(async (tx) => {
      await tx.spiritualBook.upsert({
        where: { id },
        update: {
          title,
          author,
          description,
        },
        create: {
          id,
          title,
          author,
          description,
        },
      });

      await tx.spiritualChapter.deleteMany({ where: { bookId: id } });

      if (chapterLines.length > 0) {
        await tx.spiritualChapter.createMany({
          data: chapterLines.map((chapter) => ({
            bookId: id,
            chapterNumber: chapter.chapterNumber,
            title: chapter.title,
            description: chapter.description,
            verses: chapter.verses,
          })),
        });
      }
    });

    revalidateContentPaths();
    revalidatePath(`/books/${id}`);
    withStatusRedirect("success", `Book saved: ${title}`);
  } catch (error) {
    unstable_rethrow(error);
    withStatusRedirect("error", error.message || "Failed to save book.");
  }
}

export async function createSpiritualShloka(formData) {
  try {
    await assertAdminRequestAllowed();
    assertAdminToken(formData);

    const existingId = String(formData.get("existingId") || "").trim();
    const source = String(formData.get("source") || "").trim();
    const chapter = Number.parseInt(String(formData.get("chapter") || ""), 10);
    const verse = Number.parseInt(String(formData.get("verse") || ""), 10);
    const hindi = String(formData.get("hindi") || "").trim();
    const englishTransliteration = String(formData.get("englishTransliteration") || "").trim();
    const meaningEnglish = String(formData.get("meaningEnglish") || "").trim();
    const meaningHindi = String(formData.get("meaningHindi") || "").trim();

    if (!source || !chapter || !verse || !hindi || !meaningEnglish || !meaningHindi) {
      throw new Error("Please fill all required shloka fields.");
    }

    const id = existingId || `${slugify(source)}-${chapter}-${verse}`;

    await prisma.spiritualShloka.upsert({
      where: { id },
      update: {
        source,
        chapter,
        verse,
        hindi,
        englishTransliteration,
        meaningEnglish,
        meaningHindi,
      },
      create: {
        id,
        source,
        chapter,
        verse,
        hindi,
        englishTransliteration,
        meaningEnglish,
        meaningHindi,
      },
    });

    revalidateContentPaths();
    withStatusRedirect("success", `Shloka saved: ${source} ${chapter}.${verse}`);
  } catch (error) {
    unstable_rethrow(error);
    withStatusRedirect("error", error.message || "Failed to save shloka.");
  }
}

export async function deleteSpiritualBhajan(formData) {
  try {
    await assertAdminRequestAllowed();
    assertAdminToken(formData);
    const id = String(formData.get("id") || "").trim();

    if (!id) {
      throw new Error("Bhajan id is required.");
    }

    await prisma.spiritualBhajan.delete({ where: { id } });
    revalidateContentPaths();
    revalidatePath(`/bhajans/${id}`);
    withStatusRedirect("success", `Bhajan deleted: ${id}`);
  } catch (error) {
    unstable_rethrow(error);
    withStatusRedirect("error", error.message || "Failed to delete bhajan.");
  }
}

export async function deleteSpiritualBook(formData) {
  try {
    await assertAdminRequestAllowed();
    assertAdminToken(formData);
    const id = String(formData.get("id") || "").trim();

    if (!id) {
      throw new Error("Book id is required.");
    }

    await prisma.spiritualBook.delete({ where: { id } });
    revalidateContentPaths();
    revalidatePath(`/books/${id}`);
    withStatusRedirect("success", `Book deleted: ${id}`);
  } catch (error) {
    unstable_rethrow(error);
    withStatusRedirect("error", error.message || "Failed to delete book.");
  }
}

export async function deleteSpiritualShloka(formData) {
  try {
    await assertAdminRequestAllowed();
    assertAdminToken(formData);
    const id = String(formData.get("id") || "").trim();

    if (!id) {
      throw new Error("Shloka id is required.");
    }

    await prisma.spiritualShloka.delete({ where: { id } });
    revalidateContentPaths();
    withStatusRedirect("success", `Shloka deleted: ${id}`);
  } catch (error) {
    unstable_rethrow(error);
    withStatusRedirect("error", error.message || "Failed to delete shloka.");
  }
}

export async function importJsonContentToDb(formData) {
  try {
    await assertAdminRequestAllowed();
    assertAdminToken(formData);

    for (const bhajan of bhajansData) {
      await prisma.spiritualBhajan.upsert({
        where: { id: bhajan.id },
        update: {
          titleEnglish: bhajan.title_english,
          titleHindi: bhajan.title_hindi,
          deity: bhajan.deity,
          type: bhajan.type,
          description: bhajan.description,
          lyricsHindi: bhajan.lyrics_hindi || [],
          lyricsEnglish: bhajan.lyrics_english || [],
        },
        create: {
          id: bhajan.id,
          titleEnglish: bhajan.title_english,
          titleHindi: bhajan.title_hindi,
          deity: bhajan.deity,
          type: bhajan.type,
          description: bhajan.description,
          lyricsHindi: bhajan.lyrics_hindi || [],
          lyricsEnglish: bhajan.lyrics_english || [],
        },
      });
    }

    for (const book of booksData) {
      await prisma.spiritualBook.upsert({
        where: { id: book.id },
        update: {
          title: book.title,
          author: book.author,
          description: book.description,
        },
        create: {
          id: book.id,
          title: book.title,
          author: book.author,
          description: book.description,
        },
      });

      await prisma.$transaction(async (tx) => {
        await tx.spiritualChapter.deleteMany({ where: { bookId: book.id } });

        if (book.chapters?.length) {
          await tx.spiritualChapter.createMany({
            data: book.chapters.map((chapter) => ({
              bookId: book.id,
              chapterNumber: chapter.chapter_number,
              title: chapter.title,
              description: chapter.description,
              verses: chapter.verses,
            })),
          });
        }
      });
    }

    for (const shloka of shlokasData) {
      await prisma.spiritualShloka.upsert({
        where: { id: shloka.id },
        update: {
          source: shloka.source,
          chapter: shloka.chapter,
          verse: shloka.verse,
          hindi: shloka.hindi,
          englishTransliteration: shloka.english_transliteration,
          meaningEnglish: shloka.meaning_english,
          meaningHindi: shloka.meaning_hindi,
        },
        create: {
          id: shloka.id,
          source: shloka.source,
          chapter: shloka.chapter,
          verse: shloka.verse,
          hindi: shloka.hindi,
          englishTransliteration: shloka.english_transliteration,
          meaningEnglish: shloka.meaning_english,
          meaningHindi: shloka.meaning_hindi,
        },
      });
    }

    revalidateContentPaths();
    withStatusRedirect("success", "JSON content imported to DB. You can now edit all items.");
  } catch (error) {
    unstable_rethrow(error);
    withStatusRedirect("error", error.message || "Failed to import JSON content.");
  }
}
