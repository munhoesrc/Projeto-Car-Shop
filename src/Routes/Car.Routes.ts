import { Router } from 'express';
import CarController from '../Controllers/CarController';

const newControl = new CarController();
const routesCar = Router();

routesCar.post('/cars', newControl.create.bind(newControl));

export default routesCar;
