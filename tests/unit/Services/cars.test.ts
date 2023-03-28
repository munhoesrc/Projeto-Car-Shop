import { describe, afterEach } from 'mocha';
import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarServices';
import ICar from '../../../src/Interfaces/ICar';

describe('CarService', function () {
  const mock = [
    new Car({
      id: '641b5cade028df261c85d370',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    }),
  ];
  
  const service = new CarService();

  const carsExit = new Car({
    id: '641b5cade028df261c85d370',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  });
  
  const car: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  };

  const mockUpdate = [
    new Car({
      id: '641b5cade028df261c85d370',
      model: 'Marea',
      year: 2002,
      color: 'Red',
      status: true,
      buyValue: 12.99,
      doorsQty: 2,
      seatsQty: 5,
    }),
  ];

  const updateCar: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Red',
    status: true,
    buyValue: 12.99,
    doorsQty: 2,
    seatsQty: 5,
  };

  it('Deve testar se adiciona um carro', async function () {
    sinon.stub(Model, 'create').resolves(carsExit);

    const result = await service.create(car);
    expect(result.message)
      .to
      .deep
      .equal(carsExit);
  });

  it('Deve testar se lista todos os carros', async function () {
    sinon.stub(Model, 'find').resolves(mock);
    
    const result = await service.get();
    expect(result.message)
      .to
      .deep
      .equal(mock);
  });

  it('Deve testar se encontra carro por ID', async function () {
    sinon.stub(Model, 'findById').resolves(mock[0]);
    
    const result = await service.get('641b5cade028df261c85d370');
    expect(result.message)
      .to
      .deep
      .equal(mock[0]);
  }); 

  it('Deve testar ID inválido', async function () {
    sinon.stub(Model, 'findById').resolves(mock[0]);
    
    const result = await service.get('1s4');
    expect(result.message)
      .to
      .deep
      .equal({ message: 'Invalid mongo id' });
  }); 

  it('Deve testar entrada de "car" inválido', async function () {
    sinon.stub(Model, 'findById').resolves(mock[1]);
    
    const result = await service.get('641b5cade028df261c85d370');
    expect(result.message)
      .to
      .deep
      .equal({ message: 'Car not found' });
  }); 

  it('Deve testar se é possível alterar pelo ID', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(mockUpdate[0]);

    const result = await service.update('641b5cade028df261c85d370', updateCar);

    expect(result.message)
      .to
      .deep
      .equal(mockUpdate[0]);
  }); 

  it('Deve testar se não é possível alterar com ID inválido', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(mockUpdate[0]);

    const result = await service.update('1s4', updateCar);

    expect(result.message)
      .to
      .deep
      .equal({ message: 'Invalid mongo id' });
  }); 

  afterEach(sinon.restore);
});