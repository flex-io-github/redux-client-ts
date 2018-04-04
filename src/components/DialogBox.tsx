import * as React from "react"
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { autobind } from "@uifabric/utilities"

interface IProps {
    onContinue: () => void
    title: string
    subText: string
    primaryButton: string
    secondaryButton: string
}

interface IState {
    hideDialog: boolean
}
type Props = IProps
type State = IState

export class DialogBox extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    // console.log('Component has been created')
    this.state = {
        hideDialog: true,
    }

  }

  render() {
    return (

        <Dialog
            hidden={ this.state.hideDialog }
            onDismiss={ this._cancel }
            dialogContentProps={ {
            type: DialogType.normal,
            title: `${this.props.title}`,
            subText: `${this.props.subText}`
            } }
            modalProps={ {
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
            } }
        >
            <DialogFooter>
            <PrimaryButton onClick={ this._continue } text={this.props.primaryButton} />
            <DefaultButton onClick={ this._cancel } text={this.props.secondaryButton} />
            </DialogFooter>
        </Dialog>
    )
  }

  @autobind
  public show() {
    this.setState({ hideDialog: false })
  }

  @autobind
  _cancel() {
    this.setState({ hideDialog: true });
  }

  @autobind
  _continue() {
    this.props.onContinue()
    this.setState({ hideDialog: true });
  }
}
