import prisma from "../../lib/prisma";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getRequestHostFromHeaders, isAdminHostAllowed } from "../../lib/admin-access";
import BhajanEditor from "./BhajanEditor";
import {
  createSpiritualBhajan,
  createSpiritualBook,
  createSpiritualShloka,
  deleteAllSpiritualBhajans,
  deleteSpiritualBhajan,
  deleteSpiritualBook,
  deleteSpiritualShloka,
  importJsonContentToDb,
} from "./actions";

export const metadata = {
  title: "Admin Content | Vaasu",
  robots: { index: false, follow: false },
};

async function assertLocalAccessForPage() {
  const requestHeaders = await headers();
  const host = getRequestHostFromHeaders(requestHeaders);

  if (!isAdminHostAllowed(host)) {
    notFound();
  }
}

export default async function AdminContentPage({ searchParams }) {
  await assertLocalAccessForPage();

  const params = await searchParams;
  const status = params?.status;
  const message = params?.message;
  const editBhajanId = params?.editBhajan;
  const editBookId = params?.editBook;
  const editShlokaId = params?.editShloka;

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

  const selectedBhajan = editBhajanId ? bhajans.find((item) => item.id === editBhajanId) : null;
  const selectedBook = editBookId ? books.find((item) => item.id === editBookId) : null;
  const selectedShloka = editShlokaId ? shlokas.find((item) => item.id === editShlokaId) : null;

  const chapterTextarea = selectedBook
    ? selectedBook.chapters
        .map((chapter) => `${chapter.chapterNumber}|${chapter.title}|${chapter.description}|${chapter.verses}`)
        .join("\n")
    : "";

  return (
    <div style={{ padding: "36px 0", maxWidth: "980px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "12px", textAlign: "center" }}>Content Admin Panel</h1>
      <p style={{ textAlign: "center", color: "var(--text-light)", marginBottom: "28px" }}>
        Add or update Bhajans, Spiritual Books, and Shlokas directly from browser.
      </p>

      {status && (
        <div
          className="card"
          style={{
            marginBottom: "24px",
            border: status === "success" ? "2px solid #2E7D32" : "2px solid #C62828",
            background: status === "success" ? "#E8F5E9" : "#FFEBEE",
          }}
        >
          <strong>{status === "success" ? "Success" : "Error"}:</strong> {message}
        </div>
      )}

      <div className="card" style={{ marginBottom: "26px" }}>
        <h2 style={{ marginTop: 0 }}>Import Existing Test Content</h2>
        <p style={{ color: "var(--text-light)", marginTop: 0 }}>
          Click once to import all current JSON bhajans/books/shlokas into DB so they appear in Manage sections and become editable.
        </p>
        <form action={importJsonContentToDb} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input name="adminToken" type="password" placeholder="Admin token" required />
          <button type="submit" className="btn">Import JSON To DB</button>
        </form>
      </div>

      <BhajanEditor action={createSpiritualBhajan} initialBhajan={selectedBhajan} />

      <div className="card" style={{ marginBottom: "26px", border: "2px solid #C62828", background: "#FFF5F5" }}>
        <h2 style={{ marginTop: 0, color: "#8E0000" }}>Delete All Existing Bhajans</h2>
        <p style={{ color: "#6b1b1b", marginTop: 0 }}>
          Use this once to remove all current bhajans from the database if you want to avoid copyright risk and start fresh.
        </p>
        <form action={deleteAllSpiritualBhajans} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input name="adminToken" type="password" placeholder="Admin token" required />
          <button type="submit" className="btn btn-secondary">Delete All Bhajans</button>
        </form>
      </div>

      <div className="card" style={{ marginBottom: "26px" }}>
        <h2 style={{ marginTop: 0 }}>Add Or Update Spiritual Book</h2>
        {selectedBook && (
          <p style={{ color: "var(--primary)", marginTop: 0 }}>
            Editing book ID: <strong>{selectedBook.id}</strong>
          </p>
        )}
        <form action={createSpiritualBook} style={{ display: "grid", gap: "10px" }}>
          <input name="existingId" type="hidden" defaultValue={selectedBook?.id || ""} />
          <input name="adminToken" type="password" placeholder="Admin token" required />
          <input name="title" placeholder="Book Title" defaultValue={selectedBook?.title || ""} required />
          <input name="author" placeholder="Author" defaultValue={selectedBook?.author || ""} required />
          <textarea name="description" placeholder="Description" rows={3} defaultValue={selectedBook?.description || ""} required />
          <textarea
            name="chapters"
            rows={6}
            placeholder="Chapters format (one per line): chapterNumber|title|description|verses"
            defaultValue={chapterTextarea}
          />
          <button type="submit" className="btn" style={{ width: "fit-content" }}>Save Book</button>
        </form>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Add Or Update Shloka</h2>
        {selectedShloka && (
          <p style={{ color: "var(--primary)", marginTop: 0 }}>
            Editing shloka ID: <strong>{selectedShloka.id}</strong>
          </p>
        )}
        <form action={createSpiritualShloka} style={{ display: "grid", gap: "10px" }}>
          <input name="existingId" type="hidden" defaultValue={selectedShloka?.id || ""} />
          <input name="adminToken" type="password" placeholder="Admin token" required />
          <input name="source" placeholder="Source (e.g. Bhagavad Gita)" defaultValue={selectedShloka?.source || ""} required />
          <input name="chapter" type="number" placeholder="Chapter" defaultValue={selectedShloka?.chapter || ""} required />
          <input name="verse" type="number" placeholder="Verse" defaultValue={selectedShloka?.verse || ""} required />
          <textarea name="hindi" placeholder="Shloka (Hindi/Sanskrit)" rows={4} defaultValue={selectedShloka?.hindi || ""} required />
          <textarea name="englishTransliteration" placeholder="English transliteration" rows={3} defaultValue={selectedShloka?.englishTransliteration || ""} />
          <textarea name="meaningEnglish" placeholder="Meaning (English)" rows={3} defaultValue={selectedShloka?.meaningEnglish || ""} required />
          <textarea name="meaningHindi" placeholder="Meaning (Hindi)" rows={3} defaultValue={selectedShloka?.meaningHindi || ""} required />
          <button type="submit" className="btn" style={{ width: "fit-content" }}>Save Shloka</button>
        </form>
      </div>

      <div className="card" style={{ marginTop: "26px", marginBottom: "26px" }}>
        <h2 style={{ marginTop: 0 }}>Manage Existing Bhajans (DB)</h2>
        {bhajans.length === 0 ? (
          <p style={{ marginBottom: 0, color: "var(--text-light)" }}>No DB bhajans yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "10px" }}>
            {bhajans.map((item) => (
              <div key={item.id} style={{ border: "1px solid rgba(255, 178, 107, 0.3)", borderRadius: "12px", padding: "12px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong>{item.titleEnglish}</strong> ({item.id})
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a href={`/admin-ramanju-portal?editBhajan=${item.id}`} className="btn">Edit</a>
                  <form action={deleteSpiritualBhajan} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <input type="hidden" name="id" value={item.id} />
                    <input name="adminToken" type="password" placeholder="Admin token" required />
                    <button type="submit" className="btn btn-secondary">Delete</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: "26px" }}>
        <h2 style={{ marginTop: 0 }}>Manage Existing Books (DB)</h2>
        {books.length === 0 ? (
          <p style={{ marginBottom: 0, color: "var(--text-light)" }}>No DB books yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "10px" }}>
            {books.map((item) => (
              <div key={item.id} style={{ border: "1px solid rgba(255, 178, 107, 0.3)", borderRadius: "12px", padding: "12px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong>{item.title}</strong> ({item.id})
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a href={`/admin-ramanju-portal?editBook=${item.id}`} className="btn">Edit</a>
                  <form action={deleteSpiritualBook} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <input type="hidden" name="id" value={item.id} />
                    <input name="adminToken" type="password" placeholder="Admin token" required />
                    <button type="submit" className="btn btn-secondary">Delete</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: "26px" }}>
        <h2 style={{ marginTop: 0 }}>Manage Existing Shlokas (DB)</h2>
        {shlokas.length === 0 ? (
          <p style={{ marginBottom: 0, color: "var(--text-light)" }}>No DB shlokas yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "10px" }}>
            {shlokas.map((item) => (
              <div key={item.id} style={{ border: "1px solid rgba(255, 178, 107, 0.3)", borderRadius: "12px", padding: "12px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong>{item.source} {item.chapter}.{item.verse}</strong> ({item.id})
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a href={`/admin-ramanju-portal?editShloka=${item.id}`} className="btn">Edit</a>
                  <form action={deleteSpiritualShloka} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <input type="hidden" name="id" value={item.id} />
                    <input name="adminToken" type="password" placeholder="Admin token" required />
                    <button type="submit" className="btn btn-secondary">Delete</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
