import { Model, Schema, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private model: Model<ICar>;
  private schema: Schema;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.model = models.Car || model('Car', this.schema);
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
      // const car = await this.model.findOne({ _id: id });
      const car = await this.model.findById(id);
      return car;
    } catch (error) {
      return null;
    }
  } 
  
  async update(id: string, car: Partial<ICar>) {
    try {
      const updateCar = await this.model.findByIdAndUpdate(id, car, { new: true });
      return updateCar;
    } catch (error) {
      return null;
    }
  } 
}

export default CarODM;
