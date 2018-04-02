import * as React from "react"
import {
  Panel,
  PanelType,
  DefaultButton,
  TextField,
  ITextField,
  PrimaryButton,
  Checkbox,
} from "office-ui-fabric-react"
import { IEmployeeStatus } from "../../../../../models"
import { autobind } from "@uifabric/utilities"
import _ from "lodash"

interface IProps {
  onSave: (newEmployeeStatus: IEmployeeStatus) => void
}

interface IState {
  showPanel: boolean
  employeeStatus: IEmployeeStatus
}

interface InputEvent {
  readonly target: {
    readonly name: string
    readonly value: string
  }
}

export class NewEmployeeStatus extends React.Component<
    IProps,
    IState
> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      showPanel: false,
      employeeStatus: {
        code: "",
        name: "",
        active: true
      },
    }
  }

  render() {
    return (
      <Panel
        isOpen={this.state.showPanel}
        onDismiss={this._closePanel}
        type={PanelType.largeFixed}
      >
        <span>
          <h1>New Employee Status</h1>

          <TextField
            label="Code"
            onChanged={e => this.setValueToState("code", e)}
          />
          <TextField
            label="Name"
            onChanged={e => this.setValueToState("name", e)}
          />

          <Checkbox
            label='Active'
            onChange={this.onCheckboxChange}
            checked={this.state.employeeStatus.active}
          />
          
          <DefaultButton onClick={this.saveNewEmployeeStatus}>Save</DefaultButton>
        </span>
      </Panel>
    )
  }
  @autobind
  setValueToState(propertyName: string, value: string) {
    const employeeStatus: IEmployeeStatus = _.assign({}, this.state.employeeStatus, {
      [propertyName]: value,
    })
    this.setState({ employeeStatus })
  }

  @autobind
  saveNewEmployeeStatus() {
    this.props.onSave(this.state.employeeStatus)
  }
  @autobind
  private _closePanel() {
    this.setState({ showPanel: false })
  }

  @autobind
  onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
    const employeeStatus: IEmployeeStatus = _.assign({}, this.state.employeeStatus, {
      active: isChecked,
    })
    this.setState({ employeeStatus })
  }

  public show(employeeStatus?: IEmployeeStatus) {
    this.setState({ showPanel: true })
  }
}
