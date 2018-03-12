import * as React from "react"
import { connect } from "react-redux"
import { Dispatch, RootState } from "@src/features"
import { bindActionCreators } from "redux"
import { IEmployee } from "../../../models"
import { employeeSelectors, employeeActions } from "../../../features/employee"
// import LayoutPage from './components/LayoutPage';
import { strings } from '../../../util/strings';
import { EmployeeDetails } from './components/EmployeeDetails';
import { NewEmployeePanel } from './components/NewEmployeePanel';
import { autobind } from '@uifabric/utilities';
const JsonTable = require("ts-react-json-table")


interface ReduxState {
  readonly employees: IEmployee[]
  readonly employeeDetail: IEmployee
}

interface ReduxActions {
  readonly fetchRecord: () => void
  readonly saveNewEmployee: () => void
  readonly deleteEmployee: () => void
  readonly updateEmployee: () => void
  readonly recordToView: () => void
}

type Props = ReduxState & ReduxActions

class Page extends React.Component<Props, {}> {

  private newEmployeePanel: NewEmployeePanel | any;

  constructor(props: ReduxState & ReduxActions) {
    super(props)
    this.state = {
      employees: [],
    }
  }
  componentDidMount() {
    this.props.fetchRecord()
  }

  render() {

    return (
      <div>
        <h1>Employee Page</h1>
        <EmployeeDetails
          items={this.props.employees}
          onClickAddButton={ this.openNewEmployeePanel }
          onDeleteRecord={ this.props.deleteEmployee }
          onUpdateRecord={this.props.updateEmployee}
          employeeDetail={this.props.employeeDetail}
          recordToView={this.props.recordToView}
        />

        <NewEmployeePanel
          onSave= {this.props.saveNewEmployee}
          ref={(thisElement) => this.newEmployeePanel = thisElement}
        />

      </div>
    )
  }

  @autobind
  openNewEmployeePanel(){
    this.newEmployeePanel.show();
  }

}

const mapStateToProps = (state: RootState): ReduxState => ({
  employees: employeeSelectors.getEmployees(state),
  employeeDetail: employeeSelectors.getEmployee(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchRecord: () => employeeActions.fetchRecord(),
      saveNewEmployee: (newEmployee: IEmployee) => employeeActions.saveNewRecord(newEmployee),
      deleteEmployee: (employeeId: string) => employeeActions.deleteRecord(employeeId),
      updateEmployee: (employee: IEmployee) => employeeActions.updateRecord(employee),
      recordToView: (employeeId: string) => employeeActions.recordToView(employeeId),
    },
    dispatch,
  )

export const EmployeePage = connect<ReduxState>(
  mapStateToProps,
  mapDispatchToProps,
)(Page)
