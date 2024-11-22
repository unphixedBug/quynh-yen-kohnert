import { useState, useEffect } from 'react'

export default function StorySection({ story }) {
  const [currentLanguage, setCurrentLanguage] = useState('fr')
  const isImageLeft = story.imagePosition === 'image à gauche'

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isEnglish = document.documentElement.classList.contains('translated-ltr')
      setCurrentLanguage(isEnglish ? 'en' : 'fr')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="mb-[4.8rem] md:flex md:flex-col md:items-center xl:flex-row xl:items-start xl:justify-between">
      <div className={`flex flex-col ${isImageLeft ? 'xl:flex-row' : 'xl:flex-row-reverse'} w-full gap-8 xl:items-start`}>
        <figure className="md:w-[100%] md:max-w-[550px] xl:w-[50%]">
          <img 
            className="w-full h-auto object-cover" 
            src={story.image} 
            alt={story.title[currentLanguage]}
          />
        </figure>
        <div className="md:max-w-[60%] md:flex md:flex-col xl:w-[45%] xl:pt-0">
          <h2 className="text-[2rem] text-dark text-center mt-[2.3rem] mb-[1.7rem] font-display md:text-[2rem] md:mb-[1.7rem] xl:mb-[2.3rem] xl:text-[2.5rem] md:w-fit md:mt-0 xl:text-left">
            {story.title[currentLanguage]}
          </h2>
          <p className="text-[0.9rem] md:text-[1.1rem] py-[1.4rem] max-w-xl xl:py-0">
            {story.description[currentLanguage]}
          </p>
        </div>
      </div>
    </section>
  )
}