import { Request, Response, NextFunction } from 'express';
import CarService from '../Services/CarServices';

class CarController {
  private service: CarService;

  constructor() {
    this.service = new CarService();
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { status, message } = await this.service.create(req.body);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  };
}

export default CarController;
