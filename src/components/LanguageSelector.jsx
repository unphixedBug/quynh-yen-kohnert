import { useGoogleTranslate } from '../hooks/useGoogleTranslate'

export default function LanguageSelector() {
  const { currentLang, isChanging, toggleLanguage, isInitialized } = useGoogleTranslate()

  return (
    <>
      <div id="google_translate_element" />
      <button
        onClick={toggleLanguage}
        disabled={isChanging || !isInitialized}
        className={`
          relative
          text-[1.3rem]
          font-display
          font-bold
          transition-colors
          duration-300
          ${(isChanging || !isInitialized) ? 'opacity-50 cursor-wait' : 'hover:text-primary cursor-pointer'}
        `}
        aria-label={`Changer la langue en ${currentLang === 'FR' ? 'anglais' : 'français'}`}
      >
        <span className="relative">
          {currentLang}
          {(isChanging || !isInitialized) && (
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-4">
              <div className="w-full h-full border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </span>
      </button>
    </>
  )
}