import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import WorksSection from '../components/WorksSection'
import CustomSection from '../components/CustomSection'
import InstagramSection from '../components/InstagramSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="-mt-[84px] md:-mt-[84px] lg:mt-0">
      <Hero />
      <AboutSection />
      <WorksSection />
      <CustomSection />
      <InstagramSection />
      <Footer />
    </div>
  )
}