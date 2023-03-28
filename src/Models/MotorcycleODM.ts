import { Model, Schema, model, models } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleODM {
  private model: Model<IMotorcycle>;
  private schema: Schema;

  constructor() {
    this.schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });

    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }

  async create(moto: IMotorcycle) {
    return this.model.create({ ...moto });
  }
}

export default MotorcycleODM;
