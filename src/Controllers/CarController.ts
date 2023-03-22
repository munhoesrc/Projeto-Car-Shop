import { Request, Response, NextFunction } from 'express';
import CarService from '../Services/CarServices';
import ICar from '../Interfaces/ICar';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;
}

constructor(req: Request, res: Response, next: NexFunction) {
  this.req = req;
  this.res = res;
  this.next = next;
  this.service = new CarService();     
}

public async create() {
  const car: ICar = {
    model: this.req.body.model,
    year: this.req.body.year,
    color: this.req.body.color,
    status: this.req.body.status,
    buyValue: this.req.body.buyValue,
    doorsQty: this.req.body.doorsQty,
    seatsQty: this.req.body.seatsQty,
  };

try {
  const carNew = await this.service.register(car);
  return this.res.status(201).json(carNew);
} catch (erro) {
  this.next(erro)
}
}

export default CarController;
