# 5pm-discord

> A GitHub bot for Discord

You must have already installed NPM, Git, NodeJS and DiscordJS! You will also need to have a Discord account and have installed Discord.

Clone this repository (Branch: Master). 

Go to https://discordapp.com/developers/applications/ and create an application. This will provide a bot token and you must place into a token.json file in the src directory. The file must be formatted as follows:


`{
"value":"Insert Token Here"
}`


You can then run this application with `node index.js`

Once the bot is live on your server you can use the following commands:

| Commands | Author | Description |   
|----------|--------|-------|
| ?afk "reason" | Tanay | Set afk status so that Users are notified that you are afk when pinged. |
| ?purge integer | Tanay | Delete the specified amount of messages sent in the last two weeks |
| ?poll "question" "option1" "option2" etc. | Tanay | Create a multiple choice poll with provided options |
| ?poll "question" | Tanay | Create a binary poll |
| ?filter "word" "word2" etc. | Max | Automatically delete messages that contain any filtered words sent after the filter is enabled. |
| ?filter | Max | Disables the filter |
| ?tempmute "time" | Patrick | Temporarily mutes a user for a specified amount of time |
| ?assign +RoleName | Ron | Users can add a role to their profile |
| ?assign -RoleName | Ron | Users can remove a role from their profile|
| ?ban "reason" | Arjun | Ban a user for a provided reason |
