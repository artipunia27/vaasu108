const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const bhajansPath = path.join(__dirname, "..", "src", "data", "bhajans.json");
const booksPath = path.join(__dirname, "..", "src", "data", "books.json");
const shlokasPath = path.join(__dirname, "..", "src", "data", "shlokas.json");

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function run() {
  const [bhajans, books, shlokas] = await Promise.all([
    prisma.spiritualBhajan.findMany({ orderBy: { updatedAt: "desc" } }),
    prisma.spiritualBook.findMany({
      orderBy: { updatedAt: "desc" },
      include: { chapters: { orderBy: { chapterNumber: "asc" } } },
    }),
    prisma.spiritualShloka.findMany({
      orderBy: [{ source: "asc" }, { chapter: "asc" }, { verse: "asc" }],
    }),
  ]);

  const bhajansJson = bhajans.map((item) => ({
    id: item.id,
    title_english: item.titleEnglish,
    title_hindi: item.titleHindi,
    deity: item.deity,
    type: item.type,
    lyrics_hindi: item.lyricsHindi || [],
    lyrics_english: item.lyricsEnglish || [],
    description: item.description,
  }));

  const booksJson = books.map((item) => ({
    id: item.id,
    title: item.title,
    author: item.author,
    description: item.description,
    chapters: (item.chapters || []).map((chapter) => ({
      chapter_number: chapter.chapterNumber,
      title: chapter.title,
      description: chapter.description,
      verses: chapter.verses,
    })),
  }));

  const shlokasJson = shlokas.map((item) => ({
    id: item.id,
    source: item.source,
    chapter: item.chapter,
    verse: item.verse,
    hindi: item.hindi,
    english_transliteration: item.englishTransliteration,
    meaning_english: item.meaningEnglish,
    meaning_hindi: item.meaningHindi,
  }));

  writeJson(bhajansPath, bhajansJson);
  writeJson(booksPath, booksJson);
  writeJson(shlokasPath, shlokasJson);

  console.log(`Exported ${bhajansJson.length} bhajans to ${bhajansPath}`);
  console.log(`Exported ${booksJson.length} books to ${booksPath}`);
  console.log(`Exported ${shlokasJson.length} shlokas to ${shlokasPath}`);
}

run()
  .catch((error) => {
    console.error("Failed to export DB content to JSON:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
