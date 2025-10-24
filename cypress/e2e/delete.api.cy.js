/// <reference types="cypress" />

describe('Teste de página', () => {

    it('Cadastrar e deletar um dispositivo específico', () => {

        const data = {
            "name": "Celular de teste",
            "data": {
                "year": 2066,
                "price": 49.99,
                "CPU model": "Intel Rayzen",
                "Hard disk size": "101010 TB"
            }
        }

        // Cadastrar o dispositivo
        cy.request({
            method: 'POST',
            url: "https://api.restful-api.dev/objects",
            failOnStatusCode: false,
            body: data
        }).then((resposta) => {
            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).to.not.be.empty

            // Deletar o dispositivo criado
            cy.request({
                method: "DELETE",
                url: `https://api.restful-api.dev/objects/${resposta.body.id}`,
                failOnStatusCode: false
            }).then((deleteResponse) => {
                expect(deleteResponse.status).to.equal(200)
                expect(deleteResponse.body.message).to.equal(`Object with id = ${resposta.body.id} has been deleted.`)
            })
        })
    })

})
