import * as React from "react"
import classNames from "classnames"
import { Link } from "react-router-dom"

interface Props {
    className: string
}

export const LayoutLeftNav: React.SFC<Props> = ({className="", children=undefined}) => {

    return (
        <header className={className}>
            {children}
        </header>
    )
}

interface LinkProps {
    readonly href: string
    readonly children: any
    readonly isPrimary?: boolean
  }

  export function LayoutLeftNavLink({
    children = undefined,
    href = "/",
    isPrimary = false,
  }: LinkProps) {
    return(
    <div>
            <Link to={href}>{children}</Link>
    </div>
    )
  }