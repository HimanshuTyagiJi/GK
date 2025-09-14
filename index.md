---
layout: default
title: GK Learn Study
description: Explore the latest GK, Quizzes, and daily learning articles from GK Learn Study.
keywords: latest GK, daily general knowledge, GK quizzes, learning articles, current affairs, computer science
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ page.title }} | {{ site.title }}</title>
  <meta name="description" content="{{ page.description | default: site.description }}" />
  <meta name="keywords" content="{{ page.keywords | default: site.keywords }}" />
  <meta name="author" content="Mr. Himanshu Tyagi" />

  <!-- Extra meta -->
  <meta name="robots" content="index, follow" />
  <meta name="copyright" content="© 2024 GK Learn Study" />
  <meta name="msvalidate.01" content="63D3DE99AA18A86BEC082BCA9812780E" />

  <!-- Canonical & alternate -->
  <link rel="canonical" href="{{ page.url | absolute_url }}" />
  <link rel="alternate" hreflang="en-IN" href="{{ page.url | absolute_url }}" />

  <!-- Icons -->
  <link rel="icon" href="{{ '/favicon.ico' | relative_url }}" sizes="any" />
  <link rel="icon" href="{{ '/favicon.svg' | relative_url }}" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="{{ '/favicon.ico' | relative_url }}" />
  <link rel="manifest" href="{{ '/manifest.json' | relative_url }}" />

  <!-- Open Graph -->
  <meta property="og:title" content="{{ page.title }} | GK Learn Study" />
  <meta property="og:description" content="{{ page.description | default: site.description }}" />
  <meta property="og:image" content="https://gklearnstudy.in/GK-Learn-Study.png" />
  <meta property="og:url" content="{{ page.url | absolute_url }}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="GK Learn Study" />
  <meta property="og:locale" content="en_IN" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{{ page.title }}" />
  <meta name="twitter:description" content="{{ page.description | default: site.description }}" />
  <meta name="twitter:image" content="https://gklearnstudy.in/GK-Learn-Study.png" />
  <meta name="twitter:image:alt" content="GK Learn Study - Your gateway to daily knowledge" />

  <!-- CSS -->
  <link rel="stylesheet" href="{{ 'https://gklearnstudy.in/css/theme.css' | relative_url }}" />
  <link rel="stylesheet" href="{{ 'https://gklearnstudy.in/css/main-theme.css' | relative_url }}" />

  <!-- JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GK Learn Study",
    "url": "https://gklearnstudy.in/",
    "logo": "https://gklearnstudy.in/GK-Learn-Study.png",
    "sameAs": ["https://www.youtube.com/@GKLearnStudy"]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GK Learn Study",
    "url": "https://gklearnstudy.in/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gklearnstudy.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>
</head>
<body>
  {% include header.html %}

  <main class="container">
    {{ content }}
  </main>

  {% include footer.html %}


