import { useQuery } from 'react-query'
import { FiFilter } from 'react-icons/fi'
import { getCategories } from '../services/wordpress'

export default function CategoryFilters({ selectedCategory, onCategoryChange, isOpen, onToggle }) {
  const { data: categories, isLoading } = useQuery('categories', getCategories)

  if (isLoading || !categories?.length) return null

  const FilterList = () => (
    <div className="space-y-2">
      <button
        className={`block w-full text-left px-3 py-2 border-b border-dark/10 transition-colors ${
          !selectedCategory ? 'text-primary border-primary' : 'hover:text-primary hover:border-primary'
        }`}
        onClick={() => onCategoryChange(null)}
      >
        Toutes
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          className={`block w-full text-left px-3 py-2 border-b border-dark/10 transition-colors ${
            selectedCategory === category.id ? 'text-primary border-primary' : 'hover:text-primary hover:border-primary'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )

  return (
    <>
      {/* Bouton mobile */}
      <button
        onClick={onToggle}
        className="md:hidden fixed right-6 bottom-24 bg-light p-3 rounded-full shadow-lg hover:bg-slate/5 transition-colors z-50"
      >
        <FiFilter className="w-6 h-6 text-primary" />
      </button>

      {/* Modal mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-light z-40 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-primary">Filtres</h3>
            <button onClick={onToggle} className="text-dark">
              Fermer
            </button>
          </div>
          <FilterList />
        </div>
      )}

      {/* Version desktop/tablette */}
      <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 p-4 z-40">
        <FilterList />
      </div>
    </>
  )
}