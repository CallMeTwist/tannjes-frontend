import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CareNavbar from "@/components/care/CareNavbar";
import CareFooter from "@/components/care/CareFooter";
import CareCoordinatorButton from "@/components/care/CareCoordinatorButton";

type Props = { children: React.ReactNode };

// Layout for the Home & Hospice Care side. Deliberately leaves out the hospital's
// emergency splash and pulsing emergency button, to keep the tone calm.
export const CareLayout = ({ children }: Props) => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Honour in-page links such as /getting-care#refer; otherwise start at the top.
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return (
    <div className="theme-care min-h-screen overflow-x-clip bg-care-cream text-care-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-care-primary focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <CareNavbar />
      <main id="main">{children}</main>
      <CareFooter />
      <CareCoordinatorButton />
    </div>
  );
};

export default CareLayout;
