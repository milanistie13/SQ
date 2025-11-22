import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Categories' })

export default function CategoriesPage() {
  const posts = allCoreContent(sortPosts(allBlogs))

  // Get all unique categories
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))] as string[]

  // Count posts per category
  const categoryCounts = categories.reduce(
    (acc, category) => {
      acc[category] = posts.filter((post) => post.category === category).length
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Categories
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Browse posts by category
        </p>
      </div>
      <div className="pt-6 pb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog/category/${category.toLowerCase()}`}
              className="block rounded-lg border border-gray-200 bg-white p-6 shadow transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold text-gray-900 capitalize dark:text-gray-100">
                {category}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {categoryCounts[category]} {categoryCounts[category] === 1 ? 'post' : 'posts'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
