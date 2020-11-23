const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  })
  return total
}

const favouriteBlog = (blogs) => {
  let favourite = {
    likes: -1
  }
  blogs.forEach(blog => {
    if (blog.likes > favourite.likes) {
      favourite = blog
    }
  })
  if (favourite.likes === -1) {
    return null
  } else {
    return favourite
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}