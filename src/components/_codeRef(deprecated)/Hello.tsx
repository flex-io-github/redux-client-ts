import * as React from "react"

import { enthusiasmActions } from "../../features/enthusiasm/actions"
import { enthusiasmSelectors, EnthusiasmState } from "../../features/enthusiasm"
import { connect } from "react-redux"
import { Dispatch, RootState } from "@src/features"
import { bindActionCreators } from "redux"
import { Redirect, RouteComponentProps } from "react-router"
import { sessionActions } from "../../features/session"
// interface ReduxState {
//   readonly enthusiasmLevel: number
// }

interface Props {
  readonly enthusiasmLevel?: number
  // readonly history?: any
  readonly onIncrement?: () => void
  readonly onDecrement?: () => void
  readonly onLogout?: () => void
}
// function Hello({ enthusiasmLevel = 1, onIncrement, onDecrement }: Props) {
//   if (enthusiasmLevel <= 0) {
//     throw new Error("You could be a little more enthusiastic. :D")
//   }


//   return (
//     <div className="hello">
//       <div className="greeting">
//         Hello {name + getExclamationMarks(enthusiasmLevel)}
//       </div>
//       <div>
//         <button onClick={onDecrement}>-</button>
//         <button onClick={onIncrement}>+</button>
//       </div>
//     </div>
//   )
// }

// function getExclamationMarks(numChars: number) {
//   return Array(numChars + 1).join("!")
// }
class Hello extends React.Component<Props, object> {
  getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join("!")
  }

  render() {
    const {
      enthusiasmLevel = 1,
      onIncrement,
      onDecrement,
      // history,
      onLogout
    } = this.props

    if (enthusiasmLevel <= 0) {
      throw new Error("You could be a little more enthusiastic. :D")
    }
    //helpers
    const handlePushHome = () => {
      // history.push("/")
    }

    return (
      <div className="hello">
        <button onClick={handlePushHome}>Home</button>
        <div className="greeting">
          Hello Ronald{this.getExclamationMarks(enthusiasmLevel)}
        </div>
        <div>
          <button onClick={onIncrement}>+</button>
          <button onClick={onDecrement}>-</button>
          <button onClick={onLogout}>logout</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  enthusiasmLevel: enthusiasmSelectors.getEnthusiasmLevel(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onIncrement: enthusiasmActions.incrementEnthusiasm,
      onDecrement: enthusiasmActions.decrementEnthusiasm,
      onLogout: sessionActions.logout,
    },
    dispatch,
  )

// export default LoginPage
// const ConnectedApp: React.ComponentClass<Props> = connect<Props>(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Hello)
// export default ConnectedApp
export default connect<Props>(mapStateToProps, mapDispatchToProps)(Hello)
