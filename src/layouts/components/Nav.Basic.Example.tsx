import { withRouter } from "react-router-dom"
import * as React from "react"
import { Nav, INavLink } from 'office-ui-fabric-react';
import '../_styles/NavBar.css'

interface ISideNavProps {
    history?: any
    className: string
}

export class SideNav extends React.Component<ISideNavProps, any> {
  navWithRouter = withRouter(({ history }) => {
    return (
      <Nav
        groups={[
          {
            links: [
              {
                name: "Home",
                url: "/",
                key: "/",
              },
              {
                name: "Login",
                url: "/login",
                key: "key2",
              },
              {
                name: "Logout",
                url: "/logout",
                key: "/logout",
              },
              {
                name: "Wishlist",
                url: "/wishlist",
                key: "key4",
              },
              {
                name: "Employees",
                url: "/employees",
                key: "/employees",
              },
            ],
          },
        ]}
        onLinkClick={(ev: React.MouseEvent<HTMLElement>, item?: INavLink) => {
            ev.preventDefault();
            if (item && item.key) {
            history.push(item.key)
          }
        }}
        selectedKey={history.location.pathname}
      />
    )
  })

  render() {
    return (
      <div className={this.props.className}>
        <this.navWithRouter />
      </div>
    )
  }
}
