# Discord Bot with Moderation and Utility Commands

A Discord bot built with **discord.js** and **TypeScript** featuring comprehensive moderation and utility commands.

## Features

### Moderation Commands

#### Slash Commands (`/`)
- `/kick @user [reason]` - Kick a member from the server
- `/ban @user [reason] [delete_days]` - Ban a member from the server
- `/timeout @user <minutes> [reason]` - Timeout (mute) a member for a specified duration
- `/warn @user [reason]` - Warn a member (sends DM notification)
- `/purge <amount>` - Delete a specified number of messages (1-100)

#### Text Commands (`.`)
- `.kick <@user> [reason]` - Kick a member from the server
- `.ban <@user> [reason]` - Ban a member from the server
- `.timeout <@user> <minutes> [reason]` - Timeout a member for a specified duration
- `.warn <@user> [reason]` - Warn a member (sends DM notification)
- `.purge <amount>` - Delete a specified number of messages (1-100)

### Utility Commands

#### Slash Commands (`/`)
- `/userinfo [@user]` - Get detailed information about a user
- `/serverinfo` - Get detailed information about the server
- `/ping` - Check bot latency (bot and API latency)
- `/help` - Show all available commands

#### Text Commands (`.`)
- `.userinfo [@user]` - Get detailed information about a user
- `.serverinfo` - Get detailed information about the server
- `.ping` - Check bot latency (bot and API latency)
- `.help` - Show all available commands

## Setup Instructions

### 1. Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section and click "Add Bot"
4. Under "Privileged Gateway Intents", enable:
   - Message Content Intent
   - Server Members Intent
5. Copy your bot token

### 2. Invite the Bot to Your Server

1. Go to "OAuth2" > "URL Generator"
2. Select scopes: `bot` and `applications.commands`
3. Select permissions: `Administrator` (or specific permissions you need)
4. Copy the generated URL and open it in your browser
5. Select your server and authorize

### 3. Configure the Bot

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials in the `.env` file:
   ```
   DISCORD_TOKEN=your_actual_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here
   ```

### 4. Install Dependencies

```bash
npm install
```

### 5. Build the TypeScript

```bash
npm run build
```

### 6. Run the Bot

```bash
npm start
```

**Or for development with auto-reload:**

```bash
npm run dev
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

## Command Prefixes

- **Slash Commands**: `/` (register with Discord)
- **Text Commands**: `.` (prefix-based)

## Project Structure

```
src/
├── index.ts              # Main bot entry point
├── commands/             # Slash commands
│   ├── kick.ts
│   ├── ban.ts
│   ├── timeout.ts
│   ├── warn.ts
│   ├── purge.ts
│   ├── userinfo.ts
│   ├── serverinfo.ts
│   ├── ping.ts
│   └── help.ts
├── text-commands/        # Text commands
│   ├── kick.ts
│   ├── ban.ts
│   ├── timeout.ts
│   ├── warn.ts
│   ├── purge.ts
│   ├── userinfo.ts
│   ├── serverinfo.ts
│   ├── ping.ts
│   └── help.ts
└── utils/
    ├── commandLoader.ts  # Loads slash commands
    └── textCommandHandler.ts  # Handles text commands
```

## Notes

- All moderation commands require appropriate permissions
- The `purge` command can only delete up to 100 messages at once
- Members are timed out using Discord's native timeout feature
- Warning messages are sent via DM when possible
- Slash commands are registered to your guild for faster testing
- Both command types (slash and text) work independently

## Technologies Used

- **discord.js** (^14.14.0) - Discord API wrapper
- **TypeScript** (^5.3.3) - Type-safe JavaScript
- **dotenv** (^16.3.1) - Environment variable management
- **Node.js** (^20.10.0) - JavaScript runtime

## License

MIT
