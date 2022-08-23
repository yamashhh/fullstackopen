import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

const handleSubmit = jest.fn()
const input = {
  title: 'test title',
  author: 'test author',
  url: 'test url',
}

describe('<BlogForm/>', () => {
  test('calls the event handler with correct details of a new blog', async () => {
    render(<BlogForm handleSubmit={handleSubmit} />)
    const titleInput = screen.getByTestId('titleInput')
    const authorInput = screen.getByTestId('authorInput')
    const urlInput = screen.getByTestId('urlInput')
    const createButton = screen.getByTestId('createButton')
    const user = userEvent.setup()

    await user.type(titleInput, input.title)
    await user.type(authorInput, input.author)
    await user.type(urlInput, input.url)
    await user.click(createButton)

    expect(handleSubmit).toHaveBeenCalledWith(input)
  })
})
