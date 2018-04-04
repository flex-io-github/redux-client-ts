import * as React from "react";
import { connect } from "react-redux"
import { Dispatch, RootState } from "@src/features"
import { bindActionCreators } from "redux"

import { PositionDetails } from "./components/PositionDetails";
import { NewPosition } from './components/NewPosition';
import { IPosition } from '@src/models';
import { positionSelectors, positionActions } from "../../../../features/position";
import { autobind } from '@uifabric/utilities';

interface ReduxState {
    readonly position: IPosition[]
    readonly positionDetail: IPosition
}

interface ReduxActions {
    readonly fetchRecord: () => void
    readonly saveNewPosition: () => void
    readonly deletePosition: () => void
    readonly updatePosition: () => void
    readonly recordToView: () => void
}

type Props = ReduxState & ReduxActions

class Page extends React.Component<Props, {}> {
    
    private newPosition: NewPosition | any;
    
    constructor(props: ReduxState & ReduxActions) {
        super(props)
        this.state = {
            position: [],
        }
    }

    componentDidMount() {
        this.props.fetchRecord()
    }

    render() {
        return (
            <div>
                <h1>Positions</h1>
                <PositionDetails 
                    items={this.props.position}
                    onClickAddButton={ this.openNewPosition }
                    onUpdateRecord={this.props.updatePosition}
                    positionDetail={this.props.positionDetail}
                    recordToView={this.props.recordToView}
                    onDeleteRecord={ this.props.deletePosition }
                />

                <NewPosition
                    onSave= {this.props.saveNewPosition}
                    ref={(thisElement) => this.newPosition = thisElement}
                />
            </div>
        );
    }

    @autobind
    openNewPosition(){
        this.newPosition.show();
    }
}

const mapStateToProps = (state: RootState): ReduxState => ({
    position: positionSelectors.getPositions(state),
    positionDetail: positionSelectors.getPosition(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
        fetchRecord: () => positionActions.fetchRecord(),
        saveNewPosition: (newPosition: IPosition) => positionActions.saveNewRecord(newPosition),
        deletePosition: (positionId: string) => positionActions.deleteRecord(positionId),
        updatePosition: (position: IPosition) => positionActions.updateRecord(position),
        recordToView: (positionId: string) => positionActions.recordToView(positionId),
        },
        dispatch,
)

export const PositionPage = connect<ReduxState>(
    mapStateToProps,
    mapDispatchToProps,
  )(Page)