export default function PageTitle({ children, className = "text-primary" }) {
  return (
    <h1 className={`text-[2rem] text-center mb-[2.3rem] font-display md:text-[3.3rem] md:mb-[12.3rem] xl:mb-[5.8rem] ${className}`}>
      {children}
    </h1>
  )
}