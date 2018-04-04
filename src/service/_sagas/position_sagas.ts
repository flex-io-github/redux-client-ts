import * as positionActions from "../../features/position/actions"
import { isActionOf, getType, getReturnOfExpression } from "typesafe-actions"
import { PositionDS } from "../../service/dataSource"
import { put, call, take, race } from "redux-saga/effects"
import { PositionDataSource } from "../dataSource/dsEntities/PositionDataSource"

const returnsOfActions = Object.values(positionActions).map(
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
    const items: {} = resp.text ? JSON.parse(resp.text) : []
    return {
        items,
        status: resp.status,
        statusText: resp.statusText,
    }
}
import { PositionMapper } from "../../mappers"
import { IPosition } from "@src/models"

export function* positionService(action: Actions): {} {
    if (action.type == getType(positionActions.fetchRecord)) {
      const resp: IPosition[] = yield call(() =>
        PositionDS.positions.getAll().then(position => {
          return position
        }),
      )
  
      yield put(positionActions.receivedRecord(resp))
  
    } else if (action.type == getType(positionActions.saveNewRecord)) {
      yield call(() => PositionDS.positions.add(action.payload));
  
    }else if (action.type == getType(positionActions.deleteRecord)) {
      yield call(() => PositionDS.positions.remove(action.positionId));
    }else if (action.type == getType(positionActions.recordToView)) {
      const resp: IPosition = yield call (() =>
        PositionDS.positions.get(action.payload).then(position => {
          return position
        })
      )
      yield put(positionActions.recordInfo(resp))
    }else if (action.type == getType(positionActions.updateRecord)) {
      yield call(() => PositionDS.positions.update(action.payload));
    }
}