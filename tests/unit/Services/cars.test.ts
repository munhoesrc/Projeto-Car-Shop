import { describe, afterEach } from 'mocha';
import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarServices';

describe('CarService', function () {
  const car = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  };

  const validId = '641b5cade028df261c85d370';
  const invalidId = '1s4';

  const validCar = new Car({
    id: validId,
    ...car,
  });

  const carsOutput = [validCar];

  beforeEach(function () {
    sinon.stub(Model, 'create').resolves(validCar);
    sinon.stub(Model, 'find').resolves(carsOutput);
    sinon.stub(Model, 'findById').resolves(validCar);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('create', function () {
    it('adiciona um novo carro', async function () {
      const service = new CarService();
      const result = await service.create(car);
      expect(result).to.deep.equal({ message: validCar });
    });
  });

  describe('get', function () {
    it('retorna todos os carros', async function () {
      const service = new CarService();
      const result = await service.get();
      expect(result).to.deep.equal({ message: carsOutput });
    });

    it('retorna um carro por id válido', async function () {
      const service = new CarService();
      const result = await service.get(validId);
      expect(result).to.deep.equal({ message: validCar });
    });

    it('retorna erro para um id inválido', async function () {
      const service = new CarService();
      const result = await service.get(invalidId);
      expect(result).to.deep.equal({ message: 'Invalid mongo id' });
    });

    it('Testa busca por carro inválido', async function () {
      sinon.stub(Model, 'findById').resolves(null);
  
      const service = new CarService();
      const result = await service.get('641b5cade028df261c85d370');
  
      expect(result.message).to.deep.equal({ message: 'Car not found' });
    }); 
  
    it('Testa busca por ID inválido', async function () {
      sinon.stub(Model, 'findById').resolves(null);
  
      const service = new CarService();
      const result = await service.get('id inválido');
  
      expect(result.message).to.deep.equal({ message: 'Invalid mongo id' });
    }); 
  
    afterEach(function () {
      sinon.restore();
    });  
  });
});
