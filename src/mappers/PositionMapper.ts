import * as _ from "lodash"
import { IPosition } from '../models';
import { ICrudMapper, CrudMapperBase } from '../service/dataSource/base'

export class PositionMapper extends CrudMapperBase<IPosition> implements ICrudMapper<IPosition> {
    toViewModelList(data: any): IPosition[] {
         return _.chain(data)
            .toArray()
            .value() as IPosition[];
    }

    toViewModel(id: string, student: IPosition): IPosition {
        return _.assign({}, student, { id })  as IPosition;
    }
}
