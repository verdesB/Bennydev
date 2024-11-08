import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      
      <About />
      <WhyChooseUs />
      <Testimonials />
      <Contact/>
    </main>
  );
}
