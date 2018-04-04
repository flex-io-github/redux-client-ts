import { IDbEntity } from "./IDbEntity"

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

export interface ICrud<T extends IDbEntity>{
    getAll: () => Promise<T[]>;
    get: (id: string) => Promise<T>;
    add: (entity: T) => Promise<string>;
    update: (entity:T) => Promise<string>;
    remove: (id: string) => Promise<string>;
}