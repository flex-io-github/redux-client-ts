import axios from "axios"
import { ICrud } from "./ICrud"
import { ICrudConfig } from "./ICrudConfig"
import { ICrudMapper } from "./ICrudMapper"
import { IDbEntity } from "./IDbEntity"
// const Promise = require("promise")
// const request = require("superagent-promise")(require("superagent"), Promise)
import { environment } from "../../../build_params"
import { getAccessToken } from "../../../util/access_token_utils"

// interface Resp {
//     readonly text: string
//     readonly status: number
//     readonly statusText: string
// }

// interface HandledResp {
//     readonly items: {}
//     readonly status: number
//     readonly statusText: string
// }

// const handleResp = (resp: Resp) => {
//     // if text present, parse as json, otherwise empty array
//     const items: {} = resp.text ? JSON.parse(resp.text) : []
//     // return normalized response object
//     return {
//         items,
//         status: resp.status,
//         statusText: resp.statusText,
//     }
// }



export class CrudGeneric<T extends IDbEntity> implements ICrud<T> {
    protected endPointUrl: string;
    protected collectionName: string;
    protected mapper: ICrudMapper<T>;

    authHeader = () => {
        return { Authorization: "Bearer " + getAccessToken() }
    }

    constructor(crudConfig: ICrudConfig, mapper: ICrudMapper<T>) {
        this.endPointUrl = crudConfig.endPointUrl;
        this.collectionName = crudConfig.collectionName;
        this.mapper = mapper;
    }

    getAll = (): Promise<T[]> => {
        return axios
            .get(`${this.endPointUrl}/${this.collectionName}`)
            .then(response => this.mapper.toViewModelList(response.data))
            .catch(error => error.response)

        // return (
        //     request
        //         .get(`${this.endPointUrl}/${this.collectionName}`)
        //         .set("Content-Type", "application/json")
        //         // .type("application/json")
        //         // .accept("application/json")
        //         .then((res: Resp) => {
        //             // console.log(res)
        //             this.mapper.toViewModelList(res.text)
        //             // handleResp(res)
        //         })
        //         .catch((res: Resp) => handleResp(res))
        // )

    }
    add(entity: T): Promise<string> {
        // entity = this.mapper.removeId(entity);
        return axios
            .post(`${this.endPointUrl}/${this.collectionName}`, entity)
            .then(response => (response.data as any).name);
    }

    remove(id: string): Promise<string> {
        return axios
            .delete(`${this.endPointUrl}/${this.collectionName}/${id}`)
            .then(() => id);
    }
    get(id: string): Promise<T> {
        return axios
            .get(`${this.endPointUrl}/${this.collectionName}/${id}`)
            .then(response => this.mapper.toViewModel(id, response.data));
    }
    update(entity:T): Promise<string> {
        return axios
        .put(`${this.endPointUrl}/${this.collectionName}/${entity.id}`, entity)
        .then(response => (response.data as any).name);
    }
}