import RightArrow from "./icons/RightArrow";

export default function Hero() {
  return (
    <header className="flex flex-col-reverse items-center w-full md:max-w-[736px] lg:max-w-none">
      <section className="flex flex-col justify-between text-center h-[calc(100vh-62px)] mb-[4.8rem] md:flex-row md:justify-between md:w-full lg:pl-[103px] xl:justify-around xl:h-screen">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="flex flex-col items-center justify-around">
            <h1 className="gradient font-display mx-auto mt-9 mb-12 text-[3.4rem] md:text-[clamp(1.9rem,calc(1.9rem+((1vw-0.48rem)*9.0625)),4.8rem)] xl:text-[clamp(4.8rem,calc(4.8rem+((1vw-0.48rem)*2.1875)),5.5rem)] xl:mb-0">
              Quynh-yên <br />
              Kohnert
            </h1>
            <span className="md:hidden">
              <a href="#" className="flex mx-auto gap-4 text-[1.1rem]">
                Découvrir mon travail{" "}
                <RightArrow className="w-[23px] h-[22px] fill-dark" />
              </a>
            </span>
            <div className="hidden font-display text-[1.4rem] xl:tex-[2rem] px-3 py-2 border-b-2 border-slate rounded-sm text-slate hvr-sweep-to-top md:flex md:gap-4 md:items-center">
              <a href="#" className="hvr-sweep-to-top">
                Mes oeuvres
              </a>
              <RightArrow className="w-[23px] h-[22px] fill-slate hvr-sweep-to-top" />
            </div>
          </div>
        </div>
        <img
          className="min-h-[335px] min-w-[228px] max-h-[557px] max-w-[412px] h-auto w-auto md:hidden"
          src="../src/assets/img/fox_girl.png"
          alt="Fox Girl"
        />
        <img
          src="../src/assets/img/perroquet.png"
          alt="Perroquet"
          className="hidden md:inline md:max-w-[260px] h-auto my-auto xl:max-w-[400px] xl:h-auto"
        />
      </section>
    </header>
  );
}
