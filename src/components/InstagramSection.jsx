export default function InstagramSection() {
  return (
    <section className="w-full flex flex-col mb-[4.8rem] items-center xl:w-3/4 xl:mx-auto xl:max-w-[1440px]">
      <h2 className="m-auto font-display text-primary text-2xl md:text-[2.3rem] xl:text-[2.5rem] mt-[2.3rem] mb-[1.7rem] xl:mb-[2.3rem]">
        Me suivre sur insta
      </h2>
      <div className="flex flex-col md:flex-row gap-[1.8rem] md:justify-between">
        {[1, 2].map((index) => (
          <div key={index} className="flex flex-col w-[272px] h-[370px] shadow-[0px_4px_27.21px_0px_rgba(0,0,0,0.09)]">
            <div className="flex w-full h-[40px] items-center justify-between px-3">
              <div className="flex gap-2">
                <img src="/img/yen_insta_pfp.png" alt="Profile" />
                <p>yenkohnert</p>
              </div>
              <img src="/img/bulles svg.png" alt="Menu" />
            </div>
            <img src="/img/save_the_whale.jpg" alt="Post" />
            <div className="flex justify-between mx-3 h-[40px] items-center">
              <div className="flex gap-2">
                <img className="w-[20px] h-[18px]" src="/img/coeur_vector.png" alt="Like" />
                <img className="w-[20px] h-[18px]" src="/img/comment_vector.png" alt="Comment" />
                <img className="w-[20px] h-[18px]" src="/img/send_vector.png" alt="Share" />
              </div>
              <img className="w-[16px] h-[18px]" src="/img/fav_vector.png" alt="Save" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}