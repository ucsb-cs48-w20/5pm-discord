import React from "react"
import '../../assets/css/main.css';
import '../../styles/tailwind.css';
import '../Red3DBtn/index';
import {Button} from "../Red3DBtn";
import { Tabs } from "../Tabs/tabs";
import { Accordion } from "../Accordion/accordion";
import StickyFooter from "react-sticky-footer";

const AdminCommands = [
    {
        title: '?ban [user]',
        content: '‎‎‏‏‎‎‏‏‎Ban a user (admins only)'

    },
    {
        title: '?kick [user]',
        content: 'Kick a user (admins only)'
    },
    {
        title: '?mute [user]',
        content: 'Mute a user (admins only)'
    },
    {
        title: '?unmute [user]',
        content: 'Unmute a user (admins only)'
    },
    {
        title: '?tempmute [user]',
        content: 'Temporarily mute a user (admins only)'
    },
    {
        title: '?purge [number of messages]',
        content: 'Purge a channel (admins only)'
    },
    {
        title: '?filter [word1] [word2]',
        content: 'Set banned words to be automatically deleted'
    },
    {
        title: '?filter',
        content: 'Disable the filter'
    }
];
const UtilityCommands = [
    {
        title: '?assign +[roleName]',
        content: '‎‎‏‏‎‎‏‏‎Add a specified role'

    },
    {
        title: '?assign -[roleName]',
        content: '‏‏‎‎‏‏‎Remove a specified role'
    }
];
const MusicCommands = [
    {
        title: '?add [Youtube URL]',
        content: 'Add a valid youtube link to the queue'

    },
    {
        title: '?queue',
        content: '‎‎‏‏‎‎‏‏‎Shows the current queue of songs'

    },
    {
        title: '?play',
        content: 'Play the music queue'

    },
    {
        title: '?pause',
        content: 'Pause the music queue'
    },
    {
        title: '?resume',
        content: 'Resume the music queue'
    },
    {
        title: '?skip',
        content: 'Skip the playing song'
    }
];
const MiscCommands = [
    {
        title: '?poll [question] [option1] [option2]',
        content: '‎‎‏‏‎‎‏‏‎Create a multiple choice poll with provided options (Up to 24)'

    },
    {
        title: '?poll [question]',
        content: 'Create a binary poll'
    },
    {
        title: '?afk [reason]',
        content: 'Set afk status with a reason'
    }
];

const items = AdminCommands.map(({ title, content }) => ({
    title: <h2>{title}</h2>,
    content: <p>{content}</p>
}));

const Content : React.FC = () => {
    return (
        <>
            <div className="content">
                <div className = "grid grid-cols-12 gap-3">
                        <div className="col-start-3 col-span-3 text-center">
                            <h1 className="text-6xl font-sans text-center pb-4">Meet Ora.</h1>
                            <Button onClick={handleInvite} children={"Invite me!"} />
                            <div className="p-4"/>
                            <hr/>
                        </div>
                        <div className="col-span-6">
                            <p className="text-2xl font-body text-center pl-20 pt-12 pr-16">Ora is the most versatile and easy to use bot for your discord server. Our bot provides a wide variety of features and is constantly being improved. If you need a music bot, moderation bot or want to browse twitter, Ora is the bot for you.</p>
                            <p className="text-xl font-body text-center pl-20 pt-8 pr-16">Ora was created by Tanay, Max, Ron, Patrick and Arjun</p>
                        </div>
                </div>
                <br/>
                <br/>
                <div className="col-span-4 text-center">
                    <div className="grid grid-cols-4">
                        <div className="col-start-2">
                        <Button onClick={handleRepo} children={"Source Code"} />
                        </div>
                        <div className="col-span-1">
                        <Button onClick={handleHelp} children={"Help Desk"} />
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="grid grid-cols-6">
                    <hr className="col-start-2 col-span-4"/>
                    </div>
                </div>
                <Tabs>
                    <div className = "grid grid-cols-10 text-center pt-32">
                    {/* Group of tabs */}
                        <div className="col-span-3">
                        </div>
                        <div className="col-span-1">
                            <Tabs.Tab label="a">Admin</Tabs.Tab>
                        </div>
                        <div className="col-span-1">
                            <Tabs.Tab label="b">Utility</Tabs.Tab>
                        </div>
                        <div className="col-span-1">
                            <Tabs.Tab label="c">Music</Tabs.Tab>
                        </div>
                        <div className="col-span-1">
                            <Tabs.Tab label="d">Misc</Tabs.Tab>
                        </div>
                        <div className="col-span-3">
                        </div>
                    </div>
                    <br/>
                    <div className = "grid grid-cols-10">
                        <div className="col-span-2"> </div>
                        <div className="col-span-6 bg-gray-300 border border-gray-700 rounded">
                            <Tabs.Panel label="a">
                                    <div className="font-body text-center">
                                        <Accordion items={AdminCommands} duration={300} multiple={true} />
                                    </div>
                            </Tabs.Panel>
                            <Tabs.Panel label="b">
                                <div className="font-body text-center">
                                    <Accordion items={UtilityCommands} duration={300} multiple={true} />
                                </div>
                            </Tabs.Panel>
                            <Tabs.Panel label="c">
                                <div className="font-body text-center">
                                    <Accordion items={MusicCommands} duration={300} multiple={true} />
                                </div>
                            </Tabs.Panel>
                            <Tabs.Panel label="d">
                                <div className="font-body text-center">
                                    <Accordion items={MiscCommands} duration={300} multiple={true} />
                                </div>
                            </Tabs.Panel>
                        </div>
                        <div className="col-span-2"> </div>
                    </div>
                </Tabs>
            </div>
            <StickyFooter
                bottomThreshold={50}
                normalStyles={{
                    backgroundColor: "rgba(122,1,0,0.95)",
                    padding: "2rem",
                    textAlign:"center"
                }}
                stickyStyles={{
                    backgroundColor: "rgba(122,22,18,0.98)",
                    padding: "0.75rem",
                    width:"100%",
                    textAlign:"center"
                }}
            >
                <Button onClick={handleInvite} children={"Dashboard"} />
            </StickyFooter>
        </>
    )
};
function handleInvite ()  {
    window.open('https://discordapp.com/api/oauth2/authorize?client_id=667934269569630228&permissions=8&scope=bot')
}
function handleRepo ()  {
    window.open('https://github.com/ucsb-cs48-w20/5pm-discord')
}
function handleHelp ()  {
    window.open('https://discord.gg/u4k9tCk')
}
export default Content;

