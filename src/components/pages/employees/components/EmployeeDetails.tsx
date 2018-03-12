import * as React from "react"
import {
  CommandBar,
  IContextualMenuItem,
  DetailsList,
  IColumn,
  Selection,
  CheckboxVisibility,
  ConstrainMode,
  IContextualMenuProps,
  IGroup,
  SelectionMode,
  buildColumns,
  MarqueeSelection,
} from "office-ui-fabric-react"
import { autobind } from "@uifabric/utilities"
import { IEmployee } from "@src/models"
import { EmployeeForm } from "./EmployeeForm"

// const _items: any[] = []
// const _columns: IColumn[] = [
//   {
//     key: "id",
//     name: "id",
//     fieldName: "id",
//     minWidth: 100,
//     maxWidth: 200,
//     isResizable: true,
//     ariaLabel: "Operations for name",
//   },
//   {
//     key: "given_name",
//     name: "given_name",
//     fieldName: "given_name",
//     minWidth: 100,
//     maxWidth: 200,
//     isResizable: true,
//     ariaLabel: "Operations for value",
//   },
// ]

interface IProps {
  items: any[]
  onClickAddButton: () => void
  onDeleteRecord: (employeeId: number) => void
  onUpdateRecord: () => void
  employeeDetail: IEmployee
  recordToView: (employeeId: number) => void
}

export interface IEmployeeDetailsState {
  // canResizeColumns?: boolean
  // checkboxVisibility?: CheckboxVisibility
  columns?: IColumn[]
  // constrainMode?: ConstrainMode
  // contextualMenuProps?: IContextualMenuProps
  // groupItemLimit?: number
  // groups?: IGroup[]
  // isHeaderVisible?: boolean
  // isLazyLoaded?: boolean
  // isSortedDescending?: boolean
  items?: any[]
  // layoutMode?: any
  // selectionMode?: SelectionMode
  // sortedColumnKey?: string
  selectionDetails: {}
}

export class EmployeeDetails extends React.Component<
  IProps,
  IEmployeeDetailsState
> {
  private _selection: Selection
  private _detailList: any
  private _employeeFrom: EmployeeForm | any

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
      // groups: undefined,
      // constrainMode: ConstrainMode.horizontalConstrained,
      // selectionMode: SelectionMode.multiple,
      // canResizeColumns: true,
      // checkboxVisibility: CheckboxVisibility.onHover,
      columns: buildColumns(this.props.items),
      // contextualMenuProps: undefined,
      // sortedColumnKey: "name",
      // isSortedDescending: false,
      // isLazyLoaded: false,
      // isHeaderVisible: true,
      selectionDetails: this._getSelectionDetails(),
    }
  }

  render() {
    return (
      <div>
        {this.renderCommandBar()}
        {this.renderTable()}
        {this.renderForm()}
      </div>
    )
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
      <EmployeeForm
        employeeProps={this.props.employeeDetail}
        ref={(thisElement) => this._employeeFrom = thisElement}
        updateEmployee={this.props.onUpdateRecord}
      />
    )
  }

  renderCommandBar() {
    return <CommandBar items={this.getCommandBarItems()} />
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
    this._employeeFrom.show()

  }

  getSelectedEmployee(): IEmployee {
    return this._selection.getSelection()[0] as any

  }

  @autobind
  deleteRecord() {
    const employeeIdSelected: number = this._getSelectionDetails()
    if (employeeIdSelected > 0) this.props.onDeleteRecord(employeeIdSelected)
  }

  @autobind
  _getSelectionDetails(): number {
    const selectionCount = this._selection.getSelectedCount()
    if (selectionCount > 0) return (this._selection.getSelection()[0] as any).id
    else return 0

  }
}
