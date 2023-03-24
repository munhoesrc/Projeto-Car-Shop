import ICar from '../Interfaces/ICar';

class Car implements ICar {
  id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
  doorsQty: number;
  seatsQty: number;
  
  constructor(car: ICar) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}

export default Car;
