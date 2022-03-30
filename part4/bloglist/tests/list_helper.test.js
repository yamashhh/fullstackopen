import {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} from '../utils/list_helper.js'
import {
  listWithOneBlog,
  biggerList,
  listWithManyTopFavorites,
  listWithNoLikes,
  listWithSameAuthors,
  biggerListWithManyTopFavorites,
} from './test_helper.js'

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(biggerList)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is undefined', () => {
    expect(favoriteBlog([])).toBe(undefined)
  })

  test('of list with one blog returns one blog', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test('of a bigger list is calculated right', () => {
    expect(favoriteBlog(biggerList)).toEqual(biggerList[2])
  })

  test('of a list with many top favorites returns first most liked blog', () => {
    expect(favoriteBlog(listWithManyTopFavorites)).toEqual(
      listWithManyTopFavorites[1]
    )
  })

  test('of a list with no likes returns first blog', () => {
    expect(favoriteBlog(listWithNoLikes)).toEqual(listWithNoLikes[0])
  })
})

describe('most blogs', () => {
  test('of empty list is undefined', () => {
    expect(mostBlogs([])).toBe(undefined)
  })

  test('of list with one blog returns the only author', () => {
    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('of a bigger list is calculated right', () => {
    expect(mostBlogs(biggerList)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })

  test('of list with same number of blogs for each author returns the first author', () => {
    expect(mostBlogs(listWithManyTopFavorites)).toEqual({
      author: 'dummy',
      blogs: 1,
    })
  })
})

describe('most likes', () => {
  test('of empty list is undefined', () => {
    expect(mostLikes([])).toBe(undefined)
  })

  test('of list with one blog returns the only author', () => {
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list is calculated right', () => {
    expect(mostLikes(biggerList)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })

  test('of list with same number of blogs for each author returns the author with most likes', () => {
    expect(mostLikes(listWithSameAuthors)).toEqual({
      author: 'baz',
      likes: 11,
    })
  })

  test('of a list with no likes returns first author', () => {
    expect(mostLikes(listWithNoLikes)).toEqual({ author: 'dummy', likes: 0 })
  })

  test('of a list with many top bloggers returns first author', () => {
    expect(mostLikes(biggerListWithManyTopFavorites)).toEqual({
      author: 'piyo',
      likes: 20,
    })
  })
})
