'use client'

export default function FooterNav() {
  const scrollToSection = (sectionId: string) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
      <a href="#za-nas" onClick={(e) => { e.preventDefault(); scrollToSection('za-nas') }}>За нас</a>
      <a href="#produkt" onClick={(e) => { e.preventDefault(); scrollToSection('produkt') }}>Сокът</a>
      <a href="#proces" onClick={(e) => { e.preventDefault(); scrollToSection('proces') }}>Процес</a>
      <a href="#kontakti" onClick={(e) => { e.preventDefault(); scrollToSection('kontakti') }}>Контакти</a>
    </nav>
  )
}
