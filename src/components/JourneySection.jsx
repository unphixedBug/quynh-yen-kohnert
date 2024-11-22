export default function JourneySection() {
  return (
    <section className="mb-[4.8rem] md:flex md:flex-col md:items-center xl:flex-row xl:items-start">
      <figure className="md:w-[100%] md:max-w-[550px] xl:w-[50%]">
        <img 
          className="justify-self-center md:w-[100%] object-cover xl:max-w-full h-auto" 
          src="/img/yen.png" 
          alt="Quynh-yên Kohnert"
        />
      </figure>
      <div className="md:max-w-[60%] md:flex md:flex-col items-center justify-center xl:items-start">
        <h2 className="text-[2rem] border-primary border-[1px] rounded-sm text-center mt-[2.3rem] mb-[1.7rem] text-primary font-display md:pl-[1.9rem] md:pr-[1.9rem] md:text-[2rem] md:mb-[1.7rem] xl:mb-[2.3rem] xl:text-[2.5rem] md:w-fit md:mt-0">
          Mon Parcours
        </h2>
        <p className="text-[0.9rem] md:text-[1.1rem] py-[1.4rem] max-w-xl justify-self-center">
          Je suis une artiste passionnée par l'art sous toutes ses formes. Mon parcours artistique 
          est le reflet de mes expériences, de mes inspirations et de ma volonté constante 
          d'explorer de nouveaux horizons créatifs. Chaque œuvre que je crée est une expression 
          unique de ma vision artistique et de mon engagement envers l'excellence.
        </p>
      </div>
    </section>
  )
}