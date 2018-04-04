import { EmployeeMapper, EmployeeStatusMapper, PositionMapper } from '../../mappers';
import { EmployeeDataSource } from './dsEntities/EmployeeDataSource';
import { EmployeeStatusDataSource } from './dsEntities/EmployeeStatusDataSource';
import { PositionDataSource } from './dsEntities/PositionDataSource';

const endPointUrl = 'http://localhost:5000/api';
// const studentsCollection = '/employees';

export class DataSource {
    static employees: EmployeeDataSource = new EmployeeDataSource({
        endPointUrl,
        collectionName: 'employees'
    }, new EmployeeMapper());
}

export class EmployeeStatusDS {
    static employeesStatus: EmployeeStatusDataSource = new EmployeeStatusDataSource({
        endPointUrl,
        collectionName: 'EmployeeStatus'
    }, new EmployeeStatusMapper());
}

export class PositionDS {
    static positions: PositionDataSource = new PositionDataSource({
        endPointUrl,
        collectionName: 'Position'
    }, new PositionMapper());
}