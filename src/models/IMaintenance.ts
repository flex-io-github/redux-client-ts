import { IDbEntity } from '../service/dataSource/base/IDbEntity';

export interface IPosition extends IDbEntity {
    code: string
    name: string
    active: boolean
}