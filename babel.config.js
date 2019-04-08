module.exports = function(api) {
  api.cache(true);
  const presets = [
    '@babel/env',
    '@babel/react',
  ];
  const plugins = [
    '@babel/transform-runtime',
    '@babel/proposal-class-properties',
  ];

  return {
    compact: true,
    presets,
    plugins,
    env: {
      test: {
        presets: [
          [
            '@babel/env',
            {
              targets: {
                node: 'current',
              },
            }
          ],
          '@babel/react',
        ],
        plugins: [
          '@babel/transform-runtime',
          '@babel/proposal-class-properties',
        ]
      }
    }
  }
};