import { RootState } from '@src/features';
// import { EnthusiasmState } from './reducer'
export const getEnthusiasmLevel =
  (state: RootState) => state.enthusiasm.enthusiasmLevel;
