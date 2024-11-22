import { useEffect, useRef, useState } from 'react'

export default function ArtworkSingle({ image, title, onClick, isDoubleColumn }) {
  const figureRef = useRef(null)
  const [isScaled, setIsScaled] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile || isDoubleColumn) {
      setIsScaled(false)
      return
    }

    const handleScroll = () => {
      if (!figureRef.current) return

      const rect = figureRef.current.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const windowCenter = window.innerHeight / 2
      const distanceFromCenter = elementCenter - windowCenter
      
      setIsScaled(Math.abs(distanceFromCenter) < 200)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile, isDoubleColumn])

  return (
    <figure 
      ref={figureRef}
      className="relative mb-12 w-4/5 max-w-[500px] mx-auto cursor-pointer md:w-auto md:h-[434px]"
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <img 
          className={`
            w-full 
            h-full 
            object-contain 
            transition-all 
            duration-500 
            ease-out
            origin-bottom-right
            ${isScaled && !isDoubleColumn ? 'md:scale-[1.25]' : ''}
          `}
          src={image} 
          alt={title}
        />
        <figcaption className="absolute -right-6 bottom-0 transform -rotate-90 origin-bottom-right">
          <h2 className="text-[1.1rem] font-display whitespace-nowrap">{title}</h2>
        </figcaption>
      </div>
    </figure>
  )
}