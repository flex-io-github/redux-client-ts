import * as React from "react"
import classNames from "classnames"

interface Props {
    className: string
}

export const LayoutHeader: React.SFC<Props> = ({className="", children=undefined}) => {

    return (
        <header className={className}>
            {children}
        </header>
    )
}