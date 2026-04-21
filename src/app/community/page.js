"use client";
import { useState, useEffect } from "react";
import { getBhajans, createBhajan, likeBhajan, deleteBhajan, addComment, deleteComment } from "./actions";

export default function CommunityPage() {
  const [bhajans, setBhajans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myUserId, setMyUserId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const getOrCreateUserId = () => {
    if (typeof window === "undefined") {
      return null;
    }

    let storedId = localStorage.getItem("vaasu_user_id");
    if (!storedId) {
      storedId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem("vaasu_user_id", storedId);
    }

    return storedId;
  };

  // Fetch bhajans from DB on load
  useEffect(() => {
    async function loadData() {
      const data = await getBhajans();
      setBhajans(data);
      setIsLoading(false);
    }
    loadData();

    // Setup local user ID for ownership
    setMyUserId(getOrCreateUserId());
    
    // Automatically fill author name if they used it before
    const lastAuthor = localStorage.getItem("vaasu_last_author");
    if (lastAuthor) setNewAuthor(lastAuthor);
  }, []);

  const handleLike = async (id) => {
    // Optimistic UI update
    setBhajans(bhajans.map(b => b.id === id ? { ...b, likes: b.likes + 1 } : b));
    
    // DB update
    try {
      await likeBhajan(id);
    } catch (e) {
      // Revert optimistic update on failure (simplified)
      const data = await getBhajans();
      setBhajans(data);
    }
  };

  const handleDeleteBhajan = async (id) => {
    if (confirm("Are you sure you want to delete your bhajan?")) {
      try {
        await deleteBhajan(id, myUserId);
        setBhajans(bhajans.filter(b => b.id !== id));
      } catch (e) {
        alert("Failed to delete bhajan or unauthorized.");
      }
    }
    setOpenMenuId(null);
  };

  const handleCreateComment = async (postId, text) => {
    if(!text.trim()) return;
    const author = newAuthor || "Guest";
    const ownerId = myUserId || getOrCreateUserId();

    if (!ownerId) {
      alert("Please wait a moment and try again.");
      return;
    }
    
    try {
      setMyUserId(ownerId);
      const newComment = await addComment(postId, text, author, ownerId);
      setBhajans(bhajans.map(b => b.id === postId ? {...b, comments: [...b.comments, newComment]} : b));
    } catch(e) {
      alert("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (confirm("Delete this comment?")) {
      try {
        await deleteComment(commentId, myUserId);
        setBhajans(bhajans.map(b => {
          if (b.id === postId) {
            return { ...b, comments: b.comments.filter(c => c.id !== commentId) };
          }
          return b;
        }));
      } catch (e) {
        alert("Failed to delete comment or unauthorized.");
      }
    }
  };

  const handleShare = async (title, text) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${title}\n${text}\n\nRead more at: ${window.location.href}`);
        alert("Copied to clipboard!");
      }
    } catch (err) {
      console.log("Error sharing", err);
    }
    setOpenMenuId(null);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newTitle || !newContent || !newAuthor) return;

    const ownerId = myUserId || getOrCreateUserId();
    if (!ownerId) {
      alert("Please wait a moment and try again.");
      return;
    }
    
    setIsSubmitting(true);
    localStorage.setItem("vaasu_last_author", newAuthor); // Remember name
    
    try {
      setMyUserId(ownerId);
      const newBhajan = await createBhajan(newTitle, newContent, newAuthor, ownerId);
      setBhajans([newBhajan, ...bhajans]);
      setNewTitle("");
      setNewContent("");
    } catch (e) {
      alert("Failed to post Bhajan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{padding: '40px 0', maxWidth: '800px', margin: '0 auto'}}>
      <h1 style={{textAlign: 'center', marginBottom: '20px', fontSize: '36px', color: 'var(--primary)'}}>
        Community Bhajans
      </h1>
      <p style={{textAlign: 'center', color: 'var(--text-light)', marginBottom: '50px', fontSize: '18px'}}>
        Share your original bhajans, pads, and devotional thoughts with our spiritual community.
      </p>

      {/* POSTING FORM */}
      <div className="card" style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,107,53,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
        marginBottom: '60px'
      }}>
        <h2 style={{marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <span>✍️</span> Write a Bhajan
        </h2>
        <form onSubmit={handlePost} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
            <input 
              type="text" 
              placeholder="Your Name (e.g. Radhika)" 
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              style={{padding: '14px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px'}}
              required
            />
            <input 
              type="text" 
              placeholder="Title of Bhajan" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{padding: '14px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px'}}
              required
            />
          </div>
          <textarea 
            placeholder="Write your lines here..." 
            rows="6"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{padding: '14px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px', resize: 'vertical'}}
            required
          />
          <button 
            type="submit" 
            className="btn" 
            disabled={isSubmitting}
            style={{alignSelf: 'flex-end', opacity: isSubmitting ? 0.7 : 1}}
          >
            {isSubmitting ? 'Posting...' : 'Post to Community ✨'}
          </button>
        </form>
      </div>

      {/* FEED */}
      <div>
        <h3 style={{marginBottom: '30px', fontSize: '24px', borderBottom: '2px solid var(--accent)', paddingBottom: '10px', display: 'inline-block'}}>
          Recent Contributions
        </h3>
        
        {isLoading ? (
          <p style={{textAlign: 'center', color: 'var(--text-light)'}}>Loading pure devotion from database...</p>
        ) : bhajans.length === 0 ? (
          <p style={{textAlign: 'center', color: 'var(--text-light)', fontStyle: 'italic'}}>No contributions yet. Be the first to share a beautiful post!</p>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
            {bhajans.map((post) => (
              <div key={post.id} className="card" style={{transition: 'transform 0.2s ease', position: 'relative'}}>
                {/* Header */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'}}>
                  <div>
                    <h4 style={{fontSize: '22px', color: 'var(--primary)', marginBottom: '4px'}}>{post.title}</h4>
                    <p style={{color: 'var(--text-light)', fontSize: '14px'}}>By <strong>{post.author}</strong> • {new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  {/* Actions Menu */}
                  <div style={{position: 'relative'}}>
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === post.id ? null : post.id)}
                      style={{background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', padding: '0 8px', color: 'var(--text-light)'}}
                      aria-label="Options"
                    >
                      ⋮
                    </button>
                    
                    {openMenuId === post.id && (
                      <div style={{
                        position: 'absolute', right: '0', top: '100%', 
                        background: 'white', border: '1px solid #eee', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px',
                        overflow: 'hidden', zIndex: 10, minWidth: '150px'
                      }}>
                        <button 
                          onClick={() => handleShare(post.title, post.content)}
                          style={{width: '100%', padding: '12px 16px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid #f5f5f5', display: 'block'}}
                        >
                          🔗 Share
                        </button>
                        
                        {/* ONLY show delete if they are the owner! */}
                        {post.ownerId === myUserId && (
                          <button 
                            onClick={() => handleDeleteBhajan(post.id)}
                            style={{width: '100%', padding: '12px 16px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: '#D32F2F', display: 'block'}}
                          >
                            🗑️ Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div style={{
                  background: '#FAFAFA', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  whiteSpace: 'pre-line',
                  fontStyle: 'italic',
                  lineHeight: '1.8',
                  marginBottom: '20px',
                  borderLeft: '4px solid var(--primary-light)'
                }}>
                  &quot;{post.content}&quot;
                </div>

                {/* Like Button Under Content */}
                <div style={{marginBottom: '20px'}}>
                  <button 
                    onClick={() => handleLike(post.id)}
                    style={{
                      background: 'var(--bg-light)', 
                      border: 'none', 
                      padding: '8px 16px', 
                      borderRadius: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 'bold',
                      color: 'var(--accent)'
                    }}
                  >
                    ❤️ {post.likes} Likes
                  </button>
                </div>

                {/* COMMENTS SECTION */}
                <div style={{borderTop: '1px solid #EEE', paddingTop: '16px'}}>
                  <div style={{fontSize: '14px', fontWeight: 'bold', color: 'var(--text-color)', marginBottom: '12px'}}>
                    💬 Comments ({post.comments.length})
                  </div>
                  {post.comments.length > 0 ? (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                      {post.comments.map((comment) => (
                        <div key={comment.id} style={{background: '#F5F5F5', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div>
                            <strong style={{marginRight: '6px'}}>{comment.author}:</strong>
                            <span>{comment.text}</span>
                          </div>
                          
                          {/* ONLY show comment delete if they are the owner of the comment! */}
                          {comment.ownerId === myUserId && (
                            <button 
                              onClick={() => handleDeleteComment(post.id, comment.id)}
                              style={{background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '16px', padding: '0 4px'}}
                              title="Delete Comment"
                            >
                              ⋮
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{fontSize: '14px', color: 'var(--text-light)'}}>No comments yet. Be the first!</p>
                  )}
                  
                  <div style={{display: 'flex', gap: '10px', marginTop: '16px'}}>
                    <input 
                      type="text" 
                      placeholder={`Comment as ${newAuthor || 'Guest'}...`}
                      style={{flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1px solid #DDD'}}
                      onKeyDown={(e) => {
                        if(e.key === 'Enter'){
                          handleCreateComment(post.id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}