'use client'

import { usePathname } from 'next/navigation'
import Link from '@/components/Link'
import { Fragment } from 'react'

interface BreadcrumbItem {
  label: string
  href: string
  isCurrent: boolean
}

export default function Breadcrumb() {
  const pathname = usePathname()
  
  // Generate breadcrumb items from the current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '')
    
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Home',
        href: '/',
        isCurrent: pathname === '/'
      }
    ]

    let accumulatedPath = ''
    
    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`
      
      // Skip numeric segments (like page numbers) and 'page' segments
      if (segment === 'page' || !isNaN(Number(segment))) {
        return
      }

      let label = segment
      
      // Format labels for better readability
      if (segment === 'blog') {
        label = 'Blog'
      } else if (segment === 'about') {
        label = 'About'
      } else if (segment === 'contact') {
        label = 'Contact'
      } else if (segment === 'projects') {
        label = 'Projects'
      } else {
        // For blog posts, use a truncated version of the slug as the title
        // In a real implementation, you might want to fetch the actual post title
        label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      breadcrumbs.push({
        label,
        href: accumulatedPath,
        isCurrent: index === pathSegments.length - 1
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // Don't show breadcrumb on home page
  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        {breadcrumbs.map((breadcrumb, index) => (
          <Fragment key={breadcrumb.href}>
            <li className="flex items-center">
              {breadcrumb.isCurrent ? (
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
            {index < breadcrumbs.length - 1 && (
              <li className="flex items-center">
                <svg
                  className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}