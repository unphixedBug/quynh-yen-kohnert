import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="flex flex-col mb-[4.8rem] md:grid md:grid-cols-2 md:grid-rows-[repeat(2,fit-content)] md:gap-x-[1.9rem] lg:pl-[103px] xl:w-3/4 xl:mx-auto xl:max-w-[1440px]">
      <h2 className="m-auto font-display text-primary text-2xl md:text-[2.2rem] xl:text-[2.5rem] mt-[2.3rem] mb-[1.7rem] xl:mb-[2.3rem] md:col-start-2 md:row-start-1 md:m-0 md:h-fit md:w-auto">
        A Propos de moi
      </h2>
      <img
        src="../src/assets/img/qykBureau.png"
        alt="À propos"
        className="md:col-start-1 md:col md:w-auto md:h-auto"
      />
      <p className="py-[1.4rem] md:col-start-2 md:row-start-1 md:w-auto md:pt-[3.7rem]">
        Je suis une artiste vietnamienne installée en Belgique, passionnée par
        l'illustration et la peinture. À travers des couleurs vibrantes et des
        détails minutieux, j'aime explorer des thèmes qui me tiennent à cœur
        comme la culture, la nature et les émotions humaines. Mon inspiration
        vient autant de mes racines traditionnelles que de l'art moderne, et
        chaque œuvre est pour moi une façon de raconter une histoire qui résonne
        avec ceux qui la découvrent.
      </p>
      <Link
        to="/about"
        className="bg-light hover:bg-primary text-primary hover:text-light border-2 border-primary py-3 rounded-sm text-center md:col-start-2 md:row-span-2 md:w-[200px] md:h-fit md:justify-self-end md:mt-[0.9rem]"
      >
        En savoir plus
      </Link>
    </section>
  );
}
