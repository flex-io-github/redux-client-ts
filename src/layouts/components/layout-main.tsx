import * as React from "react"
// import '../_styles/Content.css'

interface Props {
  className: string
}
export const LayoutMain: React.SFC<Props> = ({children = undefined}) => {

      return (
        <main>
          <div>
            {children}
          </div>
        </main>
      );

}