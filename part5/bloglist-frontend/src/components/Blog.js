import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
        <div>{blog.likes}&nbsp; <button>like</button></div>
        <div>{blog.author}</div>
      </div>
    )
  }

}


export default Blog
