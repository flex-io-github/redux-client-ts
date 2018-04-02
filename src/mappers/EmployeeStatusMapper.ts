import * as _ from "lodash"
import { IEmployeeStatus } from '../models';
import { ICrudMapper, CrudMapperBase } from '../service/dataSource/base'

export class EmployeeStatusMapper extends CrudMapperBase<IEmployeeStatus> implements ICrudMapper<IEmployeeStatus> {
    toViewModelList(data: any): IEmployeeStatus[] {
         return _.chain(data)
            // .mapValues((employee, id) => _.merge(employee, { id }))
            .toArray()
            .value() as IEmployeeStatus[];
    }

    toViewModel(id: string, student: IEmployeeStatus): IEmployeeStatus {
        return _.assign({}, student, { id })  as IEmployeeStatus;
    }
}
