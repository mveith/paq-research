module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/rozdily',
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