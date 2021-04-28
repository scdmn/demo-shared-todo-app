import * as asyncActions from './todo.actions';
import {actions, selector} from './todo.slice';

const todoActions = {...actions, ...asyncActions};
export {todoActions, selector as todoSelector};
