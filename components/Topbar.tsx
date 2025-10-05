'use client'

import { useState } from 'react'

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="topbar">
      <div className="container nav">
        <a href="#hero" className="brand" onClick={(e) => { e.preventDefault(); scrollToSection('hero') }}>
          🍎 КАСАМЕРИ ЕООД
        </a>
        <nav className={`navlinks ${isMenuOpen ? 'open' : ''}`}>
          <a href="#za-nas" onClick={(e) => { e.preventDefault(); scrollToSection('za-nas') }}>За нас</a>
          <a href="#produkt" onClick={(e) => { e.preventDefault(); scrollToSection('produkt') }}>Сокът</a>
          <a href="#proces" onClick={(e) => { e.preventDefault(); scrollToSection('proces') }}>Процес</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq') }}>ЧЗВ</a>
          <a href="#kontakti" onClick={(e) => { e.preventDefault(); scrollToSection('kontakti') }}>Контакти</a>
        </nav>
        <a href="#kontakti" className="cta" onClick={(e) => { e.preventDefault(); scrollToSection('kontakti') }}>
          🛒 Поръчай
        </a>
      </div>
    </div>
  )
}
