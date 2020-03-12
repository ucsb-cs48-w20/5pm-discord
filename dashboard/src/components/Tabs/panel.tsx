import * as React from "react"
import { TabsContext } from "./tabs"


export interface IPanelProps {
    /**
     * Unique identifier for this tab.
     */
    label: string
}

/**
 * Individual panel component.
 */
export const Panel: React.FC<IPanelProps> = props => {
    // @ts-ignore
    const { activeTab } = React.useContext(TabsContext)
    return activeTab === props.label ? <div>{props.children}</div> : null
}
