const Promise = require("promise")
const request = require("superagent-promise")(require("superagent"), Promise)
import { environment } from "../../../build_params"
import { getAccessToken } from "../../../util/access_token_utils"

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

const prodUrl: string = "http://localhost:5000"
const stagingUrl: string = "http://localhost:5000"

export class Client {
    rootUrl = environment === "production" ? prodUrl : stagingUrl
    buildUrl = (pieceOfUrl: string) => `${this.rootUrl}${pieceOfUrl}`
    authHeader = () => {
        return { Authorization: "Bearer " + getAccessToken() }
    }

    login = (username: string, password: string): HandledResp => {
        const userJSON: string = JSON.stringify({
            username: username,
            password: password,
        })

        return (
            request
                .post(this.buildUrl("/users/authenticate"))
                .set("Content-Type", "application/json")
                .send(userJSON)
                // .type("application/json")
                // .accept("application/json")
                .then((res: Resp) => handleResp(res))
                .catch((res: Resp) => handleResp(res))
        )
    }
}
