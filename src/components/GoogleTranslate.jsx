import { useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function GoogleTranslate() {
  const { language } = useLanguage()

  useEffect(() => {
    // Supprimer l'ancien élément s'il existe
    const existingElement = document.getElementById('google_translate_element')
    if (existingElement) {
      existingElement.remove()
    }

    // Créer le nouvel élément
    const div = document.createElement('div')
    div.id = 'google_translate_element'
    div.style.display = 'none' // Cacher l'élément par défaut
    document.body.appendChild(div)

    // Initialiser Google Translate
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement({
        pageLanguage: 'fr',
        includedLanguages: 'fr,en',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element')
    }

    // Fonction pour traduire la page
    const translatePage = () => {
      const selectElement = document.querySelector('.goog-te-combo')
      if (selectElement) {
        selectElement.value = language === 'fr' ? '' : 'en'
        selectElement.dispatchEvent(new Event('change'))
      }
    }

    // Observer les changements de langue
    const observer = new MutationObserver(() => {
      translatePage()
    })

    const config = { childList: true, subtree: true }
    observer.observe(document.body, config)

    return () => {
      observer.disconnect()
    }
  }, [language])

  return null
}