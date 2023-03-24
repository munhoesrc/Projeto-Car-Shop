import { Model, Schema, model } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private model: Model<ICar>;

  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.model = model<ICar>('Car', schema);
  }

  async create(car: ICar) {
    return this.model.create({ ...car });
  }

  async get() {
    try {
      const cars = await this.model.find();
      return cars;
    } catch (error) {
      return null;
    }
  }
  
  async getById(id: string) {
    try {
      const car = await this.model.findOne({ _id: id });
      return car;
    } catch (error) {
      return null;
    }
  }  
}

export default CarODM;
