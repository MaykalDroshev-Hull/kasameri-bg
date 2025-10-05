import FooterNav from './FooterNav'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="container foot" style={{ padding: '24px 0' }}>
        <div>
          <strong style={{ color: 'var(--leaf-dark)' }}>КАСАМЕРИ ЕООД</strong>
          <div className="muted">© {year} Всички права запазени.</div>
        </div>
        <FooterNav />
      </div>
    </footer>
  )
}
