import * as React from "react"
import { LayoutMain } from "./components/layout-main"
import { withRouter } from "react-router-dom"
import { RootState } from "../features"
import { connect } from "react-redux"
import { LayoutHeader } from "./components/layout-header"
import { LayoutLeftNav, LayoutLeftNavLink } from "./components/layout-left-nav"
import {
  LayoutHeaderNav,
  LayoutHeaderNavLink,
} from "./components/layout-header-nav"


import { SideNav } from "./components/Nav.Basic.Example"
import { Fabric } from 'office-ui-fabric-react';
import Footer from './components/layout-footer'

class MainLayout extends React.Component<{}, {}> {
  render() {
    const { children } = this.props

    return (
      <Fabric className="App">
        <div className="header">
          <h1>this is a header</h1>
        </div>
        <div className="body">
          <div className="content">
            {children}
          </div>
          <SideNav className="sidebar"/>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Fabric>
    )
  }
}
const mapStateToProps = (state: RootState) => ({})

// const mapStateToProps = (state: RootState) => {}

export default withRouter(connect(mapStateToProps, {})(MainLayout) as any)


// <LayoutHeaderNavLink href="/" isPrimary>
//                 Home
//               </LayoutHeaderNavLink>
//               <LayoutHeaderNavLink href="/login">Login</LayoutHeaderNavLink>
//               <LayoutHeaderNavLink href="/employees">
//                 Employees
//               </LayoutHeaderNavLink>


// <div className="App">
// <LayoutHeader className="header">
//   <LayoutHeaderNav>
//   </LayoutHeaderNav>
// </LayoutHeader>

// <div className="body">
// <SideNav className="sidebar"/>

//   <div className="container">
//   <LayoutMain className="content">{children}</LayoutMain>
//   </div>
// </div>
// <div className="footer">
// </div>