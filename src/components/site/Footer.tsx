import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 px-6 md:px-10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-background/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">T</span>
              </div>
              <p className="font-display font-semibold text-lg">Tannjes Clinics</p>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              Premium concierge healthcare. Compassionate care delivered to your door, 24/7.
            </p>
            <div className="flex gap-3 pt-2">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" aria-label="social"
                  className="h-9 w-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display font-semibold mb-4">Quick Links</p>
            <ul className="space-y-2 text-background/60 text-sm">
              {["About", "Services", "Specialties", "How it works", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase().replace(/\s/g, "")}`} className="hover:text-primary-glow transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display font-semibold mb-4">Services</p>
            <ul className="space-y-2 text-background/60 text-sm">
              {["Doctor at Home", "Geriatrics Care", "Skilled Nursing", "Palliative Care", "Newborn Care"].map((l) => (
                <li key={l}><a href="#services" className="hover:text-primary-glow transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display font-semibold mb-4">Contact</p>
            <ul className="space-y-2 text-background/60 text-sm">
              <li>Drive 2, 1st Crescent, 3rd Avenue,<br/>House 38, Prince and Princess Estate,<br/>Kaura District, Abuja</li>
              <li className="pt-2">+234 800 000 0000</li>
              <li>care@tannjesclinics.com</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-sm text-background/50">
          <p>© {new Date().getFullYear()} Tannjes Clinics Limited. All rights reserved.</p>
          <p>Crafted with care in Abuja, Nigeria.</p>
        </div>
      </div>

      {/* WhatsApp floating */}
      <a href="https://wa.me/2348000000000" target="_blank" rel="noopener"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-glow hover:scale-110 transition-transform">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1s-.8.9-1 1.1c-.2.2-.4.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1.1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
        </svg>
      </a>
    </footer>
  );
};
