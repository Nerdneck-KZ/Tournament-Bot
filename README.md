
# Installation
`npm install`

# Setup
In the `.env` file specify your DISCORD_TOKEN, ROLE_NAME, and TOURNAMENT_CHANNEL_NAME.

# Running
`node -r dotenv/config bot.js`

# Usage 
* `?start` - Starts a heat. Everyone who reacts to the message will get the role.
 * Note that on the heat start it will remove the role from all users.

* `?end` - Ends the heat. This will remove all the role from all users

* `?clear` - Removes the role from all the users with it.
