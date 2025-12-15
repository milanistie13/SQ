import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import ListLayout from '@/layouts/ListLayout'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const posts = allCoreContent(sortPosts(allBlogs))
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))] as string[]
  const paths: { category: string; page: string }[] = []
  for (const category of categories) {
    const filteredPosts = posts.filter(
      (post) => post.category?.toLowerCase() === category.toLowerCase()
    )
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
    for (let i = 0; i < totalPages; i++) {
      paths.push({ category: category.toLowerCase(), page: (i + 1).toString() })
    }
  }
  return paths
}

export default async function Page(props: {
  params: Promise<{ category: string; page: string }>
}) {
  const params = await props.params
  const { category, page } = params
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase()
  )
  const pageNumber = parseInt(page)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={`${category.charAt(0).toUpperCase() + category.slice(1)} Posts`}
    />
  )
}