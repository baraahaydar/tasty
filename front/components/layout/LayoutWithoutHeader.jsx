import { Fragment } from "react";

export default function LayoutWithoutHeader({children}) {
    return (
       <Fragment>
           {children}
           </Fragment>
    )
}