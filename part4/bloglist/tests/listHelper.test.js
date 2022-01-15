import {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} from '../utils/list_helper.js'

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const biggerList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const listWithManyTopFavorites = [
  {
    _id: 'dummy',
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 0,
    __v: 0,
  },
  {
    _id: 'hoge',
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 20,
    __v: 0,
  },
  {
    _id: 'foo',
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 20,
    __v: 0,
  },
]

const listWithNoLikes = [
  {
    _id: 'dummy',
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 0,
    __v: 0,
  },
  {
    _id: 'hoge',
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 0,
    __v: 0,
  },
  {
    _id: 'foo',
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 0,
    __v: 0,
  },
]

const listWithSameAuthors = [
  {
    _id: 'dummy',
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 0,
    __v: 0,
  },
  {
    _id: 'dummy',
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 10,
    __v: 0,
  },
  {
    _id: 'hoge',
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 2,
    __v: 0,
  },
  {
    _id: 'hoge',
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 3,
    __v: 0,
  },
  {
    _id: 'foo',
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 5,
    __v: 0,
  },
  {
    _id: 'foo',
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 6,
    __v: 0,
  },
]

const biggerListWithManyTopFavorites = [
  {
    _id: 'dummy',
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 0,
    __v: 0,
  },
  {
    _id: 'dummy',
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 10,
    __v: 0,
  },
  {
    _id: 'hoge',
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 12,
    __v: 0,
  },
  {
    _id: 'hoge',
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 8,
    __v: 0,
  },
  {
    _id: 'foo',
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 4,
    __v: 0,
  },
  {
    _id: 'foo',
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 16,
    __v: 0,
  },
]

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
