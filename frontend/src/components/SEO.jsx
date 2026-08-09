import { Helmet } from "react-helmet-async";
import { SITE_CONFIG, SOCIAL_META, generatePageSchema, PAGE_SEO } from "../lib/seo";

/**
 * SEO Component - Handles all meta tags, OpenGraph, Twitter Cards, and JSON-LD schemas
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string[]} props.keywords - Array of keywords
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.pageType - Type of page for schema generation
 * @param {Object} props.dynamicData - Dynamic data for schemas
 * @param {string} props.ogImage - OpenGraph image URL
 * @param {string} props.ogType - OpenGraph type (website, article, profile)
 * @param {boolean} props.noindex - Whether to noindex the page
 * @param {Object[]} props.breadcrumbs - Breadcrumb items
 * @param {Object[]} props.additionalSchemas - Additional JSON-LD schemas
 */
export function SEO({
  title,
  description,
  keywords = [],
  canonical,
  pageType = "home",
  dynamicData = {},
  ogImage,
  ogType = "website",
  noindex = false,
  breadcrumbs = [],
  additionalSchemas = [],
}) {
  const fullTitle = title || PAGE_SEO.home.title;
  const fullDescription = description || PAGE_SEO.home.description;
  const fullCanonical = canonical || SITE_CONFIG.url;
  const fullOgImage = ogImage || SITE_CONFIG.ogImage;
  const allKeywords = [...new Set([...keywords, ...PAGE_SEO.home.keywords])];

  // Generate schemas for this page
  const schemas = [
    ...generatePageSchema(pageType, dynamicData),
    ...additionalSchemas,
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta name="author" content={SITE_CONFIG.founder.name} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <link rel="canonical" href={fullCanonical} />

      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="language" content="English" />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={SOCIAL_META.og.siteName} />
      <meta property="og:locale" content={SOCIAL_META.og.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={SOCIAL_META.twitter.card} />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content={SOCIAL_META.twitter.site} />
      <meta name="twitter:creator" content={SOCIAL_META.twitter.creator} />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#7c3aed" />
      <meta name="msapplication-TileColor" content="#7c3aed" />
      <meta name="application-name" content="Calenso" />
      <meta name="apple-mobile-web-app-title" content="Calenso" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Geo Tags (for local SEO) */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Breadcrumb Schema */}
      {breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url,
              })),
            }),
          }}
        />
      )}
    </Helmet>
  );
}

// Pre-configured SEO components for each page
export function HomeSEO() {
  return (
    <SEO
      title={PAGE_SEO.home.title}
      description={PAGE_SEO.home.description}
      keywords={PAGE_SEO.home.keywords}
      canonical={PAGE_SEO.home.canonical}
      pageType="home"
      breadcrumbs={[{ name: "Home", url: SITE_CONFIG.url }]}
    />
  );
}

export function DashboardSEO() {
  return (
    <SEO
      title={PAGE_SEO.dashboard.title}
      description={PAGE_SEO.dashboard.description}
      keywords={PAGE_SEO.dashboard.keywords}
      canonical={PAGE_SEO.dashboard.canonical}
      pageType="dashboard"
      noindex={true} // Dashboard is private
      breadcrumbs={[
        { name: "Home", url: SITE_CONFIG.url },
        { name: "Dashboard", url: PAGE_SEO.dashboard.canonical },
      ]}
    />
  );
}

export function EventsSEO() {
  return (
    <SEO
      title={PAGE_SEO.events.title}
      description={PAGE_SEO.events.description}
      keywords={PAGE_SEO.events.keywords}
      canonical={PAGE_SEO.events.canonical}
      pageType="events"
      noindex={true} // Events management is private
      breadcrumbs={[
        { name: "Home", url: SITE_CONFIG.url },
        { name: "Events", url: PAGE_SEO.events.canonical },
      ]}
    />
  );
}

export function MeetingsSEO() {
  return (
    <SEO
      title={PAGE_SEO.meetings.title}
      description={PAGE_SEO.meetings.description}
      keywords={PAGE_SEO.meetings.keywords}
      canonical={PAGE_SEO.meetings.canonical}
      pageType="meetings"
      noindex={true} // Meetings is private
      breadcrumbs={[
        { name: "Home", url: SITE_CONFIG.url },
        { name: "Meetings", url: PAGE_SEO.meetings.canonical },
      ]}
    />
  );
}

export function AvailabilitySEO() {
  return (
    <SEO
      title={PAGE_SEO.availability.title}
      description={PAGE_SEO.availability.description}
      keywords={PAGE_SEO.availability.keywords}
      canonical={PAGE_SEO.availability.canonical}
      pageType="availability"
      noindex={true} // Availability is private
      breadcrumbs={[
        { name: "Home", url: SITE_CONFIG.url },
        { name: "Availability", url: PAGE_SEO.availability.canonical },
      ]}
    />
  );
}

export function UserProfileSEO({ username, name }) {
  const title = PAGE_SEO.userProfile.title.replace("{username}", name || username);
  const description = PAGE_SEO.userProfile.description.replace("{username}", name || username);
  const canonical = PAGE_SEO.userProfile.canonical.replace("{username}", username);

  return (
    <SEO
      title={title}
      description={description}
      keywords={PAGE_SEO.userProfile.keywords}
      canonical={canonical}
      pageType="userProfile"
      ogType="profile"
      dynamicData={{ username, name }}
      breadcrumbs={[
        { name: "Home", url: SITE_CONFIG.url },
        { name: name || username, url: canonical },
      ]}
    />
  );
}

export function BookingPageSEO({ username, eventId, eventTitle, hostName }) {
  const title = PAGE_SEO.booking.title
    .replace("{eventTitle}", eventTitle || "Event")
    .replace("{username}", hostName || username);
  const description = PAGE_SEO.booking.description.replace("{eventTitle}", eventTitle || "event");
  const canonical = PAGE_SEO.booking.canonical
    .replace("{username}", username)
    .replace("{eventId}", eventId);

  return (
    <SEO
      title={title}
      description={description}
      keywords={PAGE_SEO.booking.keywords}
      canonical={canonical}
      pageType="booking"
      dynamicData={{ username, eventId, eventTitle, hostName }}
      breadcrumbs={[
        { name: "Home", url: SITE_CONFIG.url },
        { name: hostName || username, url: `${SITE_CONFIG.url}/${username}` },
        { name: eventTitle || "Book Event", url: canonical },
      ]}
    />
  );
}
