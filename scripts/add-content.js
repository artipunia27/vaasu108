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
  const title = await question('Bhajan Title: ');
  const deity = await question('Deity (e.g. Lord Krishna): ');
  const description = await question('Short Explanation/Description: ');
  console.log('Enter the lyrics of the Bhajan (use \n for line breaks, or we will add them based on your text): ');
  const lyrics = await question('Lyrics: ');

  const bhajansPath = path.join(DATA_DIR, 'bhajans.json');
  let bhajans = [];
  try {
    const data = fs.readFileSync(bhajansPath, 'utf8');
    bhajans = JSON.parse(data);
  } catch (error) {
    console.log('Could not read existing bhajans, starting fresh.');
  }

  const newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  const newBhajan = {
    id: newId,
    title: title,
    deity: deity,
    description: description,
    lyrics: lyrics.split('\n').filter(line => line.trim() !== '')
  };

  bhajans.push(newBhajan);
  fs.writeFileSync(bhajansPath, JSON.stringify(bhajans, null, 2));
  console.log(`\n✅ Successfully added ${title}! The file at src/data/bhajans.json has been updated.`);
}

async function addBook() {
  const title = await question('Book Title: ');
  const author = await question('Author: ');
  const description = await question('Description: ');

  const booksPath = path.join(DATA_DIR, 'books.json');
  let books = [];
  try {
    const data = fs.readFileSync(booksPath, 'utf8');
    books = JSON.parse(data);
  } catch (error) {
    console.log('Could not read existing books, starting fresh.');
  }

  const newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  const newBook = {
    id: newId,
    title: title,
    author: author,
    description: description
  };

  books.push(newBook);
  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  console.log(`\n✅ Successfully added ${title}! The file at src/data/books.json has been updated.`);
}

async function addShloka() {
  const reference = await question('Shloka Reference (e.g. Bhagavad Gita 2.47): ');
  const text = await question('Sanskrit Verse/Text: ');
  const meaning = await question('English Meaning: ');

  const shlokasPath = path.join(DATA_DIR, 'shlokas.json');
  let shlokas = [];
  try {
    const data = fs.readFileSync(shlokasPath, 'utf8');
    shlokas = JSON.parse(data);
  } catch (error) {
    console.log('Could not read existing shlokas, starting fresh.');
  }

  const newId = reference.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  const newShloka = {
    id: newId,
    reference: reference,
    text: text,
    meaning: meaning
  };

  shlokas.push(newShloka);
  fs.writeFileSync(shlokasPath, JSON.stringify(shlokas, null, 2));
  console.log(`\n✅ Successfully added ${reference}! The file at src/data/shlokas.json has been updated.`);
}

main().catch(console.error);
