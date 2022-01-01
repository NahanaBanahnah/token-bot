const { ethers } = require('ethers')
const { ChainId, Token, WETH, Fetcher, Route } = require('@uniswap/sdk')
const axios = require('axios')

/**
 * @param { Int } DISP_DESC - how many decimals to round to
 */
const DISP_DESC = process.env.DISP_DESC ? process.env.DISP_DESC : 9

const EXPORTS = {
	/**
	 * @summary USE_CASE = UNI_PRICE
	 * @requires process.env.ADDRESS - token address
	 */

	uniswapPrice: async () => {
		//get our token decimals
		const RSP = await Fetcher.fetchTokenData(
			ChainId.MAINNET,
			process.env.ADDRESS
		)

		// gets our token
		const TOKEN = new Token(
			ChainId.MAINNET,
			process.env.ADDRESS,
			RSP.decimals
		)
		// creates a pair
		const PAIR = await Fetcher.fetchPairData(
			TOKEN,
			WETH[TOKEN.chainId],
			PROVIDER
		)

		// creates the route. basically says we get X tokens for Y eth
		const route = new Route([PAIR], WETH[TOKEN.chainId])
		const ROUTE_MID = route.midPrice.invert().toSignificant(6)

		//get the current ETH price
		const ETH = await module.exports.ethPrice()

		//math here is ETH price x routes mid token amount.
		const PRICE = ETH * ROUTE_MID

		return formatPrice(PRICE)
	},

	/**
	 * =================================================
	 * @summary Dex Guru API Functions
	 * @requires process.env.DEX_GURU - dex.guru API key
	 * sign up at - https://developers.dex.guru/
	 * =================================================
	 */

	/**
	 * @summary USE_CASE = GURU_PRICE - get token price via Dex Guru
	 * @summary USE_CASE = GURU_LIQUID - get Liquidity via Dex Guru
	 * @summary USE_CASE = GURU_VOLUME - get 24h Volume via Dex Guru
	 *
	 * @requires process.env.CHAIN_ID - chain (network) Token is on; eg ETH
	 * @requires process.env.ADDRESS - token address
	 * @requires process.env.DEX_GURU - Dex Guru API Key
	 * @requires process.env.DISP_DESC - How many decimals to round to
	 */

	//GURU PRICE
	guruPrice: async () => {
		const RSP = await axios({
			method: 'get',
			url: `https://api.dev.dex.guru/v1/chain/${process.env.CHAIN_ID}/tokens/${process.env.ADDRESS}/market`,
			headers: { 'api-key': process.env.DEX_GURU },
		})

		return formatPrice(RSP.data.price_usd)
	},

	//GURU LIQUID
	guruLiquid: async () => {
		const RSP = await axios({
			method: 'get',
			url: `https://api.dev.dex.guru/v1/chain/${process.env.CHAIN_ID}/tokens/${process.env.ADDRESS}/market`,
			headers: { 'api-key': process.env.DEX_GURU },
		})

		return formatPrice(RSP.data.liquidity_usd)
	},

	//GURU VOLUME
	guruVolume: async () => {
		const RSP = await axios({
			method: 'get',
			url: `https://api.dev.dex.guru/v1/chain/${process.env.CHAIN_ID}/tokens/${process.env.ADDRESS}/market`,
			headers: { 'api-key': process.env.DEX_GURU },
		})

		return formatPrice(RSP.data.volume_24h_usd)
	},

	/**
	 * @summary Helper ETH function that gets current price of ETH
	 * @requires process.env.DEX_GURU - dex.guru API key
	 */

	ethPrice: async () => {
		const ETH = await axios({
			method: 'get',
			url: `https://api.dev.dex.guru/v1/chain/1/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/market`,
			headers: { 'api-key': process.env.DEX_GURU },
		})

		return ETH.data.price_usd
	},

	/**
	 * @summary USE_CASE = ETHP_PRICE - get the current price
	 * @summary USE_CASE = ETHP_VOLUME - get the current volume
	 * @summary USE_CASE = HOLDER_COUNT - get number of holders
	 * @summary USE_CASE = MARKETCAP - get the current marketcap
	 * @summary USE_CASE = SUPPLY - get the current marketcap
	 *
	 * @requires process.env.ADDRESS - token address
	 * @requires process.env.ETHPLORER - EthPlorer API Key
	 * API Info https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API
	 */

	ethPrice: async () => {
		const RSP = await axios({
			method: 'get',
			url: `https://api.ethplorer.io/getTokenInfo/${process.env.ADDRESS}?apiKey=${process.env.ETHPLORER}`,
		})
		return formatPrice(RSP.data.price.rate)
	},

	ethVolume: async () => {
		const RSP = await axios({
			method: 'get',
			url: `https://api.ethplorer.io/getTokenInfo/${process.env.ADDRESS}?apiKey=${process.env.ETHPLORER}`,
		})
		return formatPrice(RSP.data.price.volume24h)
	},

	holderCount: async () => {
		const RSP = await axios({
			method: 'get',
			url: `https://api.ethplorer.io/getTokenInfo/${process.env.ADDRESS}?apiKey=${process.env.ETHPLORER}`,
		})
		let holders = RSP.data.holdersCount
		if (process.env.DISP_COMMA) {
			holders = new Intl.NumberFormat().format(holders)
		}

		return holders
	},

	marketCap: async () => {
		const RSP = await axios({
			method: 'get',
			url: `https://api.ethplorer.io/getTokenInfo/${process.env.ADDRESS}?apiKey=${process.env.ETHPLORER}`,
		})
		return formatPrice(RSP.data.price.marketCapUsd)
	},

	supply: async () => {
		const RSP = await axios({
			method: 'get',
			url: `https://api.ethplorer.io/getTokenInfo/${process.env.ADDRESS}?apiKey=${process.env.ETHPLORER}`,
		})

		let supply = RSP.data.price.availableSupply
		if (process.env.DISP_COMMA) {
			supply = new Intl.NumberFormat().format(supply)
		}
		return supply
	},

	/**
	 * @summary USE_CASE = PANCAKE_PRICE - price of pancake swap pair
	 *
	 * @requires process.env.ADDRESS - token address
	 */

	pancakePrice: async () => {
		const RSP = await axios({
			method: 'get',
			url: `https://api.pancakeswap.info/api/v2/tokens/${process.env.ADDRESS}`,
		})

		return formatPrice(RSP.data.data.price)
	},
}

/**
 * @requires process.env.ETHERS_END_POINT - infura endpoint for Ethers used in UniSwap API
 *  !! ONLY NEEDED FOR UNISWAP FUNCTIONS !!
 * Sign Up at https://infura.io/
 */

const PROVIDER = new ethers.providers.JsonRpcProvider(
	`https://mainnet.infura.io/v3/${process.env.ETHERS_END_POINT}`
)

/**
 * @summary helper function to format the price / numbers
 *
 * @param {} number
 * @returns formatted number
 */

const formatPrice = number => {
	number = number.toFixed(process.env.DISP_DESC)

	if (process.env.DISP_COMMA) {
		number = new Intl.NumberFormat().format(number)
	}
	if (process.env.DISP_DOLLAR) {
		number = `$${number}`
	}

	return number
}

module.exports = EXPORTS
