import * as employeeStatusActions from "../../features/employeeStatus/actions"
import { isActionOf, getType, getReturnOfExpression } from "typesafe-actions"
import { EmployeeStatusDS } from "../../service/dataSource"
import { put, call, take, race } from "redux-saga/effects"
import { EmployeeStatusDataSource } from "../dataSource/dsEntities/EmployeeStatusDataSource"

const returnsOfActions = Object.values(employeeStatusActions).map(
    getReturnOfExpression,
)
export type Actions = typeof returnsOfActions[number]

interface Resp {
    readonly text: string
    readonly status: number
    readonly statusText: string
}
  
interface HandledResp {
    readonly items: {}
    readonly status: number
    readonly statusText: string
}
  
const handleResp = (resp: Resp) => {
    // if text present, parse as json, otherwise empty array
    const items: {} = resp.text ? JSON.parse(resp.text) : []
    // return normalized response object
    return {
        items,
        status: resp.status,
        statusText: resp.statusText,
    }
}
import { EmployeeStatusMapper } from "../../mappers"
import { IEmployeeStatus } from "@src/models"

export function* employeeStatusService(action: Actions): {} {
    if (action.type == getType(employeeStatusActions.fetchRecord)) {
      const resp: IEmployeeStatus[] = yield call(() =>
        EmployeeStatusDS.employeesStatus.getAll().then(employeeStatus => {
          return employeeStatus
        }),
      )
  
      yield put(employeeStatusActions.receivedRecord(resp))
  
    } else if (action.type == getType(employeeStatusActions.saveNewRecord)) {
      yield call(() => EmployeeStatusDS.employeesStatus.add(action.payload));
  
    }else if (action.type == getType(employeeStatusActions.deleteRecord)) {
      // console.log(action.employeeId)
      yield call(() => EmployeeStatusDS.employeesStatus.remove(action.employeeStatusId));
    }else if (action.type == getType(employeeStatusActions.recordToView)) {
      // yield call(() => DataSource.employees.get(action.payload))
      const resp: IEmployeeStatus = yield call (() =>
        EmployeeStatusDS.employeesStatus.get(action.payload).then(employeeStatus => {
          return employeeStatus
        })
      )
  
      yield put(employeeStatusActions.recordInfo(resp))
    // }else if (action.type == getType(employeeStatusActions.updateRecord)) {
    //   // console.log(action.employeeId)
    //   yield call(() => EmployeeStatusDS.employeesStatus.update(action.payload));
    }
}