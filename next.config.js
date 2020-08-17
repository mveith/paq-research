module.exports = {
    async redirects() {
        return [
        ];
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        return {
            ...config,
            node: {
                fs:
                    'empty'
            }
        };
    },
}