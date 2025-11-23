import siteMetadata from '@/data/siteMetadata'

interface HomepageSchemaProps {
  latestPosts?: Array<{
    slug: string
    title: string
    summary: string
    date: string
    url: string
  }>
}

export default function HomepageSchema({ latestPosts = [] }: HomepageSchemaProps) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteMetadata.siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      url: siteMetadata.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
        width: '60',
        height: '60'
      }
    },
    inLanguage: siteMetadata.language
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      width: '60',
      height: '60'
    },
    sameAs: [
      siteMetadata.github,
      siteMetadata.x,
      siteMetadata.facebook,
      siteMetadata.youtube,
      siteMetadata.linkedin,
      siteMetadata.instagram,
      siteMetadata.medium
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteMetadata.email,
      contactType: 'customer service'
    }
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
        width: '60',
        height: '60'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteMetadata.siteUrl
    },
    inLanguage: siteMetadata.language
  }

  // Generate BlogPosting schema for latest posts
  const blogPostingSchemas = latestPosts.map((post) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}/blog/${post.slug}`
    },
    author: {
      '@type': 'Person',
      name: siteMetadata.author
    },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
        width: '60',
        height: '60'
      }
    },
    inLanguage: siteMetadata.language
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {blogPostingSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}