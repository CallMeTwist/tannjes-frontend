import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <SEO title="Page not found" description="The page you requested doesn't exist." noindex />
      <section className="relative isolate overflow-hidden bg-brand-navy py-32 text-white">
        <div className="absolute inset-0 texture-cross-light opacity-80" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(225,29,116,0.30),transparent_60%)]" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="font-display text-7xl font-extrabold text-brand-pink sm:text-8xl">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Page not found</h1>
          <p className="mt-3 text-white/80">The page you're looking for doesn't exist or has been moved.</p>
          <Button asChild className="mt-8 bg-brand-pink hover:bg-brand-pink-deep text-white">
            <Link to="/">Return home</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
