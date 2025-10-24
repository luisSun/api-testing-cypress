/// <reference types="cypress" />
import { newDevices as device } from '../support/elemments/dataApi.js';
import { editDevice as editDevices } from '../support/elemments/dataApi.js';

describe('Edição de Cadastro de Dispositivos', () => {

    const dataAtual = new Date().toISOString().slice(0, 16);
  
    it('Cadastrar e editar um dispositivo específico', () => {
  
      // Criar o dispositivo novo apra ser editado depois
      cy.registerNewDevice(device)
        .then((postResponse) => {
  
        const deviceID = postResponse.body.id;
        
        expect(postResponse.status).to.equal(200);
        console.log(`Dispositivo criado: https://api.restful-api.dev/objects/${deviceID}`);
  
        expect(postResponse.body.name).to.equal(device.name);
        expect(postResponse.body.data['CPU model']).to.equal(device.data['CPU model']);
  
        const deviceId = postResponse.body.id;
  
        // Editar o dispositivo criado
        cy.editDevices(deviceID,editDevices).then((putResponse) => {
  
          expect(putResponse.status).to.equal(200);
          expect(putResponse.body.name).to.equal(editDevices.name);
          expect(putResponse.body.data['CPU model']).to.equal(editDevices.data['CPU model']);
          expect(putResponse.body.updatedAt.slice(0, 16)).to.equal(dataAtual);

          console.log(`Id do Device editado: ${putResponse.body.id}`)

        });
      });
    });
  });
  