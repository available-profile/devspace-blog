import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import CategoryList from '@/components/CategoryList'
import { getPosts } from '@/lib/posts'

export default function CategoryBlogPage({posts, categoryName, categories}) {
  //console.log(posts)
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Posts in "{categoryName}"</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>

          <Link href='/blog'>
            <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>
              All Posts
            </a>
          </Link>
        </div>

        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>

      
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))
  const categories = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const {data: frontmatter} = matter(markdownWithMeta)

    return frontmatter.category.toLowerCase()
  })

  const paths = categories.map(category => ({
    params: {category_name: category}
  }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params: {category_name}}) {

    const files = fs.readdirSync(path.join('posts'))
  //console.log(files)
  //outputs files object with array of md files in posts folder
  // [
  //   'django-crash-course.md',
  //   'javascript-performance-tips.md',
  //   'new-in-php-8.md',
  //   'python-book-review.md',
  //   'react-crash-course.md',
  //   'tailwind-vs-bootstrap.md',
  //   'writing-great-unit-tests.md'
  // ]

  // map thru the files array
  const posts = getPosts() 

  // Get categories for sidebar
  const categories = posts.map(post => post.frontmatter.category)
  const uniqueCategories = [...new Set(categories)]

  // Filter posts by category
  const categoryPosts = posts.filter(post => post.frontmatter.category.toLowerCase() === category_name)

  return {
    props: {
      /* sort by recent date and display only 6 posts */
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories
    },
  }
}