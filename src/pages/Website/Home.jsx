import Hero from '../../components/Hero';
import Benefits from '../../components/BenefitsOfCupping';
import Services from '../../components/Services'; 
import Gallery from '../../components/Gallery';
import About from '../../components/About';
import ContactUs from '../../components/ContactUs';
export default function Home() {
  return (
    <div>
      <Hero />
      <Benefits />
      <Services />
      <Gallery />
      <About />
      <ContactUs />
    </div>
  );
}