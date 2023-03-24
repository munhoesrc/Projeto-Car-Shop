import { Router } from 'express';
import CarController from '../Controllers/CarController';

const newControl = new CarController();
const routesCar = Router();

routesCar.post('/cars', newControl.create.bind(newControl));
routesCar.get('/cars', newControl.get.bind(newControl));
routesCar.get('/cars/:id', newControl.get.bind(newControl));

export default routesCar;
