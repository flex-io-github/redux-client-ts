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
import { IEmployeeStatus } from "../../models"

export const fetchRecord = createAction(FETCH_LIST)

export const receivedRecord = createAction(
  RECEIVED_LIST,
  (employeeStatus: IEmployeeStatus[]) => ({
    type: RECEIVED_LIST,
    payload: employeeStatus,
  }),
)

export const saveNewRecord = createAction(
  SAVE_NEW_RECORD,
  (employeeStatus: IEmployeeStatus) => ({
    type: SAVE_NEW_RECORD,
    payload: employeeStatus,
  }),
)

export const recordInfo = createAction(
  RECORD_INFO,
  (employeeStatus: IEmployeeStatus) => ({
    type: RECORD_INFO,
    payload: employeeStatus
  })
)


export const deleteRecord = createAction(
  DELETE_RECORD,
  (employeeStatusId: string) => ({
    type: DELETE_RECORD,
    employeeStatusId,
  }),
)

export const updateRecord = createAction(
  UPDATE_RECORD,
  (employeeStatus: IEmployeeStatus) => ({
    type: UPDATE_RECORD,
    payload: employeeStatus,
  }),
)

export const recordToView = createAction(
  RECORD_TO_VIEW,
  (employeeStatusId: string, employeeStatus?: IEmployeeStatus) => ({
    type: RECORD_TO_VIEW,
    payload: employeeStatusId,
  }),
)
