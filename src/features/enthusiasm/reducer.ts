import { combineReducers } from "redux"
import { getType, getReturnOfExpression } from "typesafe-actions"

import {  enthusiasmActions } from './actions'
const returnsOfActions = Object.values(enthusiasmActions).map(getReturnOfExpression);
export type Action = typeof returnsOfActions[number];

export type EnthusiasmState = {
    readonly enthusiasmLevel: number
}

export const enthusiasmReducer = combineReducers<EnthusiasmState, Action>({
    enthusiasmLevel: (state = 1, action) => {
        switch (action.type) {
            case getType(enthusiasmActions.incrementEnthusiasm):
                return state + 1 ;
            case getType(enthusiasmActions.decrementEnthusiasm):
                return state - 1
        }
        return state;
    }
})
