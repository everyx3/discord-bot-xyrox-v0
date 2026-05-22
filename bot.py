import discord
from discord.ext import commands
from dotenv import load_dotenv
import os
import asyncio
from datetime import timedelta

# Load environment variables
load_dotenv()

TOKEN = os.getenv('DISCORD_TOKEN')

if not TOKEN:
    print("Error: DISCORD_TOKEN not found in .env file")
    exit(1)

# Set up intents
intents = discord.Intents.default()
intents.message_content = True
intents.moderation = True

bot = commands.Bot(command_prefix='!', intents=intents)

# Moderation Commands
@bot.command(name='kick')
@commands.has_permissions(kick_members=True)
async def kick(ctx, member: discord.Member, *, reason=None):
    """Kick a member from the server."""
    try:
        await member.kick(reason=reason)
        embed = discord.Embed(
            title="Member Kicked",
            description=f"{member.mention} has been kicked.",
            color=discord.Color.orange()
        )
        if reason:
            embed.add_field(name="Reason", value=reason)
        embed.set_footer(text=f"Moderator: {ctx.author}")
        await ctx.send(embed=embed)
    except Exception as e:
        await ctx.send(f"Error kicking member: {e}")

@bot.command(name='ban')
@commands.has_permissions(ban_members=True)
async def ban(ctx, member: discord.Member, *, reason=None):
    """Ban a member from the server."""
    try:
        await member.ban(reason=reason)
        embed = discord.Embed(
            title="Member Banned",
            description=f"{member.mention} has been banned.",
            color=discord.Color.red()
        )
        if reason:
            embed.add_field(name="Reason", value=reason)
        embed.set_footer(text=f"Moderator: {ctx.author}")
        await ctx.send(embed=embed)
    except Exception as e:
        await ctx.send(f"Error banning member: {e}")

@bot.command(name='unban')
@commands.has_permissions(ban_members=True)
async def unban(ctx, user_id: int, *, reason=None):
    """Unban a user by their ID."""
    try:
        user = await bot.fetch_user(user_id)
        await ctx.guild.unban(user, reason=reason)
        embed = discord.Embed(
            title="Member Unbanned",
            description=f"{user.mention} ({user.id}) has been unbanned.",
            color=discord.Color.green()
        )
        if reason:
            embed.add_field(name="Reason", value=reason)
        embed.set_footer(text=f"Moderator: {ctx.author}")
        await ctx.send(embed=embed)
    except Exception as e:
        await ctx.send(f"Error unbanning member: {e}")

@bot.command(name='mute')
@commands.has_permissions(moderate_members=True)
async def mute(ctx, member: discord.Member, duration: int, *, reason=None):
    """Timeout a member for a specified duration (in seconds)."""
    try:
        until = discord.utils.utcnow() + timedelta(seconds=duration)
        await member.timeout(until, reason=reason)
        embed = discord.Embed(
            title="Member Muted",
            description=f"{member.mention} has been muted for {duration} seconds.",
            color=discord.Color.blue()
        )
        if reason:
            embed.add_field(name="Reason", value=reason)
        embed.set_footer(text=f"Moderator: {ctx.author}")
        await ctx.send(embed=embed)
    except Exception as e:
        await ctx.send(f"Error muting member: {e}")

@bot.command(name='unmute')
@commands.has_permissions(moderate_members=True)
async def unmute(ctx, member: discord.Member, *, reason=None):
    """Remove timeout from a member."""
    try:
        await member.timeout(None, reason=reason)
        embed = discord.Embed(
            title="Member Unmuted",
            description=f"{member.mention} has been unmuted.",
            color=discord.Color.green()
        )
        if reason:
            embed.add_field(name="Reason", value=reason)
        embed.set_footer(text=f"Moderator: {ctx.author}")
        await ctx.send(embed=embed)
    except Exception as e:
        await ctx.send(f"Error unmuting member: {e}")

@bot.command(name='purge')
@commands.has_permissions(manage_messages=True)
async def purge(ctx, amount: int):
    """Delete a specified number of messages."""
    if amount > 100:
        await ctx.send("Cannot delete more than 100 messages at once.")
        return
    
    try:
        deleted = await ctx.channel.purge(limit=amount + 1)
        embed = discord.Embed(
            title="Messages Purged",
            description=f"Deleted {len(deleted) - 1} messages.",
            color=discord.Color.blue()
        )
        embed.set_footer(text=f"Moderator: {ctx.author}")
        msg = await ctx.send(embed=embed)
        await asyncio.sleep(5)
        await msg.delete()
    except Exception as e:
        await ctx.send(f"Error purging messages: {e}", delete_after=5)

@bot.command(name='warn')
@commands.has_permissions(moderate_members=True)
async def warn(ctx, member: discord.Member, *, reason=None):
    """Warn a member."""
    embed = discord.Embed(
        title="Member Warned",
        description=f"{member.mention} has been warned.",
        color=discord.Color.yellow()
    )
    if reason:
        embed.add_field(name="Reason", value=reason)
    embed.set_footer(text=f"Moderator: {ctx.author}")
    await ctx.send(embed=embed)
    try:
        await member.send(f"You have been warned in **{ctx.guild.name}**.\nReason: {reason or 'No reason provided'}")
    except:
        pass

# Utility Commands
@bot.command(name='userinfo')
async def userinfo(ctx, member: discord.Member = None):
    """Get information about a user."""
    if member is None:
        member = ctx.author
    
    embed = discord.Embed(title=f"User Info: {member.name}", color=member.color)
    embed.set_thumbnail(url=member.display_avatar.url)
    embed.add_field(name="ID", value=member.id, inline=True)
    embed.add_field(name="Joined Server", value=member.joined_at.strftime("%Y-%m-%d"), inline=True)
    embed.add_field(name="Account Created", value=member.created_at.strftime("%Y-%m-%d"), inline=True)
    embed.add_field(name="Roles", value=", ".join([r.name for r in member.roles[1:]]) or "No roles", inline=False)
    embed.set_footer(text=f"Requested by {ctx.author}")
    await ctx.send(embed=embed)

@bot.command(name='serverinfo')
async def serverinfo(ctx):
    """Get information about the server."""
    guild = ctx.guild
    embed = discord.Embed(title=f"Server Info: {guild.name}", color=discord.Color.blue())
    embed.set_thumbnail(url=guild.icon.url if guild.icon else None)
    embed.add_field(name="Owner", value=guild.owner.mention, inline=True)
    embed.add_field(name="Members", value=guild.member_count, inline=True)
    embed.add_field(name="Created", value=guild.created_at.strftime("%Y-%m-%d"), inline=True)
    embed.add_field(name="Channels", value=len(guild.channels), inline=True)
    embed.add_field(name="Roles", value=len(guild.roles), inline=True)
    embed.set_footer(text=f"Server ID: {guild.id}")
    await ctx.send(embed=embed)

@bot.command(name='avatar')
async def avatar(ctx, member: discord.Member = None):
    """Get a user's avatar."""
    if member is None:
        member = ctx.author
    
    embed = discord.Embed(title=f"{member.name}'s Avatar", color=member.color)
    embed.set_image(url=member.display_avatar.url)
    await ctx.send(embed=embed)

@bot.command(name='ping')
async def ping(ctx):
    """Check bot latency."""
    latency = round(bot.latency * 1000)
    embed = discord.Embed(
        title="Pong!",
        description=f"Bot latency: **{latency}ms**",
        color=discord.Color.green()
    )
    await ctx.send(embed=embed)

@bot.command(name='helpmod')
async def helpmod(ctx):
    """Show available moderation and utility commands."""
    embed = discord.Embed(title="Bot Commands", color=discord.Color.blue())
    
    mod_commands = "**Moderation:**\n"
    mod_commands += "`!kick @user [reason]` - Kick a member\n"
    mod_commands += "`!ban @user [reason]` - Ban a member\n"
    mod_commands += "`!unban <user_id> [reason]` - Unban a user\n"
    mod_commands += "`!mute @user <seconds> [reason]` - Timeout a member\n"
    mod_commands += "`!unmute @user [reason]` - Remove timeout\n"
    mod_commands += "`!purge <amount>` - Delete messages (max 100)\n"
    mod_commands += "`!warn @user [reason]` - Warn a member\n"
    
    util_commands = "\n**Utility:**\n"
    util_commands += "`!userinfo [@user]` - Get user information\n"
    util_commands += "`!serverinfo` - Get server information\n"
    util_commands += "`!avatar [@user]` - Get user avatar\n"
    util_commands += "`!ping` - Check bot latency\n"
    util_commands += "`!helpmod` - Show this help message\n"
    
    embed.add_field(name="Commands", value=mod_commands + util_commands, inline=False)
    embed.set_footer(text=f"Prefix: ! | Requested by {ctx.author}")
    await ctx.send(embed=embed)

@bot.event
async def on_ready():
    print(f'{bot.user} has connected to Discord!')
    print(f'Logged in as {bot.user.name} (ID: {bot.user.id})')

bot.run(TOKEN)
