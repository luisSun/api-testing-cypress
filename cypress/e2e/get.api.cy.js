/// <reference types="cypress" />

describe('Buscar Dispositivos', () => {

  it('Buscar Dispositivo especifico', () => {

        const deviceId = '7'
        const deviceName = 'Apple MacBook Pro 16'

        cy.request({
            method: 'GET',
            url: `https://api.restful-api.dev/objects/${deviceId}`,
            failOnStatusCode: false            
        }).as('getDeviceResult')

        //Validações

        cy.get('@getDeviceResult').then((resposta) =>{
            console.log(resposta)
            expect(resposta.status).equal(200)
            
            expect(resposta.body).not.empty
            expect(resposta.body.year).not.string
            expect(resposta.body.data['CPU model']).not.empty

            expect(resposta.body.id).equal(deviceId)
            expect(resposta.body.name).equal(deviceName)

        })


    });
});