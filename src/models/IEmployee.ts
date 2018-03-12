import { IDbEntity } from '../service/dataSource/base/IDbEntity';

export interface IEmployee extends IDbEntity {
  code: string
  given_name: string
  surname: string
  other_given_name: string
  prefix: string
  suffix: string
  tfn: string
  mobile_number: string
  email_address: string
  date_of_birth: number
  gender_id: number
  work_type_id: number
  employee_status_id: number
}
