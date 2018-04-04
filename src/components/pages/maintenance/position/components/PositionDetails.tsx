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
import { PositionForm } from "./PositionForm"
import { IPosition } from '@src/models';
import { DialogBox } from '../../../../DialogBox'

interface IProps {
    items: any[]
    onClickAddButton: () => void
    onDeleteRecord: (positionId: number) => void
    onUpdateRecord: () => void
    // recordToView: (positionId: number) => void
    positionDetail: IPosition
    recordToView: (positionId: number) => void
}

export interface IState {
    columns?: IColumn[]
    items?: any[]
    selectionDetails: {}
}

export class PositionDetails extends React.Component<IProps, IState> {
    private _selection: Selection
    private _detailList: any
    private _positionFrom: PositionForm | any
    private _DialogBox: DialogBox | any

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
                {this.renderDeleteDialogBox()}
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
            <PositionForm
                positionProps={this.props.positionDetail}
                ref={(thisElement) => this._positionFrom = thisElement}
                updatePosition={this.props.onUpdateRecord}
            />
        )
    }

    renderDeleteDialogBox() {
        return (
            <DialogBox 
                onContinue={this.continueDelete}
                ref={(thisElement) => this._DialogBox = thisElement}
                title={'Delete Record'}
                subText={'Are you sure you want to delete this record?'}
                primaryButton={'Yes'}
                secondaryButton={'No'}
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
                onClick: this.openDeleteDialogBox,
            },
        ]
    }

    @autobind
    clickedEditButton() {
        const positionIdSelected: number = this._getSelectionDetails()
        this.props.recordToView(positionIdSelected)
        this._positionFrom.show()
    }

    @autobind
    _getSelectionDetails(): number {
        const selectionCount = this._selection.getSelectedCount()
        if (selectionCount > 0) return (this._selection.getSelection()[0] as any).id
        else return 0
    }

    @autobind
    openDeleteDialogBox() {
        this._DialogBox.show()
    }

    @autobind
    continueDelete() {
        const positionIdSelected: number = this._getSelectionDetails()
        if (positionIdSelected > 0) this.props.onDeleteRecord(positionIdSelected)
    }
}

