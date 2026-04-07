"use client";
import { useState } from "react";
import darshansData from "../../data/darshans.json";

function DarshanPost({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  return (
    <div className="card" style={{padding: '0', overflow: 'hidden', maxWidth: '600px', margin: '0 auto 40px auto'}}>
      {/* Header */}
      <div style={{padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
        <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>
          {post.uploader_name.charAt(0)}
        </div>
        <div style={{fontWeight: 'bold', fontSize: '18px'}}>{post.uploader_name}</div>
      </div>
      
      {/* Image */}
      <img src={post.image_url} alt="Darshan" style={{width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover'}} />
      
      {/* Footer */}
      <div style={{padding: '20px'}}>
        <button 
          onClick={handleLike}
          style={{
            background: liked ? 'var(--primary)' : 'transparent',
            color: liked ? 'white' : 'var(--text-color)',
            border: `2px solid ${liked ? 'var(--primary)' : 'var(--text-light)'}`,
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {liked ? '❤️ Liked' : '🤍 Like'} 
          <span style={{opacity: 0.8}}>({likes})</span>
        </button>

        <p style={{marginTop: '15px', lineHeight: '1.6', color: 'var(--text-color)'}}>
          <strong style={{marginRight: '8px'}}>{post.uploader_name}</strong> 
          {post.story}
        </p>
      </div>
    </div>
  );
}

export default function DarshanFeed() {
  return (
    <div style={{padding: '40px 0'}}>
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <h1 style={{color: 'var(--primary)', fontSize: '36px', marginBottom: '10px'}}>Daily God Darshan</h1>
        <p style={{color: 'var(--text-light)', fontSize: '18px', maxWidth: '600px', margin: '0 auto'}}>
          A community feed of divine Shringar Darshans. 
          <br/>
          <em>(Public uploading will be enabled once our cloud servers scale up!)</em>
        </p>
      </div>

      <div>
        {darshansData.map(post => (
          <DarshanPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
