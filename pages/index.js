import Link from 'next/link'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import { getPosts } from '@/lib/posts'

export default function HomePage({posts}) {
  //console.log(posts)
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>

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
    </Layout>
  )
}

export async function getStaticProps() {
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

  

//  console.log(posts)

  return {
    props: {
      /* sort by recent date and display only 6 posts */
      posts: getPosts().slice(0, 6)//posts.sort(sortByDate).slice(0, 6)
    },
  }
}