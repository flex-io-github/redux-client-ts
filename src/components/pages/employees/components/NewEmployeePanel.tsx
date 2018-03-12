import * as React from "react"
import {
  Panel,
  PanelType,
  DefaultButton,
  TextField,
  ITextField,
  PrimaryButton,
} from "office-ui-fabric-react"
import { IEmployee } from "../../../../models"
import { autobind } from "@uifabric/utilities"
import _ from "lodash"

interface IPanelProps {
  onSave: (newEmployee: IEmployee) => void
}

interface IPanelState {
  showPanel: boolean
  employee: IEmployee
}

interface InputEvent {
  readonly target: {
    readonly name: string
    readonly value: string
  }
}

export class NewEmployeePanel extends React.Component<
  IPanelProps,
  IPanelState
> {
  constructor(props: IPanelProps) {
    super(props)

    this.state = {
      showPanel: false,
      employee: {
        given_name: "",
        code: "",
        surname: "",
        other_given_name: "",
        prefix: "",
        suffix: "",
        tfn: "",
        mobile_number: "",
        email_address: "",
        gender_id: 0,
        work_type_id: 0,
        employee_status_id: 0,
        date_of_birth: 0,
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
          <h1>New Employee</h1>

          <TextField
            label="Code"
            onChanged={e => this.setValueToState("code", e)}
          />
          <TextField
            label="Given Name"
            onChanged={e => this.setValueToState("given_name", e)}
          />
          <TextField
            label="Surname"
            onChanged={e => this.setValueToState("surname", e)}
          />
          <TextField
            label="Other Given Name"
            onChanged={e => this.setValueToState("other_given_name", e)}
          />
          <TextField
            label="TFN"
            onChanged={e => this.setValueToState("tfn", e)}
          />
          <TextField
            label="Mobile Number:"
            onChanged={e => this.setValueToState("mobile_number", e)}
          />
          <DefaultButton onClick={this.saveNewEmployee}>Save</DefaultButton>
        </span>
      </Panel>
    )
  }
  @autobind
  setValueToState(propertyName: string, value: string) {
    const employee: IEmployee = _.assign({}, this.state.employee, {
      [propertyName]: value,
    })
    this.setState({ employee })
  }

  @autobind
  saveNewEmployee() {
    this.props.onSave(this.state.employee)
  }
  @autobind
  private _closePanel() {
    this.setState({ showPanel: false })
  }

  public show(employee?: IEmployee) {
    this.setState({ showPanel: true })
  }
}
