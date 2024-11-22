export default function LayoutToggle({ isDoubleColumn, onToggle }) {
  return (
    <button 
      onClick={onToggle}
      className="fixed right-6 bottom-24 bg-light p-3 rounded-full shadow-lg hover:bg-slate/5 transition-colors z-50 lg:bottom-8 lg:right-8 hidden lg:block"
      title={isDoubleColumn ? "Afficher en une colonne" : "Afficher en deux colonnes"}
    >
      {isDoubleColumn ? (
        // Single column icon (3 squares stacked)
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          className="text-primary"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="6" y="3" width="12" height="5" />
          <rect x="6" y="9.5" width="12" height="5" />
          <rect x="6" y="16" width="12" height="5" />
        </svg>
      ) : (
        // Grid icon (4 squares)
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          className="text-primary"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      )}
    </button>
  )
}