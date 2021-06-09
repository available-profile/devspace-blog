import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Post from '../../components/Post'
import { sortByDate } from '../../utils'

export default function BlogPage({posts}) {
  //console.log(posts)
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>

      
    </Layout>
  )
}

export async function getStaticProps() {
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
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')

    // parse into an object
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')


    const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

//  console.log(posts)

  return {
    props: {
      /* sort by recent date and display only 6 posts */
      posts: posts.sort(sortByDate)
    },
  }
}