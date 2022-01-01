'use strict'

require('dotenv').config()
const { Client, Intents } = require('discord.js')
const { Control } = require('./controller')

const client = new Client({
	intents: [Intents.FLAGS.GUILDS],
})

client.once('ready', async () => {
	console.log('Bot Is Running')

	const BOT = client.user
	let guild_bot

	/**
	 * ===== CATCH IF env variables are not set
	 * @param { String } BOT_ACTIVITY - displays "Watching: XXX".
	 * @param { Int } UPDATE_INT - how often the bot updates.
	 */

	// ===== BOT IS WATCHING:
	const BOT_ACTIVITY = process.env.BOT_ACTIVITY
		? process.env.BOT_ACTIVITY
		: 'ENV NOT SET'

	// ===== HOW OFTEN TO UPDATE
	const UPDATE_INT = process.env.UPDATE_INT ? process.env.UPDATE_INT : 5

	// ===== SET BOT WATCHING ACTIVITY
	client.user.setPresence({
		activities: [{ name: BOT_ACTIVITY, type: 'WATCHING' }],
		status: 'online',
	})

	// ====== RUN THE INTERVAL
	;(async function change() {
		const DISPLAY = await Control(process.env.USE_CASE, {})

		if (process.env.GUILD) {
			const GUILD = client.guilds.cache.get(process.env.GUILD)
			GUILD.members.edit('@me', { nick: DISPLAY })
		} else {
			client.guilds.cache.map(async guild => {
				GUILD.members.edit('@me', { nick: DISPLAY })
			})
		}

		setTimeout(change, UPDATE_INT * 60 * 1000)
	})()
})

client.login(process.env.BOT_TOKEN)
