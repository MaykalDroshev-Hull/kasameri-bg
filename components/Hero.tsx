'use client'

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header id="hero" className="hero">
      <div className="container hero-inner grid">
        <div>
          <h1 className="h1">Натурален ябълков сок от Александрово</h1>
          <p className="lead">Семейно производство от 12+ години. Един вкус – ~80% сорт / ~20% други. Сладко-кисел, предимно сладък.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#produkt" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('produkt') }}>
              Виж продукта
            </a>
            <a href="#proces" className="btn btn-outline" onClick={(e) => { e.preventDefault(); scrollToSection('proces') }}>
              Как го правим
            </a>
          </div>
          <div className="kpis">
            <div className="kpi">
              <div className="icon">⏱️</div>
              <div>
                <small>Години опит</small>
                <strong>12–15</strong>
              </div>
            </div>
            <div className="kpi">
              <div className="icon">📍</div>
              <div>
                <small>Локация</small>
                <strong>с. Александрово, Ловеч</strong>
              </div>
            </div>
            <div className="kpi">
              <div className="icon">🧃</div>
              <div>
                <small>Разфасовка</small>
                <strong>3 L (Bag‑in‑Box)</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="hero-img">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px' }}>🍏</div>
              <p className="muted" style={{ marginTop: '8px' }}>Добавете реални снимки от градината/кутията.</p>
            </div>
          </div>
          <div className="badges">
            <div>🛡️ Пастьоризиран</div>
            <div>🌿 Без концентрат</div>
            <div>💸 10 лв / 3 L</div>
            <div>⭐ Постоянен вкус</div>
          </div>
        </div>
      </div>
    </header>
  )
}
