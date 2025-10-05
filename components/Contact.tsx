'use client'

import { useState } from 'react'

interface FormData {
  name: string
  phone: string
  email: string
  qty: string
  msg: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    qty: '1',
    msg: ''
  })
  const [formStatus, setFormStatus] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Order data:', formData)
    setFormStatus('Благодарим! Ще се свържем с вас по телефона/имейла.')
    setFormData({
      name: '',
      phone: '',
      email: '',
      qty: '1',
      msg: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section id="kontakti">
      <div className="container twocol">
        <div>
          <h2 className="h2">Контакти & Поръчка</h2>
          <p className="muted" style={{ marginTop: '8px' }}>Свържете се с нас за поръчки и въпроси. Ще отговорим бързо.</p>
          <div style={{ marginTop: '16px', display: 'grid', gap: '10px', color: '#1f2937' }}>
            <div>📞 08xx xxx xxx</div>
            <div>✉️ info@kasameri.bg</div>
            <div>📍 с. Александрово, обл. Ловеч</div>
          </div>
        </div>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Име</label>
              <input 
                name="name" 
                placeholder="Вашето име" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <label>Телефон</label>
                <input 
                  name="phone" 
                  placeholder="08xx xxx xxx" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div>
                <label>Имейл</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="you@mail.com" 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>Количество (бр. кутии 3 L)</label>
              <input 
                type="number" 
                name="qty" 
                min="1" 
                value={formData.qty}
                onChange={handleChange}
                required 
              />
            </div>
            <div>
              <label>Съобщение</label>
              <textarea 
                name="msg" 
                placeholder="Въпроси, предпочитан начин на доставка и др." 
                value={formData.msg}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-send">Изпрати запитване</button>
            <p className="muted" style={{ fontSize: '12px', margin: '8px 0 0' }}>
              *Формата е демонстрационна. Свържете се директно по телефон или имейл за поръчка.
            </p>
            {formStatus && (
              <div className="muted" style={{ marginTop: '8px' }}>{formStatus}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

