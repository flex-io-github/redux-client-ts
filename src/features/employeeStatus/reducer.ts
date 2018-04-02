import { combineReducers } from "redux"
import { getType, getReturnOfExpression } from "typesafe-actions"

import * as employeeStatusActions from './actions'
import { IEmployeeStatus } from '../../models';
import _ from 'lodash';

const returnsOfAction = Object.values(employeeStatusActions).map(getReturnOfExpression);
export type Action = typeof returnsOfAction[number];

export type EmployeeStatusState = {
    readonly list: IEmployeeStatus[];
    readonly detail: any;
}


export const employeeStatusReducer = combineReducers<EmployeeStatusState, Action>({
    list: (state = [], action) => {
        switch (action.type) {
            case getType(employeeStatusActions.receivedRecord):
                return action.payload;
            case getType(employeeStatusActions.saveNewRecord):
                return [...state, action.payload];
            case getType(employeeStatusActions.deleteRecord):
                {
                    const employeeStatusToRemove: any = _.find(state, (employeeStatus) => {
                        return employeeStatus.id === action.employeeStatusId
                    })

                    const index = state.indexOf(employeeStatusToRemove);

                    return [
                        ...state.slice(0, index),
                        ...state.slice(index + 1)
                    ];
                }
            default: return state;
        }
    },
    detail: (state = {}, action) => {
        switch(action.type){
            case getType(employeeStatusActions.recordInfo):
                return _.assign({}, state, action.payload);
            default: return state;
        }
    }
});