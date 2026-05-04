import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://tannjesclinics.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

type Props = {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
};

const SEO = ({ title, description, image = DEFAULT_IMAGE, noindex = false }: Props) => {
  const { pathname } = useLocation();
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  const fullTitle = title.includes("Tannjes") ? title : `${title} | Tannjes Clinics`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Tannjes Clinics" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
