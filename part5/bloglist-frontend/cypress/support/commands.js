// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', (credentials) => {
  cy.request('POST', 'http://localhost:3003/api/login', credentials).then(
    (response) => {
      window.localStorage.setItem(
        'part-5-bloglist-user',
        JSON.stringify(response.body)
      )
      cy.visit('http://localhost:3000')
    }
  )
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `bearer ${
        JSON.parse(window.localStorage.getItem('part-5-bloglist-user')).token
      }`,
    },
  })
  cy.visit('http://localhost:3000')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
