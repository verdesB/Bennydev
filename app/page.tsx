import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatButton from './components/ChatButton';

export default function Home() {
  return (
    <>
    <Header pathname={'/'} />
    <main>
      <Hero />
      <Services />
      
      <About />
      <WhyChooseUs />
      <Testimonials />
      <Contact/>
    </main>
    <Footer />
    <ChatButton />
    </>
  );
}
