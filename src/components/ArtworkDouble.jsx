export default function ArtworkDouble({ image, title, onClick }) {
  return (
    <figure 
      className="flex flex-col items-center mb-[4.8rem] w-full max-w-[800px] md:h-[434px] px-4 cursor-pointer"
      onClick={onClick}
    >
      <img 
        className="w-full h-full object-contain" 
        src={image} 
        alt={title}
      />
      <figcaption className="mt-2">
        <h2 className="text-[1.1rem] font-display text-center">{title}</h2>
      </figcaption>
    </figure>
  )
}