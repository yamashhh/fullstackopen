import { createSelector } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MoleculesBlog from '../components/molecules/Blog/Blog'

const Blog = () => {
  const { blogId } = useParams()
  const blog = useSelector(
    createSelector(
      (state) => state.blogs,
      (blogs) => blogs.find((blog) => blog.id === blogId)
    )
  )

  return blog ? <MoleculesBlog blog={blog} /> : <h2>NOT FOUND</h2>
}

export default Blog
