// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { $call } from 'utility-types';

import { countersActions } from './counters/actions';
import * as todosActions from './todos/actions';
import { sessionActions } from './session'
import { enthusiasmActions } from './enthusiasm/actions'
import { employeeActions } from './employee';

export const actions = {
  counters: countersActions,
  todos: todosActions,
  sessions: sessionActions,
  enthusiasm: enthusiasmActions,
  employees: employeeActions,
};

const returnsOfActions = [
  ...Object.values(countersActions),
  ...Object.values(todosActions),
  ...Object.values(sessionActions),
  ...Object.values(enthusiasmActions),
  ...Object.values(employeeActions),
].map($call);

type AppAction = typeof returnsOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
