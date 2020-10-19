module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/kontakty',
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