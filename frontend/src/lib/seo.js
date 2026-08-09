// SEO Configuration for Calenso
// All meta data, keywords, and structured data schemas

export const SITE_CONFIG = {
  name: "Calenso",
  tagline: "Smart Scheduling Made Simple",
  url: "https://calensothinkpixel.org",
  logo: "https://calenso.thinkpixel.org/logo.png",
  ogImage: "https://calenso.thinkpixel.org/og-image.png",
  twitterHandle: "@calenso",
  email: "contact@thinkpixel.org",
  phone: "+91-XXXXXXXXXX", // Update with actual phone
  address: {
    street: "", // Update with actual address
    city: "India",
    region: "",
    postalCode: "",
    country: "IN",
  },
  founder: {
    name: "Hardik Saxena",
    url: "https://hardik.thinkpixel.org/",
    email: "contact.hardik@thinkpixel.org",
    socials: {
      portfolio: "https://hardik.thinkpixel.org/",
      linkedin: "https://www.linkedin.com/in/hardik-saxena-77b354271",
      instagram: "https://www.instagram.com/_og.vamp_/?utm_source=ig_web_button_share_sheet",
      github: "https://github.com/Vamp415",
      discord: "https://discord.gg/NKj5jRrTjP",
      x: "https://x.com/hardiks57184721?s=21",
      buyMeACoffee: "https://buymeacoffee.com/vamp415",
      topmate: "https://topmate.io/hardik_saxena_001/",
      facebook: "https://www.facebook.com/hardik.saxena.12327",
      snapchat: "https://snapchat.com/t/uFZfqlnB",
      linktree: "https://linktr.ee/hardik_saxena",
      spotify: "https://open.spotify.com/user/31l62rpqwbbawz3xdq2bv37vnfma?si=4d936bec8dd74c7d",
      leetcode: "https://leetcode.com/u/vchs415/",
    },
  },
  company: {
    name: "Think Pixel",
    url: "https://www.thinkpixel.org/",
    email: "contact@thinkpixel.org",
    socials: {
      site: "https://www.thinkpixel.org/",
      whatsappCommunity: "https://chat.whatsapp.com/LMYbdJ5i2zuCKCwtoOh6kU",
      linkedin: "https://www.linkedin.com/company/thinkpixeledu/",
      instagram: "https://www.instagram.com/_think.pixel_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      telegram: "https://t.me/thinkpixeledu",
      youtube: "https://youtube.com/@thinkpixel-x9c?si=E1lwCVb4sssrQUJz",
      googleFeedbackForm: "https://forms.gle/W3WEVdkmm3YSvbZi6",
      buyMeACoffee: "https://buymeacoffee.com/vamp415",
      topmate: "https://topmate.io/hardik_saxena_001/",
      linktree: "https://linktr.ee/think_pixel",
    },
  },
};

// Primary Keywords
export const KEYWORDS = {
  primary: [
    "scheduling software",
    "online booking system",
    "appointment scheduling",
    "meeting scheduler",
    "calendar booking",
    "time slot booking",
    "scheduling app",
    "booking platform",
  ],
  secondary: [
    "free scheduling tool",
    "team scheduling",
    "client booking",
    "availability management",
    "meeting management",
    "calendar integration",
    "automated scheduling",
    "booking page",
  ],
  longTail: [
    "best free scheduling software for small business",
    "online appointment booking system free",
    "how to schedule meetings automatically",
    "create shareable booking page",
    "team availability scheduling tool",
    "client meeting scheduler app",
    "automated calendar booking system",
    "professional scheduling software",
  ],
  lsi: [
    "time management",
    "productivity tools",
    "calendar sync",
    "meeting links",
    "video conferencing",
    "time zone support",
    "booking confirmation",
    "schedule optimization",
  ],
};

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: "Calenso - Free Online Scheduling & Appointment Booking Software",
    description:
      "Calenso is a free scheduling software that helps you book meetings effortlessly. Create events, set availability, share your booking page, and let clients schedule time with you. No more back-and-forth emails!",
    keywords: [
      "scheduling software",
      "appointment booking",
      "meeting scheduler",
      "free booking system",
      "online calendar booking",
      "availability scheduling",
    ],
    canonical: "https://calenso.thinkpixel.org/",
    h1: "Schedule Meetings Without the Hassle",
  },
  dashboard: {
    title: "Dashboard - Manage Your Schedule | Calenso",
    description:
      "View your scheduling dashboard, track upcoming meetings, manage bookings, and monitor your availability all in one place with Calenso.",
    keywords: [
      "scheduling dashboard",
      "meeting management",
      "booking analytics",
      "appointment tracker",
    ],
    canonical: "https://calenso.thinkpixel.org/dashboard",
    h1: "Your Scheduling Dashboard",
  },
  events: {
    title: "Create & Manage Events - Custom Scheduling | Calenso",
    description:
      "Create custom event types with flexible durations, descriptions, and availability settings. Set up one-on-one meetings, group sessions, or consultations.",
    keywords: [
      "create events",
      "event scheduling",
      "custom meeting types",
      "booking events",
      "scheduling events",
    ],
    canonical: "https://calenso.thinkpixel.org/events",
    h1: "Manage Your Events",
  },
  meetings: {
    title: "Meetings - View & Manage Scheduled Appointments | Calenso",
    description:
      "View all your upcoming and past meetings in one place. Join video calls, reschedule, or cancel appointments with ease using Calenso.",
    keywords: [
      "scheduled meetings",
      "upcoming appointments",
      "meeting management",
      "video meetings",
    ],
    canonical: "https://calenso.thinkpixel.org/meetings",
    h1: "Your Meetings",
  },
  availability: {
    title: "Set Your Availability - Working Hours & Schedule | Calenso",
    description:
      "Define your working hours and availability for each day of the week. Control when clients can book meetings with you using Calenso's flexible scheduling.",
    keywords: [
      "set availability",
      "working hours",
      "schedule availability",
      "booking hours",
      "time slots",
    ],
    canonical: "https://calenso.thinkpixel.org/availability",
    h1: "Set Your Availability",
  },
  userProfile: {
    title: "{username}'s Booking Page | Calenso",
    description:
      "Book a meeting with {username}. View available events and schedule a time that works for both of you.",
    keywords: ["booking page", "schedule meeting", "book appointment"],
    canonical: "https://calenso.thinkpixel.org/{username}",
    h1: "Book a Meeting",
  },
  booking: {
    title: "Book {eventTitle} with {username} | Calenso",
    description:
      "Select a convenient time slot and book your {eventTitle} appointment. Quick and easy scheduling with automatic confirmations.",
    keywords: ["book meeting", "schedule appointment", "select time slot"],
    canonical: "https://calenso.thinkpixel.org/{username}/{eventId}",
    h1: "Book Your Appointment",
  },
};

// Structured Data Schemas
export const SCHEMAS = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Calenso",
    alternateName: "Calenso Scheduler",
    url: "https://calensothinkpixel.org",
    logo: "https://calenso.thinkpixel.org/logo.png",
    description:
      "Calenso is a free online scheduling and appointment booking software that helps professionals and businesses manage their time effectively.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Hardik Saxena",
      url: "https://hardik.thinkpixel.org/",
      email: "contact.hardik@thinkpixel.org",
      sameAs: [
        "https://hardik.thinkpixel.org/",
        "https://www.linkedin.com/in/hardik-saxena-77b354271",
        "https://www.instagram.com/_og.vamp_/?utm_source=ig_web_button_share_sheet",
        "https://github.com/Vamp415",
        "https://discord.gg/NKj5jRrTjP",
        "https://x.com/hardiks57184721?s=21",
        "https://buymeacoffee.com/vamp415",
        "https://topmate.io/hardik_saxena_001/",
        "https://www.facebook.com/hardik.saxena.12327",
        "https://snapchat.com/t/uFZfqlnB",
        "https://linktr.ee/hardik_saxena",
        "https://open.spotify.com/user/31l62rpqwbbawz3xdq2bv37vnfma?si=4d936bec8dd74c7d",
        "https://leetcode.com/u/vchs415/",
      ],
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Think Pixel",
      url: "https://www.thinkpixel.org/",
      sameAs: [
        "https://www.thinkpixel.org/",
        "https://chat.whatsapp.com/LMYbdJ5i2zuCKCwtoOh6kU",
        "https://www.linkedin.com/company/thinkpixeledu/",
        "https://www.instagram.com/_think.pixel_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        "https://t.me/thinkpixeledu",
        "https://youtube.com/@thinkpixel-x9c?si=E1lwCVb4sssrQUJz",
        "https://forms.gle/W3WEVdkmm3YSvbZi6",
        "https://buymeacoffee.com/vamp415",
        "https://topmate.io/hardik_saxena_001/",
        "https://linktr.ee/think_pixel",
      ],
    },
    sameAs: [
      "https://www.linkedin.com/company/thinkpixeledu/",
      "https://www.instagram.com/_think.pixel_",
      "https://youtube.com/@thinkpixel-x9c",
      "https://github.com/Vamp415",
      "https://www.thinkpixel.org/",
      "https://chat.whatsapp.com/LMYbdJ5i2zuCKCwtoOh6kU",
      "https://t.me/thinkpixeledu",
      "https://x.com/hardiks57184721",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "contact@thinkpixel.org",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "founder contact",
        email: "contact.hardik@thinkpixel.org",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  },

  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Calenso",
    alternateName: "Calenso Scheduler",
    url: "https://calensothinkpixel.org",
    description:
      "Free online scheduling and appointment booking software for professionals and businesses.",
    publisher: {
      "@type": "Organization",
      name: "Calenso",
      logo: {
        "@type": "ImageObject",
        url: "https://calenso.thinkpixel.org/logo.png",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://calenso.thinkpixel.org/{username}",
      },
      "query-input": "required name=username",
    },
  },

  softwareApplication: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Calenso",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Scheduling Software",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free scheduling software",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Smart Scheduling",
      "Time Zone Detection",
      "Team Collaboration",
      "Instant Confirmations",
      "Public Booking Pages",
      "Secure & Private",
    ],
    screenshot: "https://calenso.thinkpixel.org/screenshot.png",
  },

  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Calenso?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Calenso is a free online scheduling software that helps you create events, set your availability, and let others book time with you seamlessly. It eliminates the back-and-forth emails typically required to schedule meetings.",
        },
      },
      {
        "@type": "Question",
        name: "Is Calenso free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Calenso is completely free to use. You can create unlimited events, set your availability, and share your booking page without any cost.",
        },
      },
      {
        "@type": "Question",
        name: "How do I share my booking page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "After creating your account and setting up events, you get a personalized booking page URL (calenso.thinkpixel.org/yourusername) that you can share with clients, colleagues, or anyone who needs to book time with you.",
        },
      },
      {
        "@type": "Question",
        name: "Does Calenso support different time zones?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Calenso automatically detects and handles time zones. When someone books a meeting, they see available slots in their local time zone, ensuring no confusion about meeting times.",
        },
      },
      {
        "@type": "Question",
        name: "Can I create different types of events?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! You can create multiple event types with different durations (15 min, 30 min, 1 hour, etc.), descriptions, and availability settings. This is perfect for offering various meeting types like consultations, demos, or quick calls.",
        },
      },
      {
        "@type": "Question",
        name: "How do meeting confirmations work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When someone books a meeting, both you and the attendee receive instant confirmation emails with all the meeting details including the date, time, and video meeting link.",
        },
      },
    ],
  },

  breadcrumb: (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),

  webPage: (page) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: page.canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "Calenso",
      url: "https://calenso.thinkpixel.org",
    },
    breadcrumb: page.breadcrumb,
    mainEntity: page.mainEntity,
  }),

  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Online Scheduling Service",
    provider: {
      "@type": "Organization",
      name: "Calenso",
    },
    description:
      "Professional online scheduling and appointment booking service for individuals and businesses.",
    serviceType: "Scheduling Software",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Scheduling Features",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Event Creation",
            description: "Create custom event types with flexible settings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Availability Management",
            description: "Set and manage your weekly availability",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Public Booking Pages",
            description: "Shareable booking pages for easy scheduling",
          },
        },
      ],
    },
  },
};

// Generate dynamic page schema
export function generatePageSchema(pageType, dynamicData = {}) {
  const baseSchemas = [SCHEMAS.organization, SCHEMAS.website];

  switch (pageType) {
    case "home":
      return [
        ...baseSchemas,
        SCHEMAS.softwareApplication,
        SCHEMAS.faqPage,
        SCHEMAS.service,
      ];
    case "dashboard":
    case "events":
    case "meetings":
    case "availability":
      return baseSchemas;
    case "userProfile":
      return [
        ...baseSchemas,
        {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: dynamicData.name || dynamicData.username,
            url: `https://calenso.thinkpixel.org/${dynamicData.username}`,
          },
        },
      ];
    case "booking":
      return [
        ...baseSchemas,
        {
          "@context": "https://schema.org",
          "@type": "Event",
          name: dynamicData.eventTitle,
          organizer: {
            "@type": "Person",
            name: dynamicData.hostName,
          },
          eventAttendanceMode:
            "https://schema.org/OnlineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "VirtualLocation",
            url: `https://calenso.thinkpixel.org/${dynamicData.username}/${dynamicData.eventId}`,
          },
        },
      ];
    default:
      return baseSchemas;
  }
}

// OpenGraph and Twitter Card defaults
export const SOCIAL_META = {
  og: {
    type: "website",
    siteName: "Calenso",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@calenso",
    creator: "@hardiks57184721",
  },
};
