import IResponse from '../Interfaces/IResponse';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';
import { answer } from '../assets/answer';

class MotorcycleService {
  private model = new MotorcycleODM();

  static createDomain(moto: IMotorcycle): Motorcycle {
    return new Motorcycle(moto);
  }

  async create(moto: IMotorcycle): Promise<IResponse> {
    const newMoto = await this.model.create(moto);
    const message = MotorcycleService.createDomain(newMoto);
    return answer(201, message);
  }
}

export default MotorcycleService;
