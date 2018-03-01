import {combineReducers} from 'redux';
import ActiveCar from './car-active';
import CarsReducers from './car';

const allReducers = combineReducers({
  cars: CarsReducers,
  active: ActiveCar
});

export default allReducers;