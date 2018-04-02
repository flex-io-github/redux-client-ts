import * as React from "react"
import { Panel, PanelType, TextField, Checkbox, DefaultButton } from "office-ui-fabric-react"
import { autobind } from "@uifabric/utilities"
import { IEmployeeStatus } from "../../../../../models"
import _ from 'lodash';

interface IEmployeeStatusFormProps {
  employeeStatusProps: IEmployeeStatus
  updateEmployeeStatus: (employeeStatus: IEmployeeStatus) => void
}

interface IEmployeeStatusFormState {
  showPanel: boolean
  employeeStatusState: IEmployeeStatus
}

type State = IEmployeeStatusFormState

type Props = IEmployeeStatusFormProps

export class EmployeeStatusForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // console.log('Component has been created')
    this.state = {
      showPanel: false,
      employeeStatusState:
      {
        name: "",
        code: "",
        active: true
      },
    }

  }

  componentWillReceiveProps(nextProps: any){
      this.setState({ employeeStatusState:nextProps.employeeStatusProps })
  }

    render() {
        const { employeeStatusState } = this.state;
        const { employeeStatusProps } = this.props
        return (

        <Panel
            isOpen={this.state.showPanel}
            onDismiss={this._closePanel}
            type={PanelType.largeFixed}
        >
            <span>
            <h1>Employee Status</h1>

            <TextField
                label="Code"
                value={employeeStatusState.code}
                onChanged={e => this.setValueToState("code", e)}
            />
            <TextField
                label="Given Name"
                value={employeeStatusState.name}
                onChanged={e => this.setValueToState("name", e)}
            />
            <Checkbox
                label='Active'
                onChange={this.onCheckboxChange}
                checked={employeeStatusState.active}
            />
            <DefaultButton onClick={this.saveToDatabase}>Save</DefaultButton>
            </span>
        </Panel>
        )
}

  @autobind
  saveToDatabase(){
    this.props.updateEmployeeStatus(this.state.employeeStatusState);
  }

  @autobind
  setValueToState(propertyName: string, value: any) {
    const employeeStatusState: IEmployeeStatus = _.assign({}, this.state.employeeStatusState, {
      [propertyName]: value,
    })
    this.setState({ employeeStatusState })
  }

  @autobind
  _closePanel() {
    this.setState({ showPanel: false })
  }

  @autobind
  public show() {
    this.setState({ showPanel: true })
  }

  @autobind
  onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
    const employeeStatusState: IEmployeeStatus = _.assign({}, this.state.employeeStatusState, {
      active: isChecked,
    })
    this.setState({ employeeStatusState })
  }
}
