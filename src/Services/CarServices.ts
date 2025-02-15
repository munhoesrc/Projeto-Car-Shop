import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import IResponse from '../Interfaces/IResponse';
import { answer, answerError } from '../assets/answer';

class CarService {
  private model = new CarODM();

  static createDomain(car: ICar): Car {
    return new Car(car);
  }

  async create(car: ICar): Promise<IResponse> {
    const newCar = await this.model.create(car);
    const message = CarService.createDomain(newCar);
    return answer(201, message);
  }

  async get(id?: string): Promise<IResponse> {
    if (id) {
      return this.getCarById(id);
    }

    const cars = await this.model.get();
    const carsDomains = cars ? cars.map((car) => CarService.createDomain(car)) : [];

    return answer(200, carsDomains);
  }

  private async getCarById(id: string): Promise<IResponse> {
    if (!isValidObjectId(id)) {
      return answerError(422, 'Invalid mongo id');
    }
  
    const car = await this.model.getById(id);
    if (!car) {
      return answerError(404, 'Car not found');
    }
    
    const carDomain = CarService.createDomain(car);
    return answer(200, carDomain);
  }

  async update(id: string, car: Partial<ICar>) {
    if (!isValidObjectId(id)) {
      return answerError(422, 'Invalid mongo id');
    }
    
    const updateCar = await this.model.update(id, car);
  
    if (!updateCar) {
      return answerError(404, 'Car not found');
    }
  
    const msg = CarService.createDomain(updateCar);
    return answer(200, msg);
  }  
}

export default CarService;
