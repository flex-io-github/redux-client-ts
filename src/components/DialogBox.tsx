import * as React from "react"
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { autobind } from "@uifabric/utilities"

// interface IProps {
//     onhideDialog: () => void
// }

interface IEmployeeFormPanelState {
    hideDialog: boolean
}
// type Props = IProps
type State = IEmployeeFormPanelState


export class DialogBox extends React.Component<
// Props
{}
, State> {
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
            onDismiss={ this._closeDialog }
            dialogContentProps={ {
            type: DialogType.normal,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
            } }
            modalProps={ {
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
            } }
        >
            <DialogFooter>
            <PrimaryButton onClick={ this._closeDialog } text='Save' />
            <DefaultButton onClick={ this._closeDialog } text='Cancel' />
            </DialogFooter>
        </Dialog>
    )
  }

  @autobind
  public show() {
    this.setState({ hideDialog: false })
  }

  @autobind
  _closeDialog() {
    this.setState({ hideDialog: true });
  }
}
