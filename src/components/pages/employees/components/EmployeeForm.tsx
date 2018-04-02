import * as React from "react"
import { Panel, PanelType, TextField, DefaultButton } from "office-ui-fabric-react"
import { autobind } from "@uifabric/utilities"
import { IEmployee } from "../../../../models"
import _ from 'lodash';

interface IEmployeeFormProps {
  employeeProps: IEmployee
  updateEmployee: (employee: IEmployee) => void
}

interface IEmployeeFormPanelState {
  showPanel: boolean
  employeeState: IEmployee
}

type State = IEmployeeFormPanelState

type Props = IEmployeeFormProps

export class EmployeeForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // console.log('Component has been created')
    this.state = {
      showPanel: false,
      employeeState:
      {
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

  componentDidMount(){
      // console.log('Component did mount');
  }

  componentWillReceiveProps(nextProps: any){
      this.setState({ employeeState:nextProps.employeeProps })
  }

  render() {
    const { employeeState } = this.state;
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
            value={employeeState.code}
            onChanged={e => this.setValueToState("code", e)}
          />
          <TextField
            label="Given Name"
            value={employeeState.given_name}
            onChanged={e => this.setValueToState("given_name", e)}
          />
          <TextField
            label="Surname"
            value={employeeState.surname}
            onChanged={e => this.setValueToState("surname", e)}
          />
          <TextField
            label="Other Given Name"
            value={employeeState.other_given_name}
            onChanged={e => this.setValueToState("other_given_name", e)}
          />
          <TextField
            label="TFN"
            value={employeeState.tfn}
            onChanged={e => this.setValueToState("tfn", e)}
          />
          <TextField
            label="Mobile Number:"
            value={employeeState.mobile_number}
            onChanged={e => this.setValueToState("mobile_number", e)}
          />
          <DefaultButton onClick={this.saveToDatabase}>Save</DefaultButton>
        </span>
      </Panel>
    )
  }

  @autobind
  saveToDatabase(){
    this.props.updateEmployee(this.state.employeeState);
  }

  @autobind
  setValueToState(propertyName: string, value: string) {
    const employeeState: IEmployee = _.assign({}, this.state.employeeState, {
      [propertyName]: value,
    })
    this.setState({ employeeState })
  }

  @autobind
  _closePanel() {
    this.setState({ showPanel: false })
  }

  @autobind
  public show() {

    this.setState({ showPanel: true })
  }
}
