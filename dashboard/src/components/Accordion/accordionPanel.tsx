import * as React from 'react';
import { findDOMNode } from 'react-dom';
import '../../styles/tailwind.css'
import '../../assets/css/main.css'
interface Props {
    index: number;
    title: React.ReactNode;
    duration: number;
    multiple: boolean;
    children?: React.ReactNode;
    activeTab: number;
    activatePanel(index: number): void;
}

interface PanelState {
    height: number;
    isActive: boolean;
}

interface ExtendedElement extends Element {
    querySelector(selector: string): HTMLElement;
}

class Panel extends React.Component<Props> {

    public state: PanelState = {
        height: 0,
        isActive: false,
    };

    public componentDidMount(): void {
        setTimeout(() => {
            const el = findDOMNode(this);
            const height = (el as ExtendedElement).querySelector('.font-body.scrolling-touch.ease-in-out').scrollHeight;

            this.setState({ height });
        }, this.props.duration || 300);
    }

    public render(): React.ReactNode {
        const { index, title, multiple, children, activeTab, activatePanel } = this.props;

        const isActive = multiple ? this.state.isActive : activeTab === index;

        const innerStyle = {
            height: `${isActive ? this.state.height : 0}px`
        };

        var btnClass, panelClass, rotateSVG;
        if (isActive) btnClass = 'outline-none accordion focus:accordion hover:accordion text-md lg:text-2xl';
        else btnClass = 'outline-none inactiveAccordion hover:inactiveAccordion lg:text-2xl';

        if (isActive) panelClass = 'panel lg:text-2xl lg:transform lg:translate-x-8';
        else panelClass = 'inactivePanel lg:text-2xl lg:transform lg:translate-x-4';

        if(isActive) rotateSVG = 'plusRotate rotate-45 duration-500 h-4 lg:h-6';
        else rotateSVG = 'plusRotateBack rotate-90 duration-500 h-4 lg:h-6';

        return (
            <div className="font-body" role="tabpanel" aria-expanded={isActive}>
                <button
                    role="tab"
                    className={btnClass}
                    onClick={_ => {
                        multiple ? this.setState({ isActive: !this.state.isActive }) : activatePanel(index);
                    }}
                >
                    {title}<svg height="20pt" viewBox="0 0 512 512" width="20pt" xmlns="http://www.w3.org/2000/svg" className={rotateSVG}><path d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.640625 74.980469-181.019531s-26.628906-132.667969-74.980469-181.019531zm-181.019531 397.019531c-119.101562 0-216-96.898438-216-216s96.898438-216 216-216 216 96.898438 216 216-96.898438 216-216 216zm20-236.019531h90v40h-90v90h-40v-90h-90v-40h90v-90h40zm0 0"/></svg>
                </button>
                <div style={innerStyle} className="font-body scrolling-touch ease-in-out duration-500" aria-hidden={!isActive}>
                    <div className={panelClass}>{children}</div>
                </div>
            </div>
        );
    }
}

export default Panel;
