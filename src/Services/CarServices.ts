import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import IResponse from '../Interfaces/IResponse';
import { answer } from '../assets/answer';

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
}

export default CarService;
