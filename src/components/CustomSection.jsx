import { Link } from "react-router-dom";

export default function CustomSection() {
  return (
    <section className="w-full flex flex-col mb-[4.8rem] md:grid md:grid-cols-2 md:grid-rows-[repeat(2,fit-content)] md:gap-x-[1.9rem] xl:w-3/4 xl:mx-auto xl:max-w-[1440px]">
      <h2 className="m-auto font-display text-primary text-2xl md:text-[2.3rem] xl:text-[2.5rem] mt-[2.3rem] mb-[1.7rem] md:m-0 xl:mb-[2.3rem] md:h-fit md:w-auto md:col-start-2 md:row-start-1">
        Demandes personnalisées
      </h2>
      <img
        src="../src/assets/img/SectionContent.png"
        alt="Portraits"
        className="md:col-start-1 justify-self-end md:w-auto"
      />
      <p className="py-[1.4rem] md:col-start-2 md:row-start-1 md:w-auto md:pt-[5.7rem]">
        Je vous propose de créer ensemble des œuvres personnalisées, que ce soit
        pour une commande unique, une collaboration créative ou tout autre
        projet qui vous tient à cœur. Chaque pièce sera réalisée sur mesure, en
        prenant en compte vos envies et vos idées, pour un résultat qui vous
        ressemble. Si vous avez une vision particulière ou simplement une
        inspiration à explorer, n'hésitez pas à me contacter : je serai ravie de
        discuter avec vous pour concrétiser cette idée artistique.
      </p>
      <Link
        to="/contact"
        className="bg-light hover:bg-primary text-primary hover:text-light border-2 border-primary py-3 rounded-sm text-center md:w-[200px] md:h-fit md:justify-self-end md:col-start-2 md:row-span-2 md:mt-[0.9rem]"
      >
        Contactez-moi
      </Link>
    </section>
  );
}
