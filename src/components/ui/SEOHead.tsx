import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://mouataz.vercel.app'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mouataz Billah Kachkach',
  url: SITE_URL,
  image: `${SITE_URL}/images/pfp.png`,
  jobTitle: 'Full Stack Web Developer',
  description:
    'Full Stack Web Developer crafting modern, polished web applications with React, Next.js, Laravel, and TypeScript.',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'OFPPT ISMONTIC',
    description: 'Software Development Full Stack',
  },
  knowsLanguage: [
    { '@type': 'Language', name: 'Arabic', alternateName: 'ar' },
    { '@type': 'Language', name: 'French', alternateName: 'fr' },
    { '@type': 'Language', name: 'English', alternateName: 'en' },
  ],
  sameAs: [
    'https://github.com/Blaze-73',
    'https://linkedin.com/in/mouataz-billah-kachkach-67dih',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Laravel',
    'Node.js',
    'Express.js',
    'TailwindCSS',
    'PostgreSQL',
    'MongoDB',
    'MySQL',
    'Docker',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MA',
    addressLocality: 'Tangier',
  },
  email: 'kachkachmouataz@gmail.com',
}

const projectSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Selected Projects',
  description: 'Real projects built by Mouataz Billah Kachkach',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Gym Management System',
        description: 'Full-stack gym management platform with role-based access, PayPal payments, QR check-ins, workout tracking, nutrition logging, and coach management.',
        applicationCategory: 'BusinessApplication',
        url: 'https://alien-gym-management.vercel.app',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Riad Assilah',
        description: 'Boutique riad guesthouse website with multilingual support, room management, booking system, and JWT-authenticated admin panel.',
        applicationCategory: 'WebApplication',
        url: 'https://riad-assilah-client.vercel.app',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Najiya Flowers',
        description: 'Luxury flower e-commerce platform built with Next.js, featuring product catalog, cart, wishlist, checkout, and multi-language support.',
        applicationCategory: 'ECommerce',
        url: 'https://najiya-flowers.vercel.app',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'SoftwareApplication',
        name: 'AHAYZONE',
        description: 'Art gallery and tourism platform showcasing Arabic calligraphy and Asilah\'s artistic culture with multilingual support.',
        applicationCategory: 'WebApplication',
        url: 'https://ahayzone.vercel.app',
      },
    },
  ],
}

export function SEOHead() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <script type="application/ld+json">{JSON.stringify(projectSchema)}</script>
    </Helmet>
  )
}
