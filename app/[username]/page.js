'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function UserPage({ params }) {
  const { username } = params
  const [profile, setProfile] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [status, setStatus] = useState('ringing')

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .maybeSingle()
      console.log('username:', username)
      console.log('data:', data)
      console.log('error:', error)
      setProfile(data)
      setLoaded(true)
    }
    fetchProfile()
  }, [username])

  if (!loaded) return null

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
            background: '#222', overflow: 'hidden',
            marginBottom: '16px', animation: 'pulse 1.5s infinite',
            border: '2px solid #333'
          }}>
            {profile.pfp
              ? <img src={profile.pfp} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>👤</div>
            }
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0', color: '#fff' }}>{profile.name || username}</h2>
          <p style={{ color: '#888', margin: '8px 0 32px' }}>is calling...</p>
          <button onClick={() => setStatus('answered')} style={{
            background: '#22c55e', color: '#fff', border: 'none',
            borderRadius: '50px', padding: '16px 40px',
            fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer'
          }}>
            answer call
          </button>
        </>
      )}

      {status === 'answered' && (
        <>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: '#222', overflow: 'hidden', marginBottom: '16px'
          }}>
            {profile.pfp
              ? <img src={profile.pfp} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>👤</div>
            }
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0', color: '#fff' }}>{profile.name || username}</h2>
          <p style={{ color: '#22c55e', margin: '8px 0 32px' }}>call connected</p>
          <p style={{ color: '#555', textAlign: 'center', maxWidth: '300px' }}>
            (ai voice coming next)
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
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>
    </main>
  )
}

const mainStyle = {
  minHeight: '100vh',
  background: '#0a0a0a',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  padding: '20px'
}