import Blog from '../models/blog'

export const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

export const biggerList = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

export const listWithManyTopFavorites = [
  {
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 0,
  },
  {
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 20,
  },
  {
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 20,
  },
]

export const listWithNoLikes = [
  {
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 0,
  },
  {
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 0,
  },
  {
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 0,
  },
]

export const listWithSameAuthors = [
  {
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 0,
  },
  {
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 10,
  },
  {
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 2,
  },
  {
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 3,
  },
  {
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 5,
  },
  {
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 6,
  },
]

export const biggerListWithManyTopFavorites = [
  {
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 0,
  },
  {
    title: 'dummy',
    author: 'dummy',
    url: 'dummy',
    likes: 10,
  },
  {
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 12,
  },
  {
    title: 'fuga',
    author: 'piyo',
    url: 'hogehoge',
    likes: 8,
  },
  {
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 4,
  },
  {
    title: 'bar',
    author: 'baz',
    url: 'foobar',
    likes: 16,
  },
]

export const blogsInDb = async () =>
  (await Blog.find({})).map((blog) => blog.toJSON())
