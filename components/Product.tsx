'use client'

export default function Product() {
  const scrollToSection = (sectionId: string) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="produkt">
      <div className="container">
        <div className="center" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 className="h2">Ябълков сок 3 L – 10 лв</h2>
          <p className="muted" style={{ marginTop: '10px' }}>Един вкус с ~80/20 сортов баланс за постоянен, естествен профил. Удобна Bag‑in‑Box кутия с кранче.</p>
        </div>
        <div className="cards" style={{ marginTop: '20px' }}>
          <div className="card">
            <h3 style={{ margin: '0 0 8px' }}>За кого е подходящ?</h3>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#374151', lineHeight: '1.8' }}>
              <li>Семейни закуски и събирания</li>
              <li>Детски рождени дни</li>
              <li>Кафенета, офиси, магазини</li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ margin: '0 0 8px' }}>Ползи</h3>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#374151', lineHeight: '1.8' }}>
              <li>Практична кутия с кранче – по‑малко окисляване</li>
              <li>Удобно съхранение (виж "Съхранение")</li>
              <li>Постоянен вкус през сезона</li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ margin: '0 0 8px' }}>Съхранение*</h3>
            <p className="muted">Неотворен: съгласно етикет. Отворен: обичайно 20–30 дни в хладилник.</p>
            <p className="muted" style={{ fontSize: '12px' }}>*Моля, потвърдете вашите реални срокове – ще ги актуализираме.</p>
          </div>
        </div>
        <div className="center" style={{ marginTop: '24px' }}>
          <a href="#kontakti" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('kontakti') }}>
            Поръчай сега
          </a>
        </div>
      </div>
    </section>
  )
}
