export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "BennyDev - Verdès Benjamin",
          "image": "/logo.webp",
          "description": "Développeur web freelance spécialisé dans la création de sites web et applications sur mesure.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Achères",
            "addressRegion": "Yvelines",
            "addressCountry": "FR"
          },
          "priceRange": "€€",
          "telephone": "0629409288",
          "url": "https://www.bennydev.fr"
        })
      }}
    />
  )
} 