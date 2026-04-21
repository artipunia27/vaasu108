const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DATA_DIR = path.join(__dirname, '../src/data');

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('🙏 Welcome to the Vaasu Content Adder 🙏\n');
  
  console.log('What would you like to add?');
  console.log('1. New Bhajan');
  console.log('2. New Book');
  console.log('3. New Shloka');
  
  const choice = await question('Enter the number (1-3): ');
  
  if (choice === '1') {
    await addBhajan();
  } else if (choice === '2') {
    await addBook();
  } else if (choice === '3') {
    await addShloka();
  } else {
    console.log('Unknown choice. Exiting.');
  }

  rl.close();
}

async function addBhajan() {
  const titleEnglish = await question('Bhajan Title (English): ');
  const titleHindi = await question('Bhajan Title (Hindi): ');
  const deity = await question('Deity (e.g. Krishna, Shiva, Hanuman): ');
  const type = await question('Type (Bhajan/Aarti/Chalisa/Mantra Bhajan): ');
  const description = await question('Short Explanation/Description: ');
  console.log('Enter Hindi lyrics using | between lines (example: line1|line2|line3)');
  const hindiLyricsInput = await question('Hindi Lyrics: ');
  console.log('Enter English lyrics using | between lines (example: line1|line2|line3)');
  const englishLyricsInput = await question('English Lyrics: ');

  const bhajansPath = path.join(DATA_DIR, 'bhajans.json');
  let bhajans = [];
  try {
    const data = fs.readFileSync(bhajansPath, 'utf8');
    bhajans = JSON.parse(data);
  } catch (error) {
    console.log('Could not read existing bhajans, starting fresh.');
  }

  const newId = titleEnglish.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const lyricsHindi = hindiLyricsInput
    .split('|')
    .map(line => line.trim())
    .filter(Boolean);
  const lyricsEnglish = englishLyricsInput
    .split('|')
    .map(line => line.trim())
    .filter(Boolean);
  
  const newBhajan = {
    id: newId,
    title_english: titleEnglish,
    title_hindi: titleHindi,
    deity: deity,
    type: type || 'Bhajan',
    lyrics_hindi: lyricsHindi,
    lyrics_english: lyricsEnglish,
    description: description,
  };

  bhajans.push(newBhajan);
  fs.writeFileSync(bhajansPath, JSON.stringify(bhajans, null, 2));
  console.log(`\n✅ Successfully added ${titleEnglish}! The file at src/data/bhajans.json has been updated.`);
}

async function addBook() {
  const title = await question('Book Title: ');
  const author = await question('Author: ');
  const description = await question('Description: ');
  const chapterCountRaw = await question('How many chapters to add now? (number): ');
  const chapterCount = Math.max(0, parseInt(chapterCountRaw, 10) || 0);

  const booksPath = path.join(DATA_DIR, 'books.json');
  let books = [];
  try {
    const data = fs.readFileSync(booksPath, 'utf8');
    books = JSON.parse(data);
  } catch (error) {
    console.log('Could not read existing books, starting fresh.');
  }

  const newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const chapters = [];

  for (let i = 0; i < chapterCount; i++) {
    console.log(`\nChapter ${i + 1}`);
    const chapterNumberRaw = await question('Chapter Number: ');
    const chapterTitle = await question('Chapter Title: ');
    const chapterDescription = await question('Chapter Description: ');
    const verseCountRaw = await question('Verse Count: ');

    chapters.push({
      chapter_number: parseInt(chapterNumberRaw, 10) || i + 1,
      title: chapterTitle,
      description: chapterDescription,
      verses: parseInt(verseCountRaw, 10) || 0,
    });
  }
  
  const newBook = {
    id: newId,
    title: title,
    author: author,
    description: description,
    chapters,
  };

  books.push(newBook);
  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  console.log(`\n✅ Successfully added ${title}! The file at src/data/books.json has been updated.`);
}

async function addShloka() {
  const source = await question('Source (e.g. Bhagavad Gita): ');
  const chapterRaw = await question('Chapter Number: ');
  const verseRaw = await question('Verse Number: ');
  const hindi = await question('Sanskrit/Hindi Verse Text: ');
  const transliteration = await question('English Transliteration: ');
  const meaningEnglish = await question('English Meaning: ');
  const meaningHindi = await question('Hindi Meaning: ');

  const shlokasPath = path.join(DATA_DIR, 'shlokas.json');
  let shlokas = [];
  try {
    const data = fs.readFileSync(shlokasPath, 'utf8');
    shlokas = JSON.parse(data);
  } catch (error) {
    console.log('Could not read existing shlokas, starting fresh.');
  }

  const chapter = parseInt(chapterRaw, 10) || 1;
  const verse = parseInt(verseRaw, 10) || 1;
  const newId = `${source.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${chapter}-${verse}`.replace(/(^-|-$)+/g, '');
  
  const newShloka = {
    id: newId,
    source,
    chapter,
    verse,
    hindi,
    english_transliteration: transliteration,
    meaning_english: meaningEnglish,
    meaning_hindi: meaningHindi,
  };

  shlokas.push(newShloka);
  fs.writeFileSync(shlokasPath, JSON.stringify(shlokas, null, 2));
  console.log(`\n✅ Successfully added ${source} ${chapter}.${verse}! The file at src/data/shlokas.json has been updated.`);
}

main().catch(console.error);
