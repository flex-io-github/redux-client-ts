import * as React from "react";
import { connect } from "react-redux"
import { Dispatch, RootState } from "@src/features"
import { bindActionCreators } from "redux"

import { EmployeeStatusDetails } from "./components/EmployeeStatusDetails";
import { NewEmployeeStatus } from './components/NewEmployeeStatus';
import { IEmployeeStatus } from '@src/models';
import { employeeStatusSelectors, employeeStatusActions } from "../../../../features/employeeStatus";
import { autobind } from '@uifabric/utilities';

interface ReduxState {
    readonly employeeStatus: IEmployeeStatus[]
    readonly employeeStatusDetail: IEmployeeStatus
}

interface ReduxActions {
    readonly fetchRecord: () => void
    readonly saveNewEmployeeStatus: () => void
    readonly deleteEmployeeStatus: () => void
    readonly updateEmployeeStatus: () => void
    readonly recordToView: () => void
}

type Props = ReduxState & ReduxActions

class Page extends React.Component<Props, {}> {
    
    private newEmployeeStatus: NewEmployeeStatus | any;
    
    constructor(props: ReduxState & ReduxActions) {
        super(props)
        this.state = {
            employeeStatus: [],
        }
    }

    componentDidMount() {
        this.props.fetchRecord()
    }

    render() {
        return (
            <div>
                <h1>Employee Status</h1>
                <EmployeeStatusDetails 
                    items={this.props.employeeStatus}
                    onClickAddButton={ this.openNewEmployeeStatus }
                    onUpdateRecord={this.props.updateEmployeeStatus}
                    employeeStatusDetail={this.props.employeeStatusDetail}
                    recordToView={this.props.recordToView}
                    onDeleteRecord={ this.props.deleteEmployeeStatus }
                />

                <NewEmployeeStatus
                    onSave= {this.props.saveNewEmployeeStatus}
                    ref={(thisElement) => this.newEmployeeStatus = thisElement}
                />
            </div>
        );
    }

    @autobind
    openNewEmployeeStatus(){
        this.newEmployeeStatus.show();
    }
}

const mapStateToProps = (state: RootState): ReduxState => ({
    employeeStatus: employeeStatusSelectors.getEmployeesStatus(state),
    employeeStatusDetail: employeeStatusSelectors.getEmployeeStatus(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
        fetchRecord: () => employeeStatusActions.fetchRecord(),
        saveNewEmployeeStatus: (newEmployeeStatus: IEmployeeStatus) => employeeStatusActions.saveNewRecord(newEmployeeStatus),
        deleteEmployeeStatus: (employeeStatusId: string) => employeeStatusActions.deleteRecord(employeeStatusId),
        updateEmployeeStatus: (employeeStatus: IEmployeeStatus) => employeeStatusActions.updateRecord(employeeStatus),
        recordToView: (employeeStatusId: string) => employeeStatusActions.recordToView(employeeStatusId),
        },
        dispatch,
)

export const EmployeeStatusPage = connect<ReduxState>(
    mapStateToProps,
    mapDispatchToProps,
  )(Page)