import { Helmet } from "react-helmet-async";

const SITE = "https://agropath.lovable.app";
const SOCIAL_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/xBFmPR5Pz0UvhlI3i37TVjFycjK2/social-images/social-1775841836747-1000091811.webp";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  noindex?: boolean;
};

const Seo = ({ title, description, path, ogType = "website", noindex = false }: SeoProps) => {
  const url = `${SITE}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AgroPath" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={SOCIAL_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SOCIAL_IMAGE} />
    </Helmet>
  );
};

export default Seo;
