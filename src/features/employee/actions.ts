import {
  FETCH_LIST,
  RECEIVED_LIST,
  SAVE_NEW_RECORD,
  DELETE_RECORD,
  UPDATE_RECORD,
  RECORD_TO_VIEW,
  RECORD_INFO,
} from "./types"
import { createAction } from "typesafe-actions"
import { IEmployee } from "../../models"

export const fetchRecord = createAction(FETCH_LIST)

export const deleteRecord = createAction(
  DELETE_RECORD,
  (employeeId: string) => ({
    type: DELETE_RECORD,
    employeeId,
  }),
)

export const saveNewRecord = createAction(
  SAVE_NEW_RECORD,
  (employee: IEmployee) => ({
    type: SAVE_NEW_RECORD,
    payload: employee,
  }),
)

export const receivedRecord = createAction(
  RECEIVED_LIST,
  (employees: IEmployee[]) => ({
    type: RECEIVED_LIST,
    payload: employees,
  }),
)

export const updateRecord = createAction(
  UPDATE_RECORD,
  (employee: IEmployee) => ({
    type: UPDATE_RECORD,
    payload: employee,
  }),
)

export const recordToView = createAction(
  RECORD_TO_VIEW,
  (employeeId: string, employee?: IEmployee) => ({
    type: RECORD_TO_VIEW,
    payload: employeeId,
  }),
)

export const recordInfo = createAction(
  RECORD_INFO,
  (employee: IEmployee) => ({
    type: RECORD_INFO,
    payload: employee
  })
)

// export const fetchRecord = createAction(FETCH_RECORD)
