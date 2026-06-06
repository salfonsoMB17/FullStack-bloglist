const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((fav, blog) => blog.likes > fav.likes ? blog : fav)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const blogCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  const autorMasProductivo = Object.keys(blogCount).reduce((max, author) => {
    return blogCount[author] > (blogCount[max] || 0) ? author : max
  }, "")

  return {
    author: autorMasProductivo,
    blogs: blogCount[autorMasProductivo]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}