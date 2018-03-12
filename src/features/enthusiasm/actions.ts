import { createAction } from "typesafe-actions"

import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from "./types"

export const enthusiasmActions = {
    incrementEnthusiasm: createAction(INCREMENT_ENTHUSIASM),
    decrementEnthusiasm: createAction(DECREMENT_ENTHUSIASM),
}