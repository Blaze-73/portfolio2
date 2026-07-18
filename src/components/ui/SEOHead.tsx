import { Helmet } from 'react-helmet-async'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mouataz Billah Kachkach',
  url: 'https://mouataz.vercel.app',
  image: '/images/pfp.png',
  jobTitle: 'Full Stack Web Developer',
  description:
    'Full Stack Web Developer crafting modern, polished web applications with React, Next.js, Laravel, and TypeScript.',
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
    'TailwindCSS',
    'PostgreSQL',
    'MongoDB',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MA',
    addressLocality: 'Tangier',
  },
  email: 'kachkachmouataz@gmail.com',
}

export function SEOHead() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
