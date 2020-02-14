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
        <div className="tab">
            <button className="outline-none text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-gray-300 hover:bg-gray-400 text-red-600 font-bold sm:h-10 md:h-12 lg:h-16 sm:w-16 md:w-20 lg:w-24 xl:w-32 border border-gray-600 rounded" onClick={() => setActiveTab(props.label)}>
                {props.children}
            </button>
        </div>
    )
}
