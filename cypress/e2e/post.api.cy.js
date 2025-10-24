/// <reference types="cypress" />

describe('Cadastro de Dispositivos', () => {


    const dataAtual = new Date().toISOString().slice(0,10)
    const data = {
        "name": "Celular de teste",
        "data": {
           "year": 2066,
           "price": 49.99,
           "CPU model": "Intel Rayzen",
           "Hard disk size": "101010 TB"
        }
     }

  it('Cadastrar um dispositivo em especifico', () => {

    cy.request({
        method: 'POST',
        url: "https://api.restful-api.dev/objects",
        failOnStatusCode: false,
        body: data
    }).as('postDeviceResult')

    cy.get('@postDeviceResult').then((resposta) =>{

        console.log(resposta)

        expect(resposta.status).equal(200)

        expect(resposta.body.id).not.empty
        expect(resposta.body.createdAt).not.empty

        expect((resposta.body.createdAt.slice(0,10))).equal(dataAtual)

        expect(resposta.body.name).equal(data.name)

        expect(resposta.body.data['CPU model']).equal(data.data['CPU model'])
        expect(resposta.body.data['Hard disk size']).equal(data.data['Hard disk size'])

        expect(resposta.body.data.year).equal(data.data.year)
        expect(resposta.body.data.price).equal(data.data.price)

    })

    
    });
});