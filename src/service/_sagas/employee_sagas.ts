import * as employeeActions from "../../features/employee/actions"
import { isActionOf, getType, getReturnOfExpression } from "typesafe-actions"
import { DataSource } from "../../service/dataSource"
import { put, call, take, race } from "redux-saga/effects"
import { EmployeeDataSource } from "../dataSource/dsEntities/EmployeeDataSource"

const returnsOfActions = Object.values(employeeActions).map(
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
import { EmployeeMapper } from "../../mappers"
import { IEmployee } from "@src/models"

export function* employeeService(action: Actions): {} {
  if (action.type == getType(employeeActions.fetchRecord)) {
    const resp: IEmployee[] = yield call(() =>
      DataSource.employees.getAll().then(employees => {
        return employees
      }),
    )

    yield put(employeeActions.receivedRecord(resp))

  } else if (action.type == getType(employeeActions.saveNewRecord)) {
    yield call(() => DataSource.employees.add(action.payload));

  }else if (action.type == getType(employeeActions.deleteRecord)) {
    // console.log(action.employeeId)
    yield call(() => DataSource.employees.remove(action.employeeId));
  }else if (action.type == getType(employeeActions.recordToView)) {
    // yield call(() => DataSource.employees.get(action.payload))
    const resp: IEmployee = yield call (() =>
      DataSource.employees.get(action.payload).then(employee => {
        return employee
      })
    )

    yield put(employeeActions.recordInfo(resp))
  }else if (action.type == getType(employeeActions.updateRecord)) {
    // console.log(action.employeeId)
    yield call(() => DataSource.employees.update(action.payload));
  }
}
