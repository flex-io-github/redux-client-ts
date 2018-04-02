import { IDbEntity } from '../service/dataSource/base/IDbEntity';

export interface IEmployeeStatus extends IDbEntity {
  code: string
  name: string
  active: boolean
}
