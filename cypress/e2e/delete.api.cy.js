/// <reference types="cypress" />
import { newDevices as device } from '../support/elemments/dataApi.js';

describe('Teste DELETE', () => {

    //Deleter um dispositivo sem passar um ID
    it('200 - Delete sem Id', () => {

        const msg = 'Hello world from Spring Boot'

        cy.deleteWithoutId().then((noDevice) => {
            expect(noDevice.status).to.equal(200);

            expect(noDevice.body).equal(msg)
        })

    })
    //Cadastrar e deletar um Device especifico passando ID
    it('200 - Deletar um ID existente', () => {

        // Cadastrar o dispositivo antes de deletar
        cy.registerNewDevice(device).then((response_post) => {

            expect(response_post.status).to.equal(200)

            expect(response_post.body.id).to.not.be.empty


            const newDevice = response_post.body.id

            cy.deleteDeviceId(newDevice).then((deleteResponse) => {

                expect(deleteResponse.status).to.equal(200)
                expect(deleteResponse.body.message)
                    .to.equal(`Object with id = ${newDevice} has been deleted.`)

            })
        })
    })

    //Testa tentar deletar um ID inexistente
    it('404 - Deletar um ID inexistente', () => {

        const dispositivoFalso = 'santos'

        cy.deleteDeviceId(newDevice).then((dispositivoFalso) => {

            expect(fakeResponse.status).to.equal(404)
            expect(fakeResponse.body.error)
                .equal(`Object with id = ${dispositivoFalso} doesn't exist.`)
        })
    })

    //Testar e tentar deletar um ID protegido
    it('405 - Deletar um ID protegido', () => {

        const protectedDevice = 3;

        cy.deleteDeviceId(newDevice).then((protectedResp) => {

            //console.log(protectedResp)
            expect(protectedResp.status).to.equal(405)

            expect(protectedResp.body.error)
                .equal(`${protectedDevice} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`)

        })


    })

})
