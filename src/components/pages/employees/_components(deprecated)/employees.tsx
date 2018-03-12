// import * as React from "react"
// import { connect } from "react-redux"
// import { Dispatch, RootState } from "@src/features"
// import { bindActionCreators } from "redux"
// import { IEmployee } from "../../models"
// import { employeeSelectors, employeeActions } from "../../features/employee"
// import { DetailsList } from 'office-ui-fabric-react';
// // import { FlexTable } from '../common/flex-table';

// const JsonTable = require('ts-react-json-table');

// interface ReduxState {
//   readonly employees: IEmployee[]
// }

// interface ReduxActions {
//   readonly fetchRecord: () => void
// }

// type Props = ReduxState & ReduxActions
// import { DetailsListBasicExample } from "./details"
// import { DetailsListAdvancedExample } from './detailExample';

// class Employees extends React.Component<Props, {}> {
//   constructor(props: ReduxState & ReduxActions) {
//     super(props)
//     this.state = {
//       employees: [],
//     }
//   }
//   componentDidMount() {

//     this.props.fetchRecord();

//     // console.log(this.props.employees)
//   }


//   render() {

//     return (
//       <div>
//         <h1>Employee Page</h1>
//         <div className="container">
//           {/* <DetailsListBasicExample /> */}
//         {/* <button onClick={this.props.fetchRecord}>Load</button> */}

//         {/* <JsonTable rows = { this.props.employees } className="selection"/> */}
//         <DetailsListAdvancedExample />
//         {/* <DetailsList className="selection" items = {this.props.employees} /> */}
//         </div>
//       </div>
//     )
//   }
// }



// const mapStateToProps = (state: RootState): ReduxState => ({
//   employees: employeeSelectors.getEmployees(state),
// })

// const mapDispatchToProps = (dispatch: Dispatch) =>
//   bindActionCreators(
//     {
//       fetchRecord: () => employeeActions.fetchRecord(),
//     },
//     dispatch,
//   )

// export default connect<ReduxState>(mapStateToProps, mapDispatchToProps)(
//   Employees,
// )
