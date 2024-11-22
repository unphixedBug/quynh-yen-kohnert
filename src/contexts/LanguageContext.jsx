import { createContext, useContext, useState, useCallback } from 'react'

const LanguageContext = createContext()

const STORAGE_KEY = 'preferred_language'

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'fr') return stored
    
    const browserLang = navigator.language.split('-')[0]
    return browserLang === 'fr' ? 'fr' : 'en'
  })

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'fr' ? 'en' : 'fr'
    setLanguage(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}