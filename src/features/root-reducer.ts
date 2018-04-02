import { combineReducers } from "redux"
import { routerReducer as router, RouterState } from "react-router-redux"

import { reducer as counters, State as CountersState } from "./counters/reducer"
import { todosReducer, TodosState } from "./todos"
import { sessionReducer, SessionState } from "./session"
import { enthusiasmReducer, EnthusiasmState } from "./enthusiasm"
import { EmployeeState, employeeReducer } from "./employee"
import { EmployeeStatusState, employeeStatusReducer } from "./employeeStatus";

interface StoreEnhancerState {}

export interface RootState extends StoreEnhancerState {
  router: RouterState
  counters: CountersState
  todos: TodosState
  session: SessionState
  enthusiasm: EnthusiasmState
  employee: EmployeeState
  employeeStatus: EmployeeStatusState
}

import { RootAction } from "./root-action"

export const rootReducer = combineReducers<RootState, RootAction>({
  router,
  counters,
  todos: todosReducer,
  session: sessionReducer,
  enthusiasm: enthusiasmReducer,
  employee: employeeReducer,
  employeeStatus: employeeStatusReducer,
})
