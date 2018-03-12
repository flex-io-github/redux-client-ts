import { RootState } from '@src/features';
// import { EnthusiasmState } from './reducer'
export const getEmployees =
  (state: RootState) => state.employee.list;

export const getEmployee =
  (state: RootState) => state.employee.detail;