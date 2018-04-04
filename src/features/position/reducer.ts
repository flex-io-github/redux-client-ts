import { combineReducers } from "redux"
import { getType, getReturnOfExpression } from "typesafe-actions"

import * as positionActions from './actions'
import { IPosition } from '../../models';
import _ from 'lodash';

const returnsOfAction = Object.values(positionActions).map(getReturnOfExpression);
export type Action = typeof returnsOfAction[number];

export type PositionState = {
    readonly list: IPosition[];
    readonly detail: any;
}


export const positionReducer = combineReducers<PositionState, Action>({
    list: (state = [], action) => {
        switch (action.type) {
            case getType(positionActions.receivedRecord):
                return action.payload;
            case getType(positionActions.saveNewRecord):
                return [...state, action.payload];
            case getType(positionActions.deleteRecord):
                {
                    const positionToRemove: any = _.find(state, (position) => {
                        return position.id === action.positionId
                    })

                    const index = state.indexOf(positionToRemove);

                    return [
                        ...state.slice(0, index),
                        ...state.slice(index + 1)
                    ];
                }
            case getType(positionActions.updateRecord):
                {
                    const editedPosition: any = _.find(state, (position) => {
                        return position.id === action.payload.id
                    })

                    const stateIndex = state.indexOf(editedPosition);

                    return state.map((item, index) => {
                        if(index !== stateIndex){
                            return item;
                        }

                        return {
                            ...item,
                            ...action.payload
                        }
                    })
                }
            default: return state;
        }
    },
    detail: (state = {}, action) => {
        switch(action.type){
            case getType(positionActions.recordInfo):
                return _.assign({}, state, action.payload);
            default: return state;
        }
    }
});