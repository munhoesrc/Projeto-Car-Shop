import { Model, models, Schema, model } from 'mongoose';

interface ODM<T> {
  create(body: T): Promise<T>;
  get(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  update(id: string, body: Partial<T>): Promise<T | null>;
}

class AbstractODM<T> implements ODM<T> {
  private model: Model<T>;

  constructor(private schema: Schema, private modelName: string) {
    this.model = models[modelName] || model(modelName, this.schema);
  }

  async create(body: T): Promise<T> {
    return this.model.create({ ...body });
  }

  async get(): Promise<T[]> {
    return this.model.find();
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async update(id: string, body: Partial<T>): Promise<T | null> {
    try {
      const updatedBody = await this.model.findByIdAndUpdate(id, body, {
        new: true,
      });
      return updatedBody;
    } catch (error) {
      return null;
    }
  }
}

export default AbstractODM;
