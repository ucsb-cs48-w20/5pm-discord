## 5pm-discord

## Project Summary

Does your Discord Server suck? This bot makes it a whole better. We offer a suite of moderation tools to protect your server from trolls and goblins.

### Additional Info
This Discord bot is targeted at Discord powerusers and moderators seeking ways to ease moderation and/or add some fun commands to the server. The main functionality of the bot is the suite of moderation tools which automate existing Discord functionality or add new tools entirely.

## Installation

### Prerequisites
NodeJS, a Discord Account, and Discord itself.

### Dependencies
NodeJS, DiscordJS.

### Installation Steps
Clone this repository (Branch: Master). Go to https://discordapp.com/developers/applications/ and create an application. This will provide a bot token you must place into a token.json file in the src directory. The file must be formatted as follows:

`{
"value":"Insert Token Here"
}`

You can then run this application with `node index.js`

## Functionality

Once the bot is live on your server you can use the following commands:

| Commands | Author | Description |   
|----------|--------|-------|
| ?afk "reason" | Tanay | Set afk status so that Users are notified that you are afk when pinged. |
| ?purge integer | Tanay | Delete the specified amount of messages sent in the last two weeks |
| ?poll "question" "option1" "option2" etc. | Tanay | Create a multiple choice poll with provided options |
| ?poll "question" | Tanay | Create a binary poll |
| ?kick @user "reason" | Tanay | Kick a user for a provided reason |
| ?filter "word" "word2" etc. | Max | Automatically delete messages that contain any filtered words sent after the filter is enabled. |
| ?filter | Max | Disables the filter |
| ?tempmute "time" | Patrick | Temporarily mutes a user for a specified amount of time |
| ?mute @user | Patrick | Mutes a specified user |
| ?unmute @user | Patrick | Unmutes a specified user |
| ?assign +RoleName | Ron | Users can add a role to their profile |
| ?assign -RoleName | Ron | Users can remove a role from their profile|
| ?ban @user "reason" | Arjun | Ban a user for a provided reason |

## Known Problems
The filter command has no memory of previous arguments, so the only way to add words to the current filter is by calling it again with the same arguments plus the ones to be added.

