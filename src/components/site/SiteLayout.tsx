import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import MobileBookCTA from "@/components/site/MobileBookCTA";
import EmergencySplash from "@/components/site/EmergencySplash";
import EmergencyFloatingButton from "@/components/site/EmergencyFloatingButton";

type Props = { children: React.ReactNode };

export const SiteLayout = ({ children }: Props) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-pink focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <MobileBookCTA />
      <EmergencyFloatingButton />
      <EmergencySplash />
    </div>
  );
};

export default SiteLayout;
