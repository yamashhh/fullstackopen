import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'test title',
  author: 'test author',
  url: 'test url',
  likes: 0,
  user: { name: 'test user' },
}
const handleUpdate = jest.fn(),
  handleDelete = jest.fn()

describe('<Blog/>', () => {
  test("only displays blog's title and author by default", () => {
    render(<Blog {...{ blog, handleUpdate, handleDelete }} />)
    const blogHeading = screen.getByTestId('blogHeading')
    const blogUrl = screen.queryByTestId('blogUrl')
    const blogLikes = screen.queryByTestId('blogLikes')
    const blogUserName = screen.queryByTestId('blogUserName')

    expect(blogHeading).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(blogUrl).toBeNull()
    expect(blogLikes).toBeNull()
    expect(blogUserName).toBeNull()
  })

  test('displays blog details when "view" button is pressed', async () => {
    render(<Blog {...{ blog, handleUpdate, handleDelete }} />)
    const toggleDetailsButton = screen.getByTestId('toggleDetailsButton')
    const user = userEvent.setup()

    await user.click(toggleDetailsButton)

    const blogHeading = screen.getByTestId('blogHeading')
    const blogUrl = screen.queryByTestId('blogUrl')
    const blogLikes = screen.queryByTestId('blogLikes')
    const blogUserName = screen.queryByTestId('blogUserName')
    expect(blogHeading).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(blogUrl).toHaveTextContent(blog.url)
    expect(blogLikes).toHaveTextContent(blog.likes)
    expect(blogUserName).toHaveTextContent(blog.user.name)
  })
})
