import { takeEvery, all, takeLatest } from "redux-saga/effects"
import { login } from "./session_sagas"
import { employeeService } from './employee_sagas';
// import { bootstrap } from "./bootstrap_sagas"

export default function *root(): {} {
    yield all([
        takeEvery("@@session/LOGIN", login),
        takeEvery("@@employee/FETCH_LIST", employeeService),
        takeLatest("@@employee/SAVE_NEW_RECORD", employeeService),
        takeLatest("@@employee/DELETE_RECORD", employeeService),
        takeEvery("@@employee/RECORD_TO_VIEW", employeeService),
        takeEvery("@@employee/UPDATE_RECORD", employeeService),
    ])

}