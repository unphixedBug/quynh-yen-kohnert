import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import PageTitle from '../components/PageTitle'
import ArtworkSingle from '../components/ArtworkSingle'
import ArtworkDouble from '../components/ArtworkDouble'
import ArtworkModal from '../components/ArtworkModal'
import LayoutToggle from '../components/LayoutToggle'
import CategoryFilters from '../components/CategoryFilters'
import Footer from '../components/Footer'
import { getProducts } from '../services/wordpress'

export default function Creations() {
  const [isDoubleColumn, setIsDoubleColumn] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const navigate = useNavigate()
  const isMobile = window.innerWidth < 768

  const { data: artworks, isLoading, error } = useQuery(
    ['products', selectedCategory],
    () => getProducts(selectedCategory)
  )

  const handleArtworkClick = (artwork) => {
    if (isMobile) {
      navigate(`/creations/${artwork.id}`)
    } else {
      setSelectedArtwork(artwork)
    }
  }

  const handleModalNavigation = (direction) => {
    if (!artworks?.length || !selectedArtwork) return

    const currentIndex = artworks.findIndex(a => a.id === selectedArtwork.id)
    if (currentIndex === -1) return

    let nextIndex
    if (direction === 'next') {
      nextIndex = currentIndex === artworks.length - 1 ? 0 : currentIndex + 1
    } else {
      nextIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1
    }

    setSelectedArtwork(artworks[nextIndex])
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:pr-[200px]">
        <PageTitle>Créations</PageTitle>
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-full h-64 bg-slate/10 rounded-sm"></div>
          ))}
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 lg:pr-[200px]">
        <PageTitle>Créations</PageTitle>
        <div className="text-primary bg-primary/5 p-4 rounded-sm">
          Une erreur est survenue lors du chargement des œuvres.
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 lg:pr-[200px]">
      <PageTitle>Créations</PageTitle>
      
      <LayoutToggle 
        isDoubleColumn={isDoubleColumn} 
        onToggle={() => setIsDoubleColumn(!isDoubleColumn)} 
      />

      <CategoryFilters 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      <div className={`grid gap-8 ${
        isDoubleColumn ? 'lg:grid-cols-2' : 'grid-cols-1'
      } md:grid-cols-2 lg:grid-cols-1`}>
        {artworks?.map(artwork => (
          <div key={artwork.id} className="w-full">
            {isDoubleColumn ? (
              <ArtworkDouble {...artwork} onClick={() => handleArtworkClick(artwork)} />
            ) : (
              <ArtworkSingle {...artwork} onClick={() => handleArtworkClick(artwork)} isDoubleColumn={isDoubleColumn} />
            )}
          </div>
        ))}
      </div>

      <ArtworkModal 
        artwork={selectedArtwork}
        isOpen={!!selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onNavigate={handleModalNavigation}
      />

      <Footer />
    </div>
  )
}