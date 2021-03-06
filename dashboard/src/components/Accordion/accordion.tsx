import * as React from 'react';
import Panel from './accordionPanel';

interface AccordionItem {
    title: React.ReactNode;
    content: React.ReactNode;
}

interface AccordionState {
    activeTab: number;
}

interface Props {
    items: Array<AccordionItem>;
    duration: number;
    multiple: boolean;
}

class Accordion extends React.Component<Props> {
    public state: AccordionState = {
        activeTab: -1
    };

    public activatePanel = (index: number): void => {
        if (!this.props.multiple) {
            this.setState((prev: AccordionState) => ({
                activeTab: prev.activeTab === index ? -1 : index
            }));
        }
    }

    public render(): React.ReactNode {
        const { activeTab } = this.state;
        const { items, duration, multiple } = this.props;

        return Array.isArray(items) && items.length
            ? items.map(({ title, content }, index) => (
                <div className="w-full overflow-hidden rounded" role="tablist" key={index}>
                    <Panel
                        key={index}
                        title={title}
                        index={index}
                        duration={duration}
                        multiple={multiple}
                        activeTab={activeTab}
                        activatePanel={this.activatePanel}
                    >
                        {content}
                    </Panel>
                </div>
            ))
            : '';
    }
}

export { Accordion };
