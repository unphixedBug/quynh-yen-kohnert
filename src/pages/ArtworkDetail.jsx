import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { IoArrowBack, IoArrowForward, IoClose } from 'react-icons/io5'
import { getProduct, getProducts } from '../services/wordpress'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useSwipeable } from 'react-swipeable'

export default function ArtworkDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const contentRef = useRef(null)
  const [isScrollLocked, setIsScrollLocked] = useState(false)

  const { data: artwork, isLoading } = useQuery(['product', id], () => getProduct(id))
  const { data: allArtworks } = useQuery('products', () => getProducts())

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setIsScrollLocked(false)
      document.body.style.overflow = 'auto'
      return
    }

    const handleScroll = () => {
      if (!contentRef.current) return

      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const contentHeight = contentRef.current.offsetHeight
      const maxScroll = contentHeight + (windowHeight * 0.85) - windowHeight - 62

      const progress = Math.min(scrolled / maxScroll, 1)
      setScrollProgress(progress)

      if (progress >= 1 && !isScrollLocked) {
        setIsScrollLocked(true)
        document.body.style.overflow = 'hidden'
      } else if (progress < 1 && isScrollLocked) {
        setIsScrollLocked(false)
        document.body.style.overflow = 'auto'
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = 'auto'
    }
  }, [isMobile, isScrollLocked])

  const navigateToArtwork = (direction) => {
    if (!allArtworks?.length) return

    const currentIndex = allArtworks.findIndex(a => a.id === Number(id))
    if (currentIndex === -1) return

    let nextIndex
    if (direction === 'next') {
      nextIndex = currentIndex === allArtworks.length - 1 ? 0 : currentIndex + 1
    } else {
      nextIndex = currentIndex === 0 ? allArtworks.length - 1 : currentIndex - 1
    }

    setIsScrollLocked(false)
    document.body.style.overflow = 'auto'
    window.scrollTo(0, 0)
    
    navigate(`/creations/${allArtworks[nextIndex].id}`)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => navigateToArtwork('next'),
    onSwipedRight: () => navigateToArtwork('prev'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  if (isLoading) {
    return (
      <div className="animate-pulse p-4 space-y-4">
        <div className="h-8 w-3/4 bg-slate/10 rounded-sm"></div>
        <div className="h-64 bg-slate/10 rounded-sm"></div>
        <div className="h-32 bg-slate/10 rounded-sm"></div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="min-h-[200vh]" {...handlers}>
        <div 
          className="h-screen w-full bg-cover bg-center fixed inset-0"
          style={{ backgroundImage: `url(${artwork.image})` }}
        />

        <button
          onClick={() => {
            setIsScrollLocked(false)
            document.body.style.overflow = 'auto'
            navigate('/creations')
          }}
          className="fixed top-6 right-6 z-30 w-10 h-10 bg-light/80 rounded-full flex items-center justify-center hover:bg-light/90 transition-colors"
        >
          <IoClose className="w-6 h-6 text-dark" />
        </button>

        <div className="fixed top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-20">
          <button 
            onClick={() => navigateToArtwork('prev')}
            className="w-12 h-12 bg-light/80 rounded-full flex items-center justify-center hover:bg-light/90 transition-colors"
            aria-label="Œuvre précédente"
          >
            <IoArrowBack className="w-6 h-6 text-dark" />
          </button>
          <button 
            onClick={() => navigateToArtwork('next')}
            className="w-12 h-12 bg-light/80 rounded-full flex items-center justify-center hover:bg-light/90 transition-colors"
            aria-label="Œuvre suivante"
          >
            <IoArrowForward className="w-6 h-6 text-dark" />
          </button>
        </div>

        <div 
          ref={contentRef}
          className="relative min-h-screen mt-[85vh] bg-dark text-light"
          style={{
            clipPath: `inset(0 0 ${Math.max(0, 15 - scrollProgress * 15)}vh 0)`,
            transition: 'clip-path 0.1s ease-out'
          }}
        >
          <div className="container mx-auto px-6 pt-24 pb-32">
            <h2 className="font-display text-[2rem] mb-8 tracking-wide">
              {artwork.title}
            </h2>
            <div 
              className="prose prose-invert prose-sm max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: artwork.description }}
            />
            <Link
              to="/contact"
              className="block w-full bg-primary text-light py-4 rounded-sm text-center font-medium hover:bg-primary/90 transition-colors"
            >
              Mes Œuvres à l'achat
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate('/creations')}
        className="flex items-center gap-2 text-dark hover:text-primary transition-colors mb-6"
      >
        <IoArrowBack className="w-5 h-5" />
        Retour
      </button>

      <div className="lg:flex lg:gap-8">
        <div className="lg:w-2/3">
          <img 
            src={artwork.image} 
            alt={artwork.title}
            className="w-full h-auto rounded-sm"
          />
        </div>
        <div className="lg:w-1/3">
          <h1 className="text-2xl font-display text-primary mb-6">{artwork.title}</h1>
          <div 
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: artwork.description }}
          />
          <Link
            to="/contact"
            className="inline-block mt-8 px-8 py-2 bg-light border-2 border-primary text-primary rounded-sm hover:bg-primary hover:text-light transition-colors"
          >
            Commander
          </Link>
        </div>
      </div>
    </div>
  )
}