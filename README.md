## Token Bot
A Discord bot to display multiple crypto options via its name. Once configured the bot will set it's nickname to display the values. 

### Installation
1) Clone repo 
2) Navigate your terminal to the bots director and run `npm install` to install dependencies
3) Rename `.env-sample` to `.env`

### Config 
To comment or uncomment, place or remove the hash `#` infront of the enviromental variable

- `BOT_TOKEN` - The API token for your Discord Bot
- `BOT_ACTIVITY` - Will display as your bots "Watching" activity; ie "Watching Liquidity"
- `UPDATE_INT` - How often in minutes the bot will refresh itself
- `DISP_DESC` - How many decimals to round to
- `DISP_COMMA` - If the bot should display commas; ie 1,000,000. To disable simply comment this out; setting to false will not work as ENV varialbes are not bool values
- `DISP_DOLLAR` - If the bot should display a dollar sign; ie $1. To disable simply comment this out; setting to false will not work as ENV varialbes are not bool values
- `GUILD` - Your Discord Server's ID. If left blank the bot will loop through all the Guilds it is in; use this option for running the bot on multiple servers.
- `ADDRESS` - The contract address to get info from.
- `USE_CASE` - What function the bot should run.

### Chain Config
- `CHAIN_ID` - ID of network (ie; Ethereum) to use. Only needed for DexGuru Cases 
```
Ethereum = 1
BSC = 56
Polygon = 137
Avalanche = 43114
Fantom = 250
Arbitrum = 42161
CELO = 42220
```
### API Configs
- `ETHERS_END_POINT` - infura.io API endpoint. Only needed for Uniswap cases
- `DEX_GURU` - developers.dex.guru API key. Only needed for DexGuru cases
- `ETHPLORER` - Ethplorer API Key. Only needed for Ethplorer cases

### Cases
- `UNI_PRICE` - Uniswap pair price. Calculated by (Token per WETH) * $ETH_PRICE. Some cases is more accurate than DexGugu
- `GURU_PRICE` - Price per DexGuru; works for Pairs and Tokens
- `GURU_LIQUID` - Liquidity per DexGuru; works for Pairs and Tokens
- `GURU_VOLUME` - 24 hour volume per DexGuru; works for Pairs and Tokens
- `HOLDER_COUNT` - Holder Count per Etherplorer
- `ETHP_PRICE` - Price per Etherplorer; works for Tokens
- `ETHP_VOLUME` - Volume per Etherplorer; works for Tokens
- `MARKETCAP` - Marketcap Per Etherplorer; works for Tokens
- `SUPPLY` - Token supply per Etherplorer
- `PANCAKE_PRICE` - Price for Pancake Swap pair

### Running Your Bot
You can run your bot locally on your machine buy running `npm start` in the bots directory.
You can also run `npm run dev` (which requires nodemon package). This will automatically restart the bot service if any files are changed.

To run your bot remotly you will need it hosted on a server that supports it such as [Vultr](https://www.vultr.com/?ref=8430432)

### Discord Bot Setup
- To create new Discord bot head to [discord.com/developers](https://discord.com/developers), login and click **New Application**
- Enter the desired name for the bot and click Create
- Click **Bot** under **Settings* in the left panel
- Click **Add Bot**
- You will be redirected to your bots Settings. Under **Token** click **Copy** this is used as BOT_TOKEN in the **.env** file
- Under **Settings** click OAuth. click **URL Generator**
- Under **Scopes** select **bot** 
- **Bot Permissions** should appear. Select **Change Nickname**
- **Generated URL** can now be used to invite the bot to your server.

