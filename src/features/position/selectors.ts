import { RootState } from '@src/features';
// import { EnthusiasmState } from './reducer'
export const getPositions =
  (state: RootState) => state.position.list;

export const getPosition =
  (state: RootState) => state.position.detail;