// Uncomment client code and ingress returned token

import { put, call } from "redux-saga/effects"
import { Client } from "./api/client"
// import { setAccessToken } from "../../util/access_token_utils"
import { RootAction } from "@src/features/root-action"
// import { handleErrors } from "./error_sagas"
import { isActionOf, getType, getReturnOfExpression } from 'typesafe-actions'
import { sessionActions } from '../../features/session'
import { setAccessToken } from '../../util/access_token_utils';
import { handleErrors } from "./error_sagas"

// const loginAction = getType(loginActions)

const returnsOfActions = Object.values(sessionActions).map(getReturnOfExpression);
export type Actions = typeof returnsOfActions[number];

// function getLoginAction(n: RootAction): RootAction {

// }

export function* login(action: Actions): {} {
    switch (action.type) {
        case getType(sessionActions.login):
        {

            // yield put( sessionActions.setSpinner(true))
            const client = new Client

            const resp = yield call(client.login, action.payload.username, action.payload.password)

            // check if resp status is 200 and handle error if it is not
            const respHasError: boolean = yield call(handleErrors, resp.status)
            if (respHasError) { return }

            setAccessToken(resp.items.token)

            yield put( sessionActions.receiveAccessToken(resp.items.token) )
            // yield put( actions.bootstrap() )
            // yield put( actions.setSpinner(false) )
        }
    }

}
