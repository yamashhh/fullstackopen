const user = { username: 'test', name: 'test', password: 'test' }
const testBlog = {
  title: 'test blog',
  author: 'test author',
  url: 'test url',
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('[data-testid=appHeading').should('contain', 'Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[data-testid=usernameInput]').type(user.username)
      cy.get('[data-testid=passwordInput]').type(user.password)
      cy.get('[data-testid=loginButton]').click()
      cy.get('[data-testid=appHeading').should('contain', 'blogs')
      cy.get('[data-testid=snackbar]')
        .should('contain', `logged in as ${user.name}`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('[data-testid="userSection"]').should(
        'contain',
        `${user.name} logged in`
      )
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-testid=usernameInput]').type(user.username)
      cy.get('[data-testid=passwordInput]').type('wrong')
      cy.get('[data-testid=loginButton]').click()
      cy.get('[data-testid=appHeading').should(
        'contain',
        'Log in to application'
      )
      cy.get('[data-testid=snackbar]')
        .should('contain', 'Invalid username or password.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', `${user.name} logged in`)
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
    })

    it('a blog can be created', function () {
      cy.contains('new note').click()
      cy.get('[data-testid=titleInput]').type(testBlog.title)
      cy.get('[data-testid=authorInput]').type(testBlog.author)
      cy.get('[data-testid=urlInput]').type(testBlog.url)
      cy.get('[data-testid=createButton]').click()
      cy.get('[data-testid=snackbar]')
        .should(
          'contain',
          `a new blog ${testBlog.title} by ${testBlog.author} added`
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('[data-testid=blogArticle]').should(
        'contain',
        `${testBlog.title} ${testBlog.author}`
      )
    })

    it('a blog can be liked', function () {
      cy.createBlog(testBlog)
      cy.get('[data-testid=toggleDetailsButton]')
        .as('toggleDetailsButton')
        .click()
      cy.get('[data-testid=likeButton]').as('likeButton').click()
      cy.get('@toggleDetailsButton').click()
      cy.get('@likeButton').parent().should('contain', '1')
    })

    it('a blog can be removed', function () {
      cy.createBlog(testBlog)
      cy.on('window:confirm', () => true)
      cy.get('[data-testid=toggleDetailsButton]').click()
      cy.get('[data-testid=deleteButton]').click()
      cy.get('[data-testid=snackbar]')
        .should(
          'contain',
          `blog ${testBlog.title} by ${testBlog.author} deleted`
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('[data-testid=blogArticle]').should('not.exist')
    })

    it('a blog can not be removed by a different user', function () {
      cy.createBlog(testBlog)
      const otherUser = { username: 'other', name: 'other', password: 'other' }
      cy.request('POST', 'http://localhost:3003/api/users/', otherUser)
      cy.login(otherUser)
      cy.on('window:confirm', () => true)
      cy.get('[data-testid=toggleDetailsButton]').click()
      cy.get('[data-testid=deleteButton]').click()
      cy.get('[data-testid=snackbar]')
        .should('contain', 'Credentials mismatch.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('[data-testid=blogArticle]').should(
        'contain',
        `${testBlog.title} ${testBlog.author}`
      )
    })

    it('blogs are ordered according to likes in descending order', function () {
      cy.createBlog({
        title: 'blog 1',
        author: 'author 1',
        url: 'url 1',
        likes: 1,
      })
      cy.createBlog({
        title: 'blog 2',
        author: 'author 2',
        url: 'url 2',
        likes: 2,
      })
      cy.createBlog({
        title: 'blog 3',
        author: 'author 3',
        url: 'url 3',
        likes: 3,
      })
      cy.get('[data-testid=blogArticle]')
        .as('blogArticles')
        .eq(0)
        .should('contain', 'blog 3')
      cy.get('@blogArticles').eq(1).should('contain', 'blog 2')
      cy.get('@blogArticles').eq(2).should('contain', 'blog 1')
    })
  })
})
