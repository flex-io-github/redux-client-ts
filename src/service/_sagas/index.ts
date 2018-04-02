import { takeEvery, all, takeLatest } from "redux-saga/effects"
import { login } from "./session_sagas"
import { employeeService } from './employee_sagas';
import { employeeStatusService } from './employeeStatus_sagas';
// import { bootstrap } from "./bootstrap_sagas"

export default function *root(): {} {
    yield all([
        takeEvery("@@session/LOGIN", login),
        takeEvery("@@employee/FETCH_LIST", employeeService),
        takeLatest("@@employee/SAVE_NEW_RECORD", employeeService),
        takeLatest("@@employee/DELETE_RECORD", employeeService),
        takeEvery("@@employee/RECORD_TO_VIEW", employeeService),
        takeEvery("@@employee/UPDATE_RECORD", employeeService),

        takeEvery("@@employeeStatus/FETCH_LIST", employeeStatusService),
        takeLatest("@@employeeStatus/SAVE_NEW_RECORD", employeeStatusService),
        takeLatest("@@employeeStatus/DELETE_RECORD", employeeStatusService),
        takeEvery("@@employeeStatus/RECORD_TO_VIEW", employeeStatusService),
        takeEvery("@@employeeStatus/UPDATE_RECORD", employeeStatusService),
    ])

}