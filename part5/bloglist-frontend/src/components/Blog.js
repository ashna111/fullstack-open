import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [flag, setFlag] = useState(false)
  const showDetails = () => setFlag(true)
  const hideDetails = () => setFlag(false)

  const updateLikeCount = (event, id) => {
    const foundBlog = blogs.find(b => b.id === id)
    const updatedBlog = { ...foundBlog, likes: foundBlog.likes + 1 }

    blogService.update(id, updatedBlog).then(returnedBlog => {
      setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
    })

  }

  if (!flag) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} &nbsp; <button onClick={showDetails}>view</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>{blog.title} &nbsp; <button onClick={hideDetails}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes}&nbsp; <button onClick={(event) => updateLikeCount(event, blog.id)}>like</button></div>
        <div>{blog.author}</div>
      </div>
    )
  }

}

export default Blog