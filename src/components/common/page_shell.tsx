import * as React from "react"
import { RouteComponentProps } from "react-router"
import * as redux from "redux"
import { connect } from "react-redux"
import { RootState, Dispatch } from "@src/features"
import { SessionState } from "@src/features/session/"
import { bindActionCreators } from 'redux';
// import ProgressSpinner from "./progress_spinner/progress_spinner"
// import PageHeader from "./_page/PageHeader"
// import { isLoggedIn } from "../util/access_token_utils"

interface ReduxState {
    readonly session: SessionState
}

interface ReduxActions {}

interface PageShellProps extends RouteComponentProps<{}> {}

const mapStateToProps = (
    state: RootState,
    ownProps: PageShellProps,
): ReduxState => ({
    session: state.session,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch)

// const mapDispatchToProps = (
//     dispatch: redux.Dispatch<Store.All>,
// ): ReduxActions => ({})

type ShellProps = ReduxState &
    ReduxActions &
    PageShellProps &
    RouteComponentProps<{}>

type Component = React.ComponentClass<{}>
// type Component = React.ComponentClass<RouteComponentProps<{}>>

function pageShell(Component: Component): Component {
    class PageShell extends React.Component<ShellProps, {}> {
        componentWillReceiveProps(nextProps: ShellProps): void {
            if (!nextProps.session.session.loggedIn && this.props.session.session.loggedIn) {
                nextProps.history.push("/login")
            } else if (
                nextProps.session.session.loggedIn &&
                !this.props.session.session.loggedIn
            ) {
                this.props.history.push("/")
            }
        }

        render(): JSX.Element {

            const { session, ...props } = this.props
            // const loggedIn = isLoggedIn()
            return (
                <div>
                    {this.props.session.session.loggedIn}
                    {/* {this.props.session.loggedIn && <PageHeader {...props} />} */}
                    <Component {...props} />
                    {/* <ProgressSpinner /> */}
                </div>
            )
        }
    }

    const ConnectedShell: React.ComponentClass<PageShellProps> = connect(
        mapStateToProps,
        mapDispatchToProps,
    )(PageShell)
    return ConnectedShell
}

export default pageShell
