import { combineReducers } from "redux"
import { getType, getReturnOfExpression } from "typesafe-actions"

import * as employeeActions from './actions'
import { IEmployee } from '../../models';
import _ from 'lodash';

const returnsOfAction = Object.values(employeeActions).map(getReturnOfExpression);
export type Action = typeof returnsOfAction[number];

export type EmployeeState = {
    readonly list: IEmployee[];
    readonly detail: any;
}

export const employeeReducer = combineReducers<EmployeeState, Action>({
    list: (state = [], action) => {
        switch (action.type) {
            case getType(employeeActions.receivedRecord):
                return action.payload;
            case getType(employeeActions.saveNewRecord):
                return [...state, action.payload];
            case getType(employeeActions.deleteRecord):
                {
                    const employeeToRemove: any = _.find(state, (employee) => {
                        return employee.id === action.employeeId
                    })

                    const index = state.indexOf(employeeToRemove);

                    return [
                        ...state.slice(0, index),
                        ...state.slice(index + 1)
                    ];
                }
            // case getType(employeeActions.updateRecord):
            //     {
            //         const editedEmployee: any = _.find(state, (employee) => {
            //             return employee.id === action.payload.id
            //         })

            //         const stateIndex = state.indexOf(editedEmployee);

            //         return state.map((item, index) => {
            //             if(index !== stateIndex){
            //                 return item;
            //             }

            //             return {
            //                 ...item,
            //                 ...action.payload
            //             }
            //         })
            //     }
            default: return state;
        }
    },
    detail: (state = {}, action) => {
        switch(action.type){
            case getType(employeeActions.recordInfo):
                return _.assign({}, state, action.payload);
            default: return state;
        }
    }
});