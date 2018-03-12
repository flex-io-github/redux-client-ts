import { Dispatch as ReduxDispatch, Reducer as ReduxReducer } from "redux"
import { RootState, RootAction } from '@src/features';

export type Dispatch = ReduxDispatch<RootAction>;
export type Reducer = ReduxReducer<RootState, RootAction>;

export type Api = {};