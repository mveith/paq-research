module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/ockovani',
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