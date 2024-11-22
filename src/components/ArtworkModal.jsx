import { Dialog } from '@headlessui/react'
import { IoClose, IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function ArtworkModal({ artwork, isOpen, onClose, onNavigate }) {
  const descriptionRef = useRef(null)

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return
    
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowLeft':
        onNavigate('prev')
        break
      case 'ArrowRight':
        onNavigate('next')
        break
      default:
        break
    }
  }, [isOpen, onClose, onNavigate])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!artwork) return null

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-dark/80 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-light rounded-[2px] p-6 w-[95vw] h-[95vh] flex flex-col md:flex-row gap-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-dark hover:text-primary transition-colors"
            aria-label="Fermer"
          >
            <IoClose className="w-5 h-5" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={() => onNavigate('prev')}
            className="absolute top-1/2 -translate-y-1/2 left-4 text-dark hover:text-primary transition-colors"
            aria-label="Œuvre précédente"
          >
            <IoArrowBack className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('next')}
            className="absolute top-1/2 -translate-y-1/2 right-4 text-dark hover:text-primary transition-colors"
            aria-label="Œuvre suivante"
          >
            <IoArrowForward className="w-5 h-5" />
          </button>

          {/* Left column - Image */}
          <div className="w-full md:w-2/3 h-full flex items-center justify-center">
            <img 
              src={artwork.image} 
              alt={artwork.title}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-[2px]"
            />
          </div>

          {/* Right column - Content */}
          <div className="w-full md:w-1/3 h-full flex flex-col">
            <Dialog.Title className="text-primary text-2xl md:text-[2rem] lg:text-[2.5rem] font-display mb-6">
              {artwork.title}
            </Dialog.Title>

            <div 
              ref={descriptionRef}
              className="prose prose-slate max-w-none flex-grow overflow-y-auto mb-6"
              style={{ scrollbarGutter: 'stable' }}
              dangerouslySetInnerHTML={{ __html: artwork.description }}
            />

            <Link
              to="/contact"
              className="bg-light hover:bg-primary text-primary hover:text-light border-2 border-primary py-3 rounded-[2px] text-center text-[0.9rem] transition-colors"
            >
              Commander l'œuvre
            </Link>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}