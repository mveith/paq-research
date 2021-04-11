module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/nejnovejsi-data',
                permanent: true
            }
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