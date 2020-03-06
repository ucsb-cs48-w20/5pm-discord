import React from "react"
import '../../assets/css/main.css'
import '../../styles/tailwind.css';
import {TabsContext} from "./tabs";

export interface ITabProps {
    label: string
}

export const Tab: React.FC<ITabProps> = props => {
    // @ts-ignore
    const { setActiveTab } = React.useContext(TabsContext)
    return(
        <div>
            <button className="tab lg:mx-3 float-left mx-2 px-1 text-base md:text-xl md:h-12 md:w-20 lg:text-2xl lg:h-16 lg:w-24 xl:text-3xl xl:h-16 xl:w-32" onClick={() => setActiveTab(props.label)}>
                {props.children}
            </button>
        </div>
    )
}
