import { EmployeeMapper } from '../../mappers';
import { EmployeeDataSource } from './dsEntities/EmployeeDataSource';

const endPointUrl = 'http://localhost:5000/api';
// const studentsCollection = '/employees';

export class DataSource {
    static employees: EmployeeDataSource = new EmployeeDataSource({
        endPointUrl,
        collectionName: 'employees'
    }, new EmployeeMapper());
}