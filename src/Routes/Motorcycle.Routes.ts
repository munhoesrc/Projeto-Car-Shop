import { Router } from 'express';
import MotorCycleController from '../Controllers/MotorcycleController';

const newControl = new MotorCycleController();
const routesMoto = Router();

routesMoto.post('/motorcycles', newControl.create.bind(newControl));

export default routesMoto;
