import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routesCar = Router();

routesCar.post('/cars', (req, res, next) => new CarController(req, res, next).create());

export default routesCar;
