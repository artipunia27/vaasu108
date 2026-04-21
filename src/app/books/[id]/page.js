import { getBookById } from "../../../lib/content-store";

export default async function BookDetails({ params }) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    return (
      <div style={{textAlign: 'center', padding: '100px 0'}}>
        <h1>Granth Not Found</h1>
        <p>Sorry, the spiritual book you are looking for is not available or is coming soon.</p>
        <a href="/books" className="btn" style={{marginTop: '20px'}}>Back to Books</a>
      </div>
    );
  }

  return (
    <div style={{padding: '40px 0', maxWidth: '800px', margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <h1 style={{fontSize: '36px', color: 'var(--primary)'}}>{book.title}</h1>
        <h2 style={{fontSize: '20px', color: 'var(--text-light)', fontWeight: 'normal', marginTop: '10px'}}>
          Author: {book.author}
        </h2>
        <p style={{marginTop: '20px'}}>{book.description}</p>
      </div>

      <h2 style={{borderBottom: '2px solid var(--primary-light)', paddingBottom: '10px', marginBottom: '20px'}}>
        Chapters
      </h2>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
        {book.chapters.map(chapter => (
          <div key={chapter.chapter_number} className="card" style={{display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <h3>Chapter {chapter.chapter_number}: {chapter.title}</h3>
              <p style={{color: 'var(--text-light)'}}>{chapter.description} • {chapter.verses} Verses</p>
            </div>
            <a href="#" className="btn">Read</a>
          </div>
        ))}
      </div>
    </div>
  );
}
