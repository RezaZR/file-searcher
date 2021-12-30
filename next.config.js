module.exports = {
	webpack: (config, options) => {
		if (!options.isServer) {
			config.resolve.fallback.fs = false
		}

		return config
	}
};