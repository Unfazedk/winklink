'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Setup() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [pfp, setPfp] = useState(null)
  const [preview, setPreview] = useState(null)

  const handlePfp = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPfp(reader.result)
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleCreate = () => {
    if (!username || !bio) return
    const profile = { name, username, bio, pfp }
    localStorage.setItem(`winklink_${username}`, JSON.stringify(profile))
    router.push(`/${username}`)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: '20px',
      gap: '16px'
    }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0 }}>set up your winklink</h2>
      <p style={{ color: '#888', margin: 0 }}>your ai will answer for you</p>

      <label style={{ cursor: 'pointer', marginTop: '8px' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: '#f0f0f0', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem'
        }}>
          {preview ? <img src={preview} alt="profile picture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📷'}
        </div>
        <input type="file" accept="image/*" onChange={handlePfp} style={{ display: 'none' }} />
      </label>

      <input
        placeholder="your name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="username (your link will be /username)"
        value={username}
        onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
        style={inputStyle}
      />
      <textarea
        placeholder="describe your ai's vibe... funny? mysterious? chaotic? tell it who you are."
        value={bio}
        onChange={e => setBio(e.target.value)}
        rows={4}
        style={{ ...inputStyle, resize: 'none' }}
      />

      <button onClick={handleCreate} style={{
        background: '#000', color: '#fff', border: 'none',
        borderRadius: '50px', padding: '14px 32px',
        fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
        width: '100%', maxWidth: '360px'
      }}>
        create my winklink →
      </button>
    </main>
  )
}

const inputStyle = {
  width: '100%',
  maxWidth: '360px',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1.5px solid #e0e0e0',
  fontSize: '1rem',
  outline: 'none',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
}