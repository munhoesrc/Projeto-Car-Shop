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
    const cars = await this.model.get();
    const carsDomains = cars ? cars.map((car) => CarService.createDomain(car)) : [];

    return answer(200, carsDomains);
  }
}

export default CarService;
