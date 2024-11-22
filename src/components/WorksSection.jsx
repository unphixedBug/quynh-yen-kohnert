import { Link } from "react-router-dom";
import RightArrow from "./icons/RightArrow";

export default function WorksSection() {
  return (
    <section className="w-full flex flex-col mb-[4.8rem] xl:w-3/4 xl:mx-auto xl:max-w-[1440px]">
      <h2 className="m-auto font-display text-primary text-2xl md:text-[2.3rem] xl:text-[2.5rem] mt-[2.3rem] mb-[1.7rem] xl:mb-[2.3rem]">
        Découvrez mes oeuvres
      </h2>
      <div className="w-full md:w-[698px] m-auto">
        <div className="relative w-fit m-auto">
          <img
            className="h-[277px] md:w-full md:h-[434px] md:object-contain"
            src="../src/assets/img/MyWorksImage.png"
            alt="Save the Whale"
          />
          <div className="w-[90%] h-[57px] rounded-sm absolute bottom-3 left-[5%] flex justify-around bg-dark/40 backdrop-blur-sm items-center md:w-[55%] md:right-[2rem] md:left-auto md:max-w-[300px]">
            <h3 className="font-display max-w-[143px] text-[1.1rem] text-light">
              Titre de l'oeuvre
            </h3>
            <Link
              to="/creations"
              className="bg-primary h-[31px] w-[31px] rounded-sm flex justify-center items-center"
            >
              <RightArrow className="w-4 h-4 fill-light" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
