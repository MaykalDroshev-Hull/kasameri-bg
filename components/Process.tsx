export default function Process() {
  const steps = [
    {
      number: 1,
      title: 'Подбор',
      description: 'Селектираме добре узрели ябълки (водещ сорт ~80% + ~20% други за баланс).'
    },
    {
      number: 2,
      title: 'Измиване',
      description: 'Многократно измиване и инспекция на плодовете.'
    },
    {
      number: 3,
      title: 'Смилане и пресоване',
      description: 'Извличане на сок с преса – без концентрат.'
    },
    {
      number: 4,
      title: 'Филтрация',
      description: 'Прецеждане за чист вкус (леката мътност е естествена).'
    },
    {
      number: 5,
      title: 'Пастьоризация',
      description: 'Щадяща топлинна обработка за безопасност и трайност.'
    },
    {
      number: 6,
      title: 'Пълнене',
      description: 'Bag‑in‑Box 3 L с кранче – удобно сервиране и съхранение.'
    }
  ]

  return (
    <section id="proces">
      <div className="container">
        <h2 className="h2">Как приготвяме сока</h2>
        <p className="muted" style={{ marginTop: '8px' }}>Прозрачен, естествен процес в 6 стъпки.</p>
        <div className="steps" style={{ marginTop: '20px' }}>
          {steps.map((step) => (
            <div key={step.number} className="card step">
              <div className="num">{step.number}</div>
              <h4>{step.title}</h4>
              <p className="muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


