import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayout'

const POSTS_PER_PAGE = 5

export async function generateStaticParams() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))] as string[]
  
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const title = `${category.charAt(0).toUpperCase() + category.slice(1)} Posts`
  
  return genPageMetadata({ title })
}

export default async function CategoryPage(props: { 
  params: Promise<{ category: string }>,
  searchParams: Promise<{ page: string }>
}) {
  const { category } = await props.params
  const searchParams = await props.searchParams
  const pageNumber = parseInt(searchParams.page || '1')
  
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter(post => 
    post.category?.toLowerCase() === category.toLowerCase()
  )
  
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
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