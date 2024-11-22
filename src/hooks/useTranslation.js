import { useLanguage } from '../contexts/LanguageContext'
import fr from '../translations/fr.json'
import en from '../translations/en.json'

const translations = { fr, en }

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) return key
    }
    
    return value
  }

  return { t }
}