export default function FAQ() {
  const faqs = [
    {
      question: "Има ли добавена захар/вода?",
      answer: "По подразбиране приемаме \"не\". Моля, потвърдете и ще фиксираме текста."
    },
    {
      question: "Минимално количество за поръчка?",
      answer: "1 кутия (освен ако не посочите друго)."
    },
    {
      question: "Доставка",
      answer: "Куриер/лично вземане – добавете зони, срокове и цена при потвърждение."
    },
    {
      question: "Съхранение",
      answer: "Неотворен: според етикет. Отворен: обичайно 20–30 дни в хладилник."
    }
  ]

  return (
    <section id="faq">
      <div className="container">
        <h2 className="h2">Често задавани въпроси</h2>
        <div style={{ marginTop: '16px', maxWidth: '900px' }}>
          {faqs.map((faq, index) => (
            <details key={index}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
