import { RootState } from '@src/features';
// import { EnthusiasmState } from './reducer'
export const getEmployeesStatus =
  (state: RootState) => state.employeeStatus.list;

export const getEmployeeStatus =
  (state: RootState) => state.employeeStatus.detail;