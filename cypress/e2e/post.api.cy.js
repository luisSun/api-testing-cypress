/// <reference types="cypress" />
import { newDevices as device } from '../support/elemments/dataApi.js';
describe('Cadastro de Dispositivos', () => {

    const dataAtual = new Date().toISOString().slice(0, 10)
    const emptyData = {}

    it.only('Cadastrar dispositivo com sucesso', () => {

        cy.registerNewDevice(device).then((resposta_post) => {

            expect(resposta_post.status).equal(200)

            expect(resposta_post.body.id).not.empty
            expect(resposta_post.body.createdAt).not.empty

            expect((resposta_post.body.createdAt.slice(0, 10))).equal(dataAtual)

            expect(resposta_post.body.name).equal(device.name)

            expect(resposta_post.body.data['CPU model']).equal(device.data['CPU model'])
            expect(resposta_post.body.data['Hard disk size']).equal(device.data['Hard disk size'])

            expect(resposta_post.body.data.year).equal(device.data.year)
            expect(resposta_post.body.data.price).equal(device.data.price)

            console.log(`Id do Device editado: ${resposta_post.body.id}`)

        })


    });

    it('Cadastrar sem passar body', () => {
        cy.registerNewDevice(emptyData).then((post_blankDevice) => {
            console.log(post_blankDevice)
            expect(post_blankDevice.status).to.equal(400)
            expect(post_blankDevice.body.name).to.not.be.null
            expect(post_blankDevice.body.data).to.not.be.null

            console.log('API aceitou cadastro sem body (bug conhecido)')
        })
    })

});