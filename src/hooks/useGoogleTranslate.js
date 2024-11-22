import { useState, useEffect, useCallback } from 'react'

export function useGoogleTranslate() {
  const [currentLang, setCurrentLang] = useState('FR')
  const [isChanging, setIsChanging] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    let scriptLoaded = false
    let initAttempts = 0
    const maxAttempts = 3

    const initTranslate = () => {
      if (window.google?.translate?.TranslateElement) {
        try {
          const translateElement = new window.google.translate.TranslateElement(
            {
              pageLanguage: 'fr',
              includedLanguages: 'fr,en',
              autoDisplay: false
            },
            'google_translate_element'
          )
          
          if (translateElement) {
            setIsInitialized(true)
            return true
          }
        } catch (error) {
          console.error('Failed to initialize Google Translate:', error)
        }
      }
      return false
    }

    const tryInit = () => {
      if (initAttempts >= maxAttempts) return
      
      if (!initTranslate()) {
        initAttempts++
        setTimeout(tryInit, 1000)
      }
    }

    const loadScript = () => {
      if (scriptLoaded) return
      
      const script = document.createElement('script')
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      script.defer = true
      
      script.onerror = () => {
        console.error('Failed to load Google Translate script')
        scriptLoaded = false
      }
      
      script.onload = () => {
        scriptLoaded = true
        tryInit()
      }
      
      document.head.appendChild(script)
    }

    window.googleTranslateElementInit = () => {
      tryInit()
    }

    loadScript()

    return () => {
      delete window.googleTranslateElementInit
    }
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isEnglish = document.documentElement.classList.contains('translated-ltr')
      setCurrentLang(isEnglish ? 'EN' : 'FR')
      setIsChanging(false)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const toggleLanguage = useCallback(() => {
    if (isChanging || !isInitialized) return

    const iframe = document.querySelector('.goog-te-menu-frame')
    if (iframe) {
      const selectElement = iframe.contentDocument?.querySelector('.goog-te-combo')
      if (selectElement) {
        setIsChanging(true)
        const newValue = currentLang === 'FR' ? 'en' : ''
        selectElement.value = newValue
        selectElement.dispatchEvent(new Event('change'))
      }
    } else {
      const selectElement = document.querySelector('.goog-te-combo')
      if (selectElement) {
        setIsChanging(true)
        const newValue = currentLang === 'FR' ? 'en' : ''
        selectElement.value = newValue
        selectElement.dispatchEvent(new Event('change'))
      }
    }
  }, [isChanging, currentLang, isInitialized])

  return {
    currentLang,
    isChanging,
    toggleLanguage,
    isInitialized
  }
}