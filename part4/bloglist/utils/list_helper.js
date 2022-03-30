/**
 * a single blog object
 *
 * @typedef {{id: string, title: string, author: string, url: string, likes: number}} Blog
 */

/**
 * dummy function
 *
 * @param {Blog[]} blogs
 * @returns {1}
 */
export const dummy = (blogs) => {
  return 1
}

/**
 * accepts an array of blogs and returns the total number of likes
 *
 * @param {Blog[]} blogs
 * @returns {number} total number of likes
 */
export const totalLikes = (blogs) => {
  return blogs.reduce(
    (previousValue, currentValue) => previousValue + currentValue?.likes ?? 0,
    0
  )
}

/**
 * accepts an array of blogs and returns a blog with most likes
 *
 * @param {Blog[]} blogs
 * @returns {Blog} blog with most likes
 */
export const favoriteBlog = (blogs) => {
  return [...blogs].sort(
    (a, b) => Number(b?.likes ?? 0) - Number(a?.likes ?? 0)
  )?.[0]
}

/**
 * https://stackoverflow.com/a/34890276
 *
 * @param {any[]} array
 * @param {string} key
 * @returns {object}
 */
const groupBy = (array, key) => {
  return array.reduce((previousValue, currentValue) => {
    previousValue[currentValue[key]] = previousValue[currentValue[key]] || []
    previousValue[currentValue[key]].push(currentValue)
    return previousValue
  }, {})
}

/**
 * object representing author with most blogs
 *
 * @typedef {{author: string, blogs: number}} AuthorWithMostBlogs
 */

/**
 * accepts an array of blogs and returns the author with most blogs
 *
 * @param {Blog[]} blogs
 * @returns {AuthorWithMostBlogs} author with most blogs
 */
export const mostBlogs = (blogs) => {
  return Object.entries(groupBy(blogs, 'author'))
    .map(([key, value]) => ({
      author: key,
      blogs: value.length,
    }))
    .sort((a, b) => b.blogs - a.blogs)?.[0]
}

/**
 * object representing author with most likes
 *
 * @typedef {{author: string, likes: number}} AuthorWithMostLikes
 */

/**
 * accepts an array of blogs and returns the author with most likes
 *
 * @param {Blog[]} blogs
 * @returns {AuthorWithMostLikes} author with most likes
 */
export const mostLikes = (blogs) => {
  return Object.entries(groupBy(blogs, 'author'))
    .map(([key, value]) => ({
      author: key,
      likes: totalLikes(value),
    }))
    .sort((a, b) => b.likes - a.likes)?.[0]
}
