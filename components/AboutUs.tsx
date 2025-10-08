export default function AboutUs() {
  return (
    <section id="za-nas">
      <div className="container twocol">
        <div>
          <h2 className="h2">За нас</h2>
          <p className="muted" style={{ marginTop: '12px', lineHeight: '1.7' }}>
            Ние сме <strong>КАСАМЕРИ ЕООД</strong> – семеен бизнес от с. Александрово, област Ловеч. Вече над десетилетие
            отглеждаме ябълки и сезонни култури с грижа към земята и уважение към труда. Най-много се гордеем с нашия
            ябълков сок – чист, ароматен и направен така, както го пием у дома.
          </p>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', marginTop: '18px' }}>
            <div className="card">
              <strong>Основни култури</strong>
              <p className="muted" style={{ margin: '8px 0 0' }}>ябълки, череши, круши, дюли, пъпеши, дини, домати, картофи</p>
            </div>
            <div className="card">
              <strong>Произход</strong>
              <p className="muted" style={{ margin: '8px 0 0' }}>с. Александрово, Ловеч</p>
            </div>
          </div>
        </div>
        <aside className="card">
          <div className="pill">✅ Семейно производство</div>
          <div className="pill" style={{ marginTop: '10px' }}>🧃 Сок от пресовани ябълки</div>
          <div className="pill" style={{ marginTop: '10px' }}>ℹ️ Един вкус ~80%/20% – сладко‑кисел, предимно сладък</div>
          <div className="pill" style={{ marginTop: '10px' }}>⏱️ 12–15 години опит</div>
        </aside>
      </div>
    </section>
  )
}


