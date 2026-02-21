export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0' }}>winklink 👋</h1>
      <p style={{ fontSize: '1.1rem', color: '#555', marginTop: '12px', textAlign: 'center' }}>
        leave your link. let your ai pick up.
      </p>
      <button
        onClick={() => window.location.href = '/setup'}
        style={{
          marginTop: '32px',
          background: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 32px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
        get your link →
      </button>
    </main>
  )
}
