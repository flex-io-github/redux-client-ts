import * as React from "react"
import { Panel, PanelType, TextField, Checkbox, DefaultButton } from "office-ui-fabric-react"
import { autobind } from "@uifabric/utilities"
import { IPosition } from "../../../../../models"
import _ from 'lodash';
import { DialogBox } from '../../../../DialogBox'

interface IPositionFormProps {
  positionProps: IPosition
  updatePosition: (position: IPosition) => void
}

interface IPositionFormState {
  showPanel: boolean
  positionState: IPosition
}

type State = IPositionFormState

type Props = IPositionFormProps

export class PositionForm extends React.Component<Props, State> {
  private _DialogBox: DialogBox | any
  constructor(props: Props) {
    super(props)
    // console.log('Component has been created')
    this.state = {
      showPanel: false,
      positionState:
      {
        name: "",
        code: "",
        active: true
      },
    }

  }

  componentWillReceiveProps(nextProps: any){
      this.setState({ positionState:nextProps.positionProps })
  }

    render() {
        const { positionState } = this.state;
        const { positionProps } = this.props
        return (

        <Panel
            isOpen={this.state.showPanel}
            onDismiss={this._closePanel}
            type={PanelType.largeFixed}
        >
            <span>
            <h1>Position</h1>

            <TextField
                label="Code"
                value={positionState.code}
                onChanged={e => this.setValueToState("code", e)}
            />
            <TextField
                label="Given Name"
                value={positionState.name}
                onChanged={e => this.setValueToState("name", e)}
            />
            <Checkbox
                label='Active'
                onChange={this.onCheckboxChange}
                checked={positionState.active}
            />
            <DefaultButton onClick={this.openDialogBox}>Save</DefaultButton>
            </span>
            <DialogBox 
              onContinue={this.continueSave}
              ref={(thisElement) => this._DialogBox = thisElement}
              title={'Save Record'}
              subText={'Are you sure you want to update this record?'}
              primaryButton={'Yes'}
              secondaryButton={'No'}
            />
        </Panel>
        )
}

  // @autobind
  // saveToDatabase(){
  //   this.props.updatePosition(this.state.positionState);
    
  // }

  @autobind
  setValueToState(propertyName: string, value: any) {
    const positionState: IPosition = _.assign({}, this.state.positionState, {
      [propertyName]: value,
    })
    this.setState({ positionState })
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
    const positionState: IPosition = _.assign({}, this.state.positionState, {
      active: isChecked,
    })
    this.setState({ positionState })
  }

  @autobind
  openDialogBox() {
      this._DialogBox.show()
  }

  @autobind
  continueSave() {
    this.props.updatePosition(this.state.positionState);
    this._closePanel()
  }
}
