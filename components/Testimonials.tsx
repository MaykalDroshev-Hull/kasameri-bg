export default function Testimonials() {
  const testimonials = [
    {
      quote: "Сокът стои свеж до месец – децата го обожават!",
      author: "Мария, Ловеч"
    },
    {
      quote: "Перфектен баланс сладко‑кисело.",
      author: "Иван, София"
    },
    {
      quote: "Удобна кутия и страхотен аромат.",
      author: "Ралица, Плевен"
    }
  ]

  return (
    <section>
      <div className="container center">
        <h2 className="h2">Какво казват клиенти</h2>
        <p className="muted">Добавете реални отзиви, когато имате.</p>
        <div className="quotes" style={{ marginTop: '20px' }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
              <blockquote>{testimonial.quote}</blockquote>
              <div className="muted" style={{ marginTop: '8px' }}>— {testimonial.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

