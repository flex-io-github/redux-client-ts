import * as React from 'react';
import {
    CommandBar,
    IContextualMenuItem,
    IColumn,
    Selection,
    DetailsList,
    MarqueeSelection,
    buildColumns,
} from "office-ui-fabric-react"

import { autobind } from "@uifabric/utilities"
import { EmployeeStatusForm } from "./EmployeeStatusForm"
import { IEmployeeStatus } from '@src/models';
import { DialogBox } from '../../../../DialogBox'

interface IProps {
    items: any[]
    onClickAddButton: () => void
    onDeleteRecord: (employeeStatusId: number) => void
    onUpdateRecord: () => void
    // recordToView: (employeeId: number) => void
    employeeStatusDetail: IEmployeeStatus
    recordToView: (employeeStatusId: number) => void
}

export interface IState {
    columns?: IColumn[]
    items?: any[]
    selectionDetails: {}
}

export class EmployeeStatusDetails extends React.Component<IProps, IState> {
    private _selection: Selection
    private _detailList: any
    private _employeeStatusFrom: EmployeeStatusForm | any
    private _dialogBox: DialogBox | any

    constructor(props: IProps) {
        super(props)
    
        this._selection = new Selection({
          onSelectionChanged: () => {
            if (this._detailList)
              this.setState({
                ...this.state,
                selectionDetails: this._getSelectionDetails(),
              })
          },
        })
    
        this.state = {
          selectionDetails: this._getSelectionDetails(),
        }
    }

    componentWillReceiveProps(nextProps: any){
        this.setState({ columns:buildColumns(nextProps.items) })
    }
    
    render() {
        return (
            <div>
                {this.renderCommandBar()}
                {this.renderTable()}
                {this.renderForm()}
                {this.renderDialogBox()}
            </div>
        );
    }

    renderCommandBar() {
        return <CommandBar items={this.getCommandBarItems()} />
    }

    renderTable() {
        const { columns } = this.state
        const { items } = this.props
        return (
          <MarqueeSelection selection={this._selection}>
            <DetailsList
              items={items}
              columns={columns}
              selectionPreservedOnEmptyClick={true}
              selectionMode={1}
              componentRef={this._detailList}
              selection={this._selection}
            />
          </MarqueeSelection>
        )
    }

    renderForm() {
        return (
            <EmployeeStatusForm
                employeeStatusProps={this.props.employeeStatusDetail}
                ref={(thisElement) => this._employeeStatusFrom = thisElement}
                updateEmployeeStatus={this.props.onUpdateRecord}
            />
        )
    }

    renderDialogBox() {
        return (
            <DialogBox 
                ref={(thisElement) => this._dialogBox = thisElement}
            />
        )
    }
    
    getCommandBarItems(): IContextualMenuItem[] {
        return [
            {
                key: "addRow",
                name: "Add",
                icon: "Add",
                onClick: this.props.onClickAddButton,
            },
            {
                key: "editRow",
                name: "Edit",
                icon: "Edit",
                onClick: this.clickedEditButton,
            },
            {
                key: "deleteRow",
                name: "Delete",
                icon: "Delete",
                onClick: this.deleteRecord,
            },
        ]
    }

    @autobind
    clickedEditButton() {
        const employeeIdSelected: number = this._getSelectionDetails()
        this.props.recordToView(employeeIdSelected)
        this._employeeStatusFrom.show()
    }

    @autobind
    _getSelectionDetails(): number {
        const selectionCount = this._selection.getSelectedCount()
        if (selectionCount > 0) return (this._selection.getSelection()[0] as any).id
        else return 0
    }

    @autobind
    deleteRecord() {
        this._dialogBox.show()
        // const employeeStatusIdSelected: number = this._getSelectionDetails()
        // if (employeeStatusIdSelected > 0) this.props.onDeleteRecord(employeeStatusIdSelected)
    }
}

