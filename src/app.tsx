import * as React from "react"
import { Provider } from "react-redux"
import { Store } from "redux"
import { ConnectedRouter } from "react-router-redux"
import { Route } from "react-router-dom"
import { History } from "history"

// import { ListView } from "Components/list-view"
// import { Counter } from "Components/counter"
// import Hello from "Components/Hello"
import Login from "Components/login/login_page"
import { PrivateRoute } from "./components/common/private_route"
import MainLayout from "./layouts/main-layout"
import { Switch } from "react-router"
import pageShell from "./components/common/page_shell"
import Dashboard from "./components/dashboard"
import { EmployeePage } from "./components/pages/employees"
import { EmployeeStatusPage } from "./components/pages/maintenance/employee_status";
import { initializeIcons } from "@uifabric/icons"
import "./layouts/_styles/index.css"
// Register icons and pull the fonts from the default SharePoint cdn.
initializeIcons()

// ...or, register icons and pull the fonts from your own cdn:
// initializeIcons('https://my.cdn.com/path/to/icons/');

interface Props {
  store: Store<any>
  history: History
}

export class App extends React.Component<Props, {}> {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" component={pageShell(Login)} />
            <MainLayout>
              <Route path="/" exact={true} component={Dashboard} />
              <Route path="/employees" component={EmployeePage} />
              <Route path="/maintenance/employee_status" component={EmployeeStatusPage} />
            </MainLayout>
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}
{
  /* <Route
exact={true}
path="/"
render={() => (
  <ListView title="List of counters">
    <Counter />
  </ListView>
)}
/> */
}
