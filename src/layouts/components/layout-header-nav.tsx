import * as React from "react"
import { Link } from "react-router-dom"

export const LayoutHeaderNav: React.SFC<{}> = ({ children = undefined }) => {
  return <nav>{children}</nav>
}

interface Props {
  readonly href: string
  readonly children: any
  readonly isPrimary?: boolean
}

export function LayoutHeaderNavLink({
  children = undefined,
  href = "/",
  isPrimary = false,
}: Props) {
  return <Link to={href}>{children}</Link>
}
