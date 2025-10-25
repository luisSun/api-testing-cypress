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


Cypress.Commands.add('requestSpecificDevice', (deviceId) => {
    cy.request({
        method: 'GET',
        url: `https://api.restful-api.dev/objects/${deviceId}`,
        failOnStatusCode: false
    }).then((response) => { return response })

})

Cypress.Commands.add('requestAllDevices', () => {
    cy.request({
        method: 'GET',
        url: `https://api.restful-api.dev/objects`,
        failOnStatusCode: false
    }).then((response) => { return response })

})

Cypress.Commands.add('registerNewDevice', (bodydata) => {
    cy.request({
        method: 'POST',
        url: "/objects",
        failOnStatusCode: false,
        body: bodydata
    }).then((responsePost) => { return responsePost })
})

Cypress.Commands.add('editDevices', (deviceId,editDevices) => {
    cy.request({
        method: 'PUT',
        url: `https://api.restful-api.dev/objects/${deviceId}`,
        failOnStatusCode: false,
        body: editDevices
      }).then((putResponse) => { return putResponse })
})

//DELETE 
Cypress.Commands.add('deleteWithoutId', () => {
    cy.request({
        method: 'DELETE',
        url: '/objects/',
        failOnStatusCode: false
    }).then((delResponse) => { return delResponse })
})

Cypress.Commands.add('deleteDeviceId', (deviceId) => {
    cy.request({
        method: "DELETE",
        url: `/objects/${deviceId}`,
        failOnStatusCode: false

    }).then((delResponse) => { return delResponse })
})