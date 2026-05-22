# Discord Bot with Moderation and Utility Commands

A Discord bot built with `discord.py` featuring moderation and utility commands.

## Features

### Moderation Commands
- `!kick @user [reason]` - Kick a member from the server
- `!ban @user [reason]` - Ban a member from the server
- `!unban <user_id> [reason]` - Unban a user by their ID
- `!mute @user <seconds> [reason]` - Timeout a member for specified duration
- `!unmute @user [reason]` - Remove timeout from a member
- `!purge <amount>` - Delete a specified number of messages (max 100)
- `!warn @user [reason]` - Warn a member

### Utility Commands
- `!userinfo [@user]` - Get information about a user
- `!serverinfo` - Get information about the server
- `!avatar [@user]` - Get a user's avatar
- `!ping` - Check bot latency
- `!helpmod` - Show all available commands

## Setup Instructions

### 1. Create a Discord Bot
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section and click "Add Bot"
4. Under "Privileged Gateway Intents", enable:
   - Message Content Intent
   - Server Members Intent (if needed)
5. Copy your bot token

### 2. Invite the Bot to Your Server
1. Go to "OAuth2" > "URL Generator"
2. Select scopes: `bot`
3. Select permissions: `Administrator` (or specific permissions you need)
4. Copy the generated URL and open it in your browser
5. Select your server and authorize

### 3. Configure the Bot
1. Replace `your_bot_token_here` in the `.env` file with your actual bot token:
   ```
   DISCORD_TOKEN=your_actual_bot_token_here
   ```

### 4. Install Dependencies
```bash
pip install discord.py python-dotenv
```

### 5. Run the Bot
```bash
python bot.py
```

## Required Permissions

The bot needs the following permissions:
- Kick Members
- Ban Members
- Moderate Members (for timeout/mute)
- Manage Messages (for purge)
- Send Messages
- Embed Links
- Read Message History

## Command Prefix

The default command prefix is `!`

## Notes

- All moderation commands require appropriate permissions
- The `!purge` command can only delete up to 100 messages at once
- Muted members are timed out using Discord's native timeout feature
- Warning messages are sent via DM when possible