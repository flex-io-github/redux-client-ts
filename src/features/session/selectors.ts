import { RootState } from '@src/features'

export const getErrorText =
    (state: RootState) => state.session.error;