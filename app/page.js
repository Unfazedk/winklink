import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '2.8rem',
        fontWeight: '900',
        margin: '0',
        color: '#ffffff'
      }}>
        winklink 👋
      </h1>
      <p style={{
        fontSize: '1.1rem',
        color: '#888',
        marginTop: '12px',
        textAlign: 'center'
      }}>
        leave your link. let your ai pick up.
      </p>
      <button
        onClick={() => router.push('/setup')}
        style={{
          marginTop: '32px',
          background: '#ffffff',
          color: '#000000',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 32px',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: 'pointer'
        }}>
        get your link →
      </button>
    </main>
  )
}
