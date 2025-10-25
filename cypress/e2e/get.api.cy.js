/// <reference types="cypress" />

describe('Buscar Dispositivos', () => {

    it('Buscar Dispositivo por ID', () => {

        const deviceId = '7'
        const deviceName = 'Apple MacBook Pro 16'

        cy.requestSpecificDevice(deviceId)
            .then((get_response) => {
                //console.log(get_response)
                expect(get_response.status).equal(200)

                expect(get_response.body).not.empty
                expect(get_response.body.year).not.string
                expect(get_response.body.data['CPU model']).not.empty

                expect(get_response.body.id).equal(deviceId)
                expect(get_response.body.name).equal(deviceName)

            })


    });

    it('Buscar ID inexistente', () => {

        const deviceId = 'Null'

        cy.requestSpecificDevice(deviceId).then((get_response_invalid) => {
            expect(get_response_invalid.status).equal(404)
            expect(get_response_invalid.body.error).equal(`Oject with id=${deviceId} was not found.`)
        })
    })

    it('Buscar todos os dispositivos', () => {

        cy.requestAllDevices().then((get_all_devices) => {
            expect(get_all_devices.status).equal(200)

            expect(get_all_devices.body).to.be.an('array')

            expect(get_all_devices.body.length).to.be.greaterThan(0)

            expect(get_all_devices.body.length).to.eq(13)

            const device = get_all_devices.body[0]
            expect(device).to.have.all.keys('id', 'name', 'data')
        })
    })
});