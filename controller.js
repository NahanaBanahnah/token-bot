const {
	uniswapPrice,
	guruPrice,
	guruLiquid,
	guruVolume,
	holderCount,
	pancakePrice,
	test,
	ethPrice,
	ethVolume,
	marketCap,
	supply,
} = require('./model')

module.exports = {
	Control: async (action, payload) => {
		switch (action) {
			case 'UNI_PRICE':
				return await uniswapPrice()
				break

			case 'GURU_PRICE':
				return await guruPrice()
				break

			case 'GURU_LIQUID':
				return await guruLiquid()
				break

			case 'GURU_VOLUME':
				return await guruVolume()
				break

			case 'HOLDER_COUNT':
				return await holderCount()
				break

			case 'ETHP_PRICE':
				return await ethPrice()
				break
			case 'ETHP_VOLUME':
				return await ethVolume()
				break
			case 'MARKETCAP':
				return await marketCap()
				break
			case 'SUPPLY':
				return await supply()
				break

			case 'PANCAKE_PRICE':
				return await pancakePrice()
				break
		}
	},
}
