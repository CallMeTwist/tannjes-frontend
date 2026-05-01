import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Specialties } from "@/components/site/Specialties";
import { WhyChoose } from "@/components/site/WhyChoose";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Testimonials } from "@/components/site/Testimonials";
import { CallToAction } from "@/components/site/CallToAction";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Specialties />
      <WhyChoose />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
