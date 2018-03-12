import * as React from "react"
import { connect } from "react-redux"
import { RootState, Dispatch } from "@src/features"
import { bindActionCreators } from "redux"
import { sessionActions } from "../../features/session"
import { sessionSelectors } from "../../features/session"
import { Error } from "../../features/session/types"
import { RouteComponentProps } from "react-router"
import { Fabric } from "office-ui-fabric-react"
import { DefaultButton } from "office-ui-fabric-react"

interface ReduxState  {
  readonly error: Error
}

interface ReduxActions  {
  readonly login: (username: string, password: string) => void
  // readonly receiveError: (errorText: string) => void
  // readonly clearError: () => void
}
// interface LoginPageProps extends RouteComponentProps<{}> {}

type Props = ReduxState & ReduxActions

// type LoginProps = ReduxState &
//     ReduxActions &
//     LoginPageProps &
//     RouteComponentProps<{}>

interface LoginState {
  readonly username: string
  readonly password: string
  readonly errorText: string
}

interface InputEvent {
  readonly target: {
    readonly name: string
    readonly value: string
  }
}

class LoginPage extends React.Component<Props, LoginState> {
  constructor(props: ReduxState & ReduxActions) {
    super(props)
    this.state = {
      username: "",
      password: "",
      errorText: "",
    }
  }

  handleChange = (event: InputEvent) => {
    const key = event.target.name.toLowerCase()

    if (key) {
      const meta: any = {}
      meta[key] = event.target.value
      this.setState({ ...meta, errorText: "" })
    }
  }

  componentWillReceiveProps(nextProps: ReduxState & ReduxActions): void {
    if (nextProps.error.errorText !== this.props.error.errorText) {
      this.setState({ errorText: nextProps.error.errorText })
    }
  }

  login = () => {
    const { username, password } = this.state
    this.props.login(username, password)
  }
  render() {
    return (
      <div>
        <input
          className="username"
          name={"username"}
          onChange={this.handleChange}
          value={this.state.username}
        />
        <input
          className="password"
          name={"password"}
          onChange={this.handleChange}
          value={this.state.password}
        />
        <button onClick={this.login}>Login</button>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState): ReduxState => ({
  error: state.session.error,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      login: (username, password) => sessionActions.login(username, password),
    },
    dispatch,
  )

export default connect<ReduxState>(mapStateToProps, mapDispatchToProps)(
  LoginPage,
)
