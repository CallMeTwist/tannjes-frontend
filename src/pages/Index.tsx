import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import StatsStrip from "@/components/site/StatsStrip";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import Departments from "@/components/site/Departments";
import AppointmentStrip from "@/components/site/AppointmentStrip";
import WhyChoose from "@/components/site/WhyChoose";
import HowItWorks from "@/components/site/HowItWorks";
import Testimonials from "@/components/site/Testimonials";
import TeamPreview from "@/components/site/TeamPreview";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

const Index = () => (
  <main className="min-h-screen bg-white overflow-x-hidden">
    <Navbar />
    <Hero />
    <StatsStrip />
    <About />
    <Services />
    <Departments />
    <AppointmentStrip />
    <WhyChoose />
    <HowItWorks />
    <Testimonials />
    <TeamPreview />
    <Contact />
    <Footer />
  </main>
);

export default Index;
