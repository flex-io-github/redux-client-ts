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
  import { IPosition } from "../../models"
  
  export const fetchRecord = createAction(FETCH_LIST)
  
  export const receivedRecord = createAction(
    RECEIVED_LIST,
    (position: IPosition[]) => ({
      type: RECEIVED_LIST,
      payload: position,
    }),
  )
  
  export const saveNewRecord = createAction(
    SAVE_NEW_RECORD,
    (position: IPosition) => ({
      type: SAVE_NEW_RECORD,
      payload: position,
    }),
  )
  
  export const recordInfo = createAction(
    RECORD_INFO,
    (position: IPosition) => ({
      type: RECORD_INFO,
      payload: position
    })
  )
  
  
  export const deleteRecord = createAction(
    DELETE_RECORD,
    (positionId: string) => ({
      type: DELETE_RECORD,
      positionId,
    }),
  )
  
  export const updateRecord = createAction(
    UPDATE_RECORD,
    (position: IPosition) => ({
      type: UPDATE_RECORD,
      payload: position,
    }),
  )
  
  export const recordToView = createAction(
    RECORD_TO_VIEW,
    (positionId: string, position?: IPosition) => ({
      type: RECORD_TO_VIEW,
      payload: positionId,
    }),
  )
  