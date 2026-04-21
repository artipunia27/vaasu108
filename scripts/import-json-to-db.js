const { PrismaClient } = require("@prisma/client");
const bhajans = require("../src/data/bhajans.json");
const books = require("../src/data/books.json");
const shlokas = require("../src/data/shlokas.json");

const db = new PrismaClient();

async function run() {
  for (const b of bhajans) {
    await db.spiritualBhajan.upsert({
      where: { id: b.id },
      update: {
        titleEnglish: b.title_english,
        titleHindi: b.title_hindi,
        deity: b.deity,
        type: b.type,
        description: b.description,
        lyricsHindi: b.lyrics_hindi || [],
        lyricsEnglish: b.lyrics_english || [],
      },
      create: {
        id: b.id,
        titleEnglish: b.title_english,
        titleHindi: b.title_hindi,
        deity: b.deity,
        type: b.type,
        description: b.description,
        lyricsHindi: b.lyrics_hindi || [],
        lyricsEnglish: b.lyrics_english || [],
      },
    });
  }

  for (const bk of books) {
    await db.spiritualBook.upsert({
      where: { id: bk.id },
      update: {
        title: bk.title,
        author: bk.author,
        description: bk.description,
      },
      create: {
        id: bk.id,
        title: bk.title,
        author: bk.author,
        description: bk.description,
      },
    });

    await db.spiritualChapter.deleteMany({ where: { bookId: bk.id } });

    if (bk.chapters?.length) {
      await db.spiritualChapter.createMany({
        data: bk.chapters.map((c) => ({
          bookId: bk.id,
          chapterNumber: c.chapter_number,
          title: c.title,
          description: c.description,
          verses: c.verses,
        })),
      });
    }
  }

  for (const s of shlokas) {
    await db.spiritualShloka.upsert({
      where: { id: s.id },
      update: {
        source: s.source,
        chapter: s.chapter,
        verse: s.verse,
        hindi: s.hindi,
        englishTransliteration: s.english_transliteration,
        meaningEnglish: s.meaning_english,
        meaningHindi: s.meaning_hindi,
      },
      create: {
        id: s.id,
        source: s.source,
        chapter: s.chapter,
        verse: s.verse,
        hindi: s.hindi,
        englishTransliteration: s.english_transliteration,
        meaningEnglish: s.meaning_english,
        meaningHindi: s.meaning_hindi,
      },
    });
  }

  console.log(
    `Imported ${bhajans.length} bhajans, ${books.length} books, and ${shlokas.length} shlokas into DB.`
  );
}

run()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
