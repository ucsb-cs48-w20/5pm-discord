import React from "react"
import '../../assets/css/main.css'
import '../../styles/tailwind.css';
import {ITabProps, Tab} from "./tab";
import {IPanelProps, Panel} from "./panel";

interface ITabsComposition {
    Tab: React.FC<ITabProps>;
    Panel: React.FC<IPanelProps>;
}

interface ITabsContext {
    activeTab: string
    setActiveTab: (label: string) => void
}

export const TabsContext = React.createContext<ITabsContext | undefined>(
    undefined
)

const Tabs: React.FC & ITabsComposition = props => {
    const[activeTab, setActiveTab] = React.useState("a")
    return <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        {props.children}
    </TabsContext.Provider>
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export { Tabs };
