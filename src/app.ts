import express from 'express';
import routes from './Routes/Car.Routes';
import routesMoto from './Routes/Motorcycle.Routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(routesMoto);

export default app;
