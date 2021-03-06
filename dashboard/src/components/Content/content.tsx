import React from "react"
import '../../assets/css/main.css';
import '../../styles/tailwind.css';
import '../Red3DBtn/button';
import {Button} from "../Red3DBtn/button";
import { Tabs } from "../Tabs/tabs";
import { Accordion } from "../Accordion/accordion";

const AdminCommands = [
    {
        title: '?ban [user]',
        content: '‎‎‏‏‎‎‏‏‎Ban a user (admins only)'

    },
    {
        title: '?unban [userId] "reason"',
        content: 'Unban a user (admins only)'
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
        title: '?tempmute [user] [time]',
        content: 'Temporarily mute a user (admins only)'
    },
    {
        title: '?purge [number of messages]',
        content: 'Purge a channel (admins only)'
    },
    {
        title: '?filter "word1" "word2"',
        content: 'Set banned words to be automatically deleted (admins only)'
    },
    {
        title: '?filter',
        content: 'Disable the filter (admins only)'
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
    },
    {
        title: '?twitter followUser "twitterHandle"',
        content: 'Follows the twitter user and posts future tweet to the discord server'
    },
    {
        title: '?twitter postTweet "tweet"',
        content: 'Posts specified tweet to twitter account'
    },
    {
        title: '?twitter getLastTweet "twitterHandle"',
        content: 'Posts the last tweet by the twitter user to the discord server'
    },
    {
        title: '?weather "city name"',
        content: 'Posts current and forecast of weather at specified city'
    }
];
const MusicCommands = [
    {
        title: '?queue',
        content: '‎‎‏‏‎‎‏‏‎Shows the current queue of songs'
    },
    {
        title: '?play "song query"',
        content: 'Search youtube for a query and you can choose from the top 10 results'
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
        title: '?clear',
        content: 'Clear the music queue'
    },
    {
        title: '?volume',
        content: 'Set the volume of the songs'
    }
];
const MiscCommands = [
    {
        title: '?poll [question] [option1] [option2]',
        content: '‎‎‏‏‎‎‏‏‎Create a multiple choice poll with the provided options (Up to 24)'

    },
    {
        title: '?poll [question]',
        content: 'Create a binary poll'
    },
    {
        title: '?joke',
        content: 'Ask for a joke'
    },
    {
        title: '?afk [reason]',
        content: 'Set afk status with a reason'
    },
    {
        title: '?hm "new"',
        content: 'Starts a new game of hangman'
    },
    {
        title: '?hm [guess]',
        content: 'Guess a letter for the open game of hangman'
    },
    {
        title: '?rps',
        content: 'Starts a rock paper scissors game'
    },
    {
        title: '?jeopardy',
        content: 'Starts a round of Jeopardy'
    },
    {
        title: '?jeopardy "rules"',
        content: 'Display Jeopardy info and all other Jeopardy-specific commands'
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
                    <div className="text-center col-start-2 col-span-10 lg:col-start-3 lg:col-span-3">
                        <h1 className="font-body text-3xl md:text-3xl lg:text-6xl">Meet Ora.</h1>
                        <Button onClick={handleInvite} children={"Invite me!"} />
                        <div className="p-4"/>
                        <hr/>
                    </div>
                    <div className="row-start-2 col-span-12 lg:col-start-7 lg:col-span-5 lg:row-start-1">
                        <p className="text-lg font-body text-center pl-20 pt-12 pr-16 md:text-xl lg:text-xl">Ora is the most versatile and easy to use bot for your discord server. Our bot provides a wide variety of features and is constantly being improved. If you need a music bot, moderation bot or want to browse twitter, Ora is the bot for you.</p>
                        <p className="text-base font-body text-center pl-20 pt-8 pr-16 md:text-lg lg:text-lg">Ora was created by Tanay, Max, Ron, Patrick and Arjun</p>
                    </div>
                </div>
                <br/>
                <div className="col-span-4 text-center">
                    <div className="grid grid-cols-4">
                        <div className="col-start-2">
                            <Button onClick={handleRepo} children={"Github"} />
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
                    <div className = "grid grid-cols-12 text-center pt-32">
                        {/* Group of tabs */}
                        <div className="col-start-3 col-span-9 sm:col-start-4 lg:col-start-3">
                            <div className="lg:grid lg:grid-cols-7">
                                <div className="lg:col-start-2 lg:col-span-1">
                                    <Tabs.Tab label="a">Admin</Tabs.Tab>
                                </div>
                                <div className="lg:col-span-1">
                                    <Tabs.Tab label="b">Utility</Tabs.Tab>
                                </div>
                                <div className="lg:col-span-1">
                                    <Tabs.Tab label="c">Music</Tabs.Tab>
                                </div>
                                <div className="lg:col-span-1">
                                    <Tabs.Tab label="d">Misc</Tabs.Tab>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className = "grid grid-cols-10">
                        <div className="col-span-2"> </div>
                        <div className="col-span-6 bg-gray-300 border border-gray-700 rounded pb-2">
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
            Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
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

