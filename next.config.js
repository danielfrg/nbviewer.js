const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const config = {
    eslint: {
        // Warning: Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

const withTM = require("next-transpile-modules")([
    "@jupyter-widgets/base",
    "@jupyter-widgets/controls",
    "@jupyter-widgets/html-manager",
    "@danielfrg/illusionist",
    "@danielfrg/jupyter-flex",
]);

module.exports = withTM({
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        config.module.rules.push({
            test: /\.js$/,
            include: [/node_modules\/@jupyter-widgets/],
            use: ["babel-loader"],
        });

        return config;
    },
});

// module.exports =
