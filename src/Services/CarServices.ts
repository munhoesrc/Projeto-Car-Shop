import ICar from '../Interfaces/ICar';

class CarService {
  private create(car: ICar | null) {
    if (car) {
      return car;
    }
    return null;
  }
}

export default CarService;