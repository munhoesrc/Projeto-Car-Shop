import { Request, Response, NextFunction } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private service: MotorcycleService;

  constructor() {
    this.service = new MotorcycleService();
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

export default MotorcycleController;
