
'use client'
import { useState, useEffect } from 'react'

export default function UserPage({ params }) {
  const { username } = params
  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState('ringing')

  useEffect(() => {
    const data = localStorage.getItem(`winklink_${username}`)
    if (data) {
      const parsed = JSON.parse(data)
      setProfile(parsed)
    }
  }, [username])

  if (!profile) return (
    <main style={mainStyle}>
      <p style={{ color: '#888' }}>this winklink doesn&apos;t exist yet.</p>
    </main>
  )

  return (
    <main style={mainStyle}>
      {status === 'ringing' && (
        <>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: '#f0f0f0', overflow: 'hidden',
            marginBottom: '16px', animation: 'pulse 1.5s infinite'
          }}>
            {profile.pfp
              ? <img src={profile.pfp} alt="profile picture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>👤</div>
            }
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0' }}>{profile.name || username}</h2>
          <p style={{ color: '#888', margin: '8px 0 32px' }}>is calling...</p>
          <button onClick={() => setStatus('answered')} style={{
            background: '#22c55e', color: '#fff', border: 'none',
            borderRadius: '50px', padding: '16px 40px',
            fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer',
            animation: 'pulse 1.5s infinite'
          }}>
            answer call
          </button>
        </>
      )}

      {status === 'answered' && (
        <>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: '#f0f0f0', overflow: 'hidden', marginBottom: '16px'
          }}>
            {profile.pfp
              ? <img src={profile.pfp} alt="profile picture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>👤</div>
            }
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0' }}>{profile.name || username}</h2>
          <p style={{ color: '#22c55e', margin: '8px 0 32px' }}>call connected</p>
          <p style={{ color: '#555', textAlign: 'center', maxWidth: '300px' }}>
            (ai chat coming next. for now you&apos;re through.)
          </p>
          <button onClick={() => setStatus('ended')} style={{
            background: '#ef4444', color: '#fff', border: 'none',
            borderRadius: '50px', padding: '16px 40px',
            fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer',
            marginTop: '24px'
          }}>
            end call
          </button>
        </>
      )}

      {status === 'ended' && (
        <p style={{ color: '#888', fontSize: '1.2rem' }}>call ended.</p>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </main>
  )
}

const mainStyle = {
  minHeight: '100vh',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  padding: '20px'
}
